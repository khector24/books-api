import { pool } from "./index.js";

try {
  const result = await pool.query(`
    INSERT INTO books (title, author) VALUES
      ('1984', 'George Orwell'),
      ('Animal Farm', 'George Orwell'),
      ('Pride and Prejudice', 'Jane Austen'),
      ('Emma', 'Jane Austen'),
      ('The Great Gatsby', 'F. Scott Fitzgerald'),
      ('Fahrenheit 451', 'Ray Bradbury'),
      ('Dune', 'Frank Herbert'),
      ('The Martian', 'Andy Weir'),
      ('The Catcher in the Rye', 'J.D. Salinger'),
      ('Brave New World', 'Aldous Huxley'),
      ('The Handmaid''s Tale', 'Margaret Atwood'),
      ('Beloved', 'Toni Morrison'),
      ('The Road', 'Cormac McCarthy'),
      ('Dracula', 'Bram Stoker'),
      ('Frankenstein', 'Mary Shelley')
    RETURNING *;
  `);

  console.log("Query result:");
  console.log(result.rows);
} catch (error) {
  console.error("Database query failed:");
  console.error(error);
} finally {
  await pool.end();
}
