import { test, expect, describe, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import { pool } from "../db/index.js";

describe("GET /api/books/:id", () => {
  test("returns 200 and the requested book", async () => {
    const response = await request(app).get("/api/books/17");

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(17);
    expect(response.body.data.title).toBe("Dune");
    expect(response.body.data.author).toBe("Frank Herbert");
  });

  test("returns 404 when the book does not exist", async () => {
    const response = await request(app).get("/api/books/999999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Book not found");
  });

  test("returns 400 when the book ID is invalid", async () => {
    const response = await request(app).get("/api/books/abc");

    expect(response.status).toBe(400);
  });
});

describe("POST /api/books", () => {
  let adminToken;
  let aliceToken;

  beforeAll(async () => {
    const adminLoginResponse = await request(app).post("/api/auth/login").send({
      email: "kenny@example.com",
      password: "password123",
    });

    adminToken = adminLoginResponse.body.data.token;

    const aliceLoginResponse = await request(app).post("/api/auth/login").send({
      email: "alice@example.com",
      password: "password123",
    });

    aliceToken = aliceLoginResponse.body.data.token;
  });

  test("returns 401 when creating a book without authentication", async () => {
    const response = await request(app).post("/api/books").send({
      title: "Test Book",
      author: "Test Author",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authentication required");
  });

  test("creates a new book", async () => {
    const response = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Test Book",
        author: "Test Author",
        published_year: 2020,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Book created successfully");
    expect(response.body.data.title).toBe("Test Book");
    expect(response.body.data.author).toBe("Test Author");
    expect(response.body.data.published_year).toBe(2020);

    const bookId = response.body.data.id;

    await pool.query("DELETE FROM books WHERE id = $1", [bookId]);
  });

  test("returns 400 when creating a book with missing title", async () => {
    const response = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        author: "Test Author",
      });

    expect(response.status).toBe(400);
  });

  test("returns 403 when a non-admin user tries to create a book", async () => {
    const response = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${aliceToken}`)
      .send({
        title: "Forbidden Book",
        author: "Test Author",
      });

    expect(response.status).toBe(403);
  });
});
