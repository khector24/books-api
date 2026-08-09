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

export { validateBookId, validateCreateBook, validateUpdateBook };
