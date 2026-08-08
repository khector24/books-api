import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";

const booksRouter = express.Router();

booksRouter.get("/", getBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", createBook);
booksRouter.patch("/:id", updateBook);
booksRouter.delete("/:id", deleteBook);

export { booksRouter };
