import { AppError } from "../utils/AppError.js";

function validateBookId(req, res, next) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid book ID", 400);
  }

  req.bookId = id;

  next();
}

function validateBookQuery(req, res, next) {
  const { sort, order, page, limit } = req.query;

  const allowedSortFields = ["id", "title", "author"];
  const allowedSortOrders = ["ASC", "DESC"];

  if (sort !== undefined && !allowedSortFields.includes(sort)) {
    throw new AppError("Sort must be one of: id, title, author", 400);
  }

  if (order !== undefined && sort === undefined) {
    throw new AppError("Sort is required when order is provided", 400);
  }

  if (order !== undefined && !allowedSortOrders.includes(order.toUpperCase())) {
    throw new AppError("Order must be either: ASC, DESC", 400);
  }

  if (page !== undefined) {
    const pageNumber = Number(page);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      throw new AppError("Page must be a positive integer", 400);
    }
  }

  if (limit !== undefined) {
    const limitNumber = Number(limit);

    if (
      !Number.isInteger(limitNumber) ||
      limitNumber < 1 ||
      limitNumber > 100
    ) {
      throw new AppError("Limit must be an integer between 1 and 100", 400);
    }
  }

  next();
}

function validateCreateBook(req, res, next) {
  const { title, author } = req.body;

  if (!title || !author) {
    throw new AppError("Title and author are required", 400);
  }

  next();
}

function validateUpdateBook(req, res, next) {
  const { title, author } = req.body;

  if (!title && !author) {
    throw new AppError("Title or author is required", 400);
  }

  next();
}

export {
  validateBookId,
  validateBookQuery,
  validateCreateBook,
  validateUpdateBook,
};
