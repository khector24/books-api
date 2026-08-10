import { pool } from "../db/index.js";

async function getBooksService(author, title) {
  if (!author && !title) {
    const result = await pool.query("SELECT * FROM books");
    return result.rows;
  }

  if (!title) {
    const result = await pool.query(
      "SELECT * FROM books WHERE author ILIKE $1;",
      [`%${author}%`],
    );

    return result.rows;
  }

  if (!author) {
    const result = await pool.query(
      "SELECT * FROM books WHERE title ILIKE $1;",
      [`%${title}%`],
    );

    return result.rows;
  }

  const result = await pool.query(
    "SELECT * FROM books WHERE title ILIKE $1 AND author ILIKE $2;",
    [`%${title}%`, `%${author}%`],
  );

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
  getBooksService,
  getSpecificBook,
  createBookService,
  updateBookService,
  deleteBookService,
};
