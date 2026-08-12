import { pool } from "../db/index.js";

async function getBooksService(author, title, sort, order, page, limit) {
  let query = "SELECT * FROM books";
  const values = [];
  const conditions = [];
  const allowedSortFields = ["id", "title", "author"];
  const allowedSortOrders = ["ASC", "DESC"];
  const upperCaseOrder = order?.toUpperCase();

  if (title) {
    values.push(`%${title}%`);
    conditions.push(` title ILIKE $${values.length}`);
  }

  if (author) {
    values.push(`%${author}%`);
    conditions.push(` author ILIKE $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (allowedSortFields.includes(sort)) {
    query += ` ORDER BY ${sort}`;

    if (allowedSortOrders.includes(upperCaseOrder)) {
      query += ` ${upperCaseOrder}`;
    }
  }

  if (page && limit) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    values.push(limitNumber);
    query += ` LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;
  }

  const result = await pool.query(query, values);
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
