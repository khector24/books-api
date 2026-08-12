import {
  getBooksService,
  getSpecificBook,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/books.service.js";

async function getBooks(req, res, next) {
  try {
    const { author, title, sort, order, page = "1", limit = "5" } = req.query;

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
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.json(book);
  } catch (error) {
    next(error);
  }
}

async function createBook(req, res, next) {
  try {
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
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
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
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book Deleted Successfully",
      deletedBook,
    });
  } catch (error) {
    next(error);
  }
}

export { getBooks, getBookById, createBook, updateBook, deleteBook };
