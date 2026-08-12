import { pool } from "../db/index.js";

async function getBookReviewService(book_id) {
  const result = await pool.query(
    `SELECT books.title, reviews.rating, reviews.review 
     FROM books 
     INNER JOIN reviews ON books.id = reviews.book_id 
     WHERE books.id = $1;`,
    [book_id],
  );

  return result.rows;
}

async function createBookReviewService(book_id, rating, review) {
  const result = await pool.query(
    "INSERT INTO reviews (book_id, rating, review) VALUES ($1, $2, $3) RETURNING *;",
    [book_id, rating, review],
  );

  return result.rows[0];
}

export { getBookReviewService, createBookReviewService };
