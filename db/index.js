import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "books_api",
  user: "kennyhector",
});

export { pool };
