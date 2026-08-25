import { pool } from "../db/index.js";

async function getBooksService(author, title, sort, order, page, limit) {
  let query = "SELECT * FROM books";
  let countQuery = "SELECT COUNT(*) FROM books";

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
    const whereClause = ` WHERE ${conditions.join(" AND ")}`;

    query += whereClause;
    countQuery += whereClause;
  }

  if (allowedSortFields.includes(sort)) {
    query += ` ORDER BY ${sort}`;

    if (allowedSortOrders.includes(upperCaseOrder)) {
      query += ` ${upperCaseOrder}`;
    }
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const offset = (pageNumber - 1) * limitNumber;

  // Run count before adding LIMIT/OFFSET values
  const countResult = await pool.query(countQuery, values);

  const totalBooks = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(totalBooks / limitNumber);

  values.push(limitNumber);
  query += ` LIMIT $${values.length}`;

  values.push(offset);
  query += ` OFFSET $${values.length}`;

  const hasNextPage = pageNumber < totalPages;
  const hasPreviousPage = pageNumber > 1;

  const result = await pool.query(query, values);
  return {
    books: result.rows,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalBooks,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  };
}

async function getSpecificBook(id) {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
}

async function createBookService(title, author, published_year) {
  const result = await pool.query(
    `INSERT INTO books (title, author, published_year)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [title, author, published_year],
  );

  return result.rows[0];
}

async function updateBookService(id, title, author, published_year) {
  const result = await pool.query(
    `UPDATE books
     SET title = COALESCE($1, title),
         author = COALESCE($2, author),
         published_year = COALESCE($3, published_year)
     WHERE id = $4
     RETURNING *;`,
    [title, author, published_year, id],
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
