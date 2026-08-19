import { pool } from "../db/index.js";

async function getBookReviewsService(bookId) {
  const result = await pool.query(
    `SELECT books.title, reviews.rating, reviews.review 
     FROM books 
     INNER JOIN reviews ON books.id = reviews.book_id 
     WHERE books.id = $1;`,
    [bookId],
  );

  return result.rows;
}

async function getReviewByIdService(reviewId) {
  const result = await pool.query("SELECT * FROM reviews WHERE id = $1;", [
    reviewId,
  ]);

  return result.rows[0];
}

async function createBookReviewService(bookId, userId, rating, review) {
  const result = await pool.query(
    `INSERT INTO reviews (book_id, user_id, rating, review)
     VALUES ($1, $2, $3, $4)
     RETURNING *;`,
    [bookId, userId, rating, review],
  );

  return result.rows[0];
}

async function updateReviewService(rating, review, reviewId) {
  const result = await pool.query(
    `UPDATE reviews SET
          rating = COALESCE($1, rating),
          review = COALESCE($2, review)
      WHERE id = $3
      RETURNING *;`,
    [rating, review, reviewId],
  );

  return result.rows[0];
}

async function deleteReviewService(reviewId) {
  const result = await pool.query(
    `DELETE FROM reviews
      WHERE id = $1
      RETURNING *;`,
    [reviewId],
  );

  return result.rows[0];
}

export {
  getBookReviewsService,
  getReviewByIdService,
  createBookReviewService,
  updateReviewService,
  deleteReviewService,
};
