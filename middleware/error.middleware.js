function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === "23505") {
    return res.status(409).json({
      message: "Username or email already exists",
    });
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
}

export { errorHandler };
