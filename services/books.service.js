import { pool } from "../db/index.js";

async function getAllBooks() {
  const result = await pool.query("SELECT * FROM books");

  return result.rows;
}

async function getSpecificBook(id) {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
}

async function createBookService(title, author) {
  const result = await pool.query(
    "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *;",
    [title, author],
  );
  return result.rows[0];
}

async function updateBookService(id, title, author) {
  const result = await pool.query(
    `UPDATE books SET
          title = COALESCE($1, title),
          author = COALESCE($2, author)
      WHERE id = $3
      RETURNING *;`,
    [title, author, id],
  );
  return result.rows[0];
}

async function deleteBookService(id) {
  const result = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING *;",
    [id],
  );
  return result.rows[0];
}

export {
  getAllBooks,
  getSpecificBook,
  createBookService,
  updateBookService,
  deleteBookService,
};
