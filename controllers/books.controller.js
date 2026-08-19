import {
  getBooksService,
  getSpecificBook,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/books.service.js";
import { AppError } from "../utils/AppError.js";

async function getBooks(req, res, next) {
  try {
    const {
      author,
      title,
      sort = "id",
      order = "ASC",
      page = "1",
      limit = "5",
    } = req.query;

    const books = await getBooksService(
      author,
      title,
      sort,
      order,
      page,
      limit,
    );
    return res.json(books);
  } catch (error) {
    next(error);
  }
}

async function getBookById(req, res, next) {
  try {
    const book = await getSpecificBook(req.bookId);

    if (!book) {
      throw new AppError("Book not found", 404);
    }

    return res.json(book);
  } catch (error) {
    next(error);
  }
}

async function createBook(req, res, next) {
  try {
    console.log(req.user);
    const { title, author } = req.body;

    const newBook = await createBookService(title, author);

    return res.status(201).json({
      newBook,
      message: "Book Created",
    });
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const { title, author } = req.body;

    const updatedBook = await updateBookService(req.bookId, title, author);

    if (!updatedBook) {
      throw new AppError("Book not found", 404);
    }

    return res.json({
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const deletedBook = await deleteBookService(req.bookId);

    if (!deletedBook) {
      throw new AppError("Book not found", 404);
    }

    // Or return status code 204 - for no content but since
    // you're returning something it's fine.
    // "the request succeeded, but the server is returning no response body."
    return res.status(200).json({
      message: "Book Deleted Successfully",
      deletedBook,
    });
  } catch (error) {
    next(error);
  }
}

export { getBooks, getBookById, createBook, updateBook, deleteBook };
