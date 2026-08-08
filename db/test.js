import { pool } from "./index.js";

try {
  const result = await pool.query("SELECT * FROM books");

  console.log("Query result:");
  console.log(result.rows);
} catch (error) {
  console.error("Database connection failed:");
  console.error(error);
} finally {
  await pool.end();
}
