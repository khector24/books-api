function errorHandler(error, req, res, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  if (error.code === "23505") {
    return res.status(409).json({
      message: "Username or email already exists",
    });
  }

  return res.status(statusCode).json({
    message,
  });
}

export { errorHandler };
