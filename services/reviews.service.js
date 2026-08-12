import { pool } from "../db/index.js";

async function getBookReviewService() {}

async function createBookReviewService(book_id, rating, review) {
  const result = await pool.query(
    "INSERT INTO reviews (book_id, rating, review) VALUES ($1, $2, $3) RETURNING *;",
    [book_id, rating, review],
  );

  return result.rows[0];
}

export { getBookReviewService, createBookReviewService };
