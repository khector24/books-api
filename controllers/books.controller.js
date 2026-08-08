import {
  getAllBooks,
  getSpecificBook,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/books.service.js";

async function getBooks(req, res, next) {
  try {
    const books = await getAllBooks();

    return res.json(books);
  } catch (error) {
    next(error);
  }
}

async function getBookById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid book ID",
      });
    }

    const book = await getSpecificBook(id);

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

    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required",
      });
    }

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
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid book ID",
      });
    }

    const { title, author } = req.body;

    const updatedBook = await updateBookService(id, title, author);

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
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid book ID",
      });
    }

    const deletedBook = await deleteBookService(id);

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
