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
      page = 1,
      limit = 5,
    } = req.validatedQuery;

    const { books, pagination } = await getBooksService(
      author,
      title,
      sort,
      order,
      page,
      limit,
    );

    return res.json({
      data: books,
      pagination,
    });
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

    return res.json({
      data: book,
    });
  } catch (error) {
    next(error);
  }
}

async function createBook(req, res, next) {
  try {
    const { title, author } = req.body;

    const newBook = await createBookService(title, author);

    return res.status(201).json({
      message: "Book created successfully",
      data: newBook,
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
      data: updatedBook,
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
    return res.json({
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    next(error);
  }
}

export { getBooks, getBookById, createBook, updateBook, deleteBook };
