function validateBookId(req, res, next) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid book ID",
    });
  }

  req.bookId = id;

  next();
}

function validateBookQuery(req, res, next) {
  const { sort, order, page, limit } = req.query;

  const allowedSortFields = ["id", "title", "author"];
  const allowedSortOrders = ["ASC", "DESC"];

  if (sort !== undefined && !allowedSortFields.includes(sort)) {
    return res.status(400).json({
      message: "Sort must be one of: id, title, author",
    });
  }

  if (order !== undefined && sort === undefined) {
    return res.status(400).json({
      message: "Sort is required when order is provided",
    });
  }

  if (order !== undefined && !allowedSortOrders.includes(order.toUpperCase())) {
    return res.status(400).json({
      message: "Order must be either: ASC, DESC",
    });
  }

  if (page !== undefined) {
    const pageNumber = Number(page);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        message: "Page must be a positive integer",
      });
    }
  }

  if (limit !== undefined) {
    const limitNumber = Number(limit);

    if (
      !Number.isInteger(limitNumber) ||
      limitNumber < 1 ||
      limitNumber > 100
    ) {
      return res.status(400).json({
        message: "Limit must be an integer between 1 and 100",
      });
    }
  }

  next();
}

function validateCreateBook(req, res, next) {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required",
    });
  }

  next();
}

function validateUpdateBook(req, res, next) {
  const { title, author } = req.body;

  if (!title && !author) {
    return res.status(400).json({
      message: "Title or author is required",
    });
  }

  next();
}

export {
  validateBookId,
  validateBookQuery,
  validateCreateBook,
  validateUpdateBook,
};
