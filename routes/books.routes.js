import express from "express";
import { pool } from "../db/index.js";
import { books } from "../data/books.js";

const booksRouter = express.Router();

let currBooks = books;

booksRouter.get("/", async (req, res) => {
  const results = await pool.query("SELECT * FROM books");
  res.json(results.rows);
});

booksRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const bookById = currBooks.find((book) => book.id === id);

  if (!bookById) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.json(bookById);
});

booksRouter.post("/", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required",
    });
  }

  const id =
    currBooks.length === 0
      ? 1
      : Math.max(...currBooks.map((book) => book.id)) + 1;

  const newBook = {
    id,
    title,
    author,
  };

  currBooks.push(newBook);

  res.status(201).json({
    newBook,
    message: "Book Created",
  });
});

booksRouter.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = currBooks.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  const { title, author } = req.body;

  if (title !== undefined) {
    book.title = title;
  }

  if (author !== undefined) {
    book.author = author;
  }

  res.status(200).json({
    message: "Book updated successfully",
    book,
  });
});

booksRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = currBooks.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  currBooks = currBooks.filter((book) => book.id !== id);

  res.status(200).json({ currBooks, message: "Book Deleted Succesfully" });
});

export { booksRouter };
