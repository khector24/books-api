import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";
import {
  validateBookId,
  validateBookQuery,
  validateCreateBook,
  validateUpdateBook,
} from "../middleware/books.validation.js";

const booksRouter = express.Router();

booksRouter.get("/", validateBookQuery, getBooks);
booksRouter.get("/:id", validateBookId, getBookById);
booksRouter.post("/", validateCreateBook, createBook);
booksRouter.patch("/:id", validateBookId, validateUpdateBook, updateBook);
booksRouter.delete("/:id", validateBookId, deleteBook);

export { booksRouter };
