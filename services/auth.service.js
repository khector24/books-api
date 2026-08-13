import { pool } from "../db/index.js";

async function createUserService(username, email, passwordHash) {
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, username, email;`,
    [username, email, passwordHash],
  );

  return result.rows[0];
}

async function loginUserService(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
    email,
  ]);

  return result.rows[0];
}

export { createUserService, loginUserService };
