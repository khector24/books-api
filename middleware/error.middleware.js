function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === "23505") {
    if (
      error.constraint === "users_email_key" ||
      error.constraint === "users_username_key"
    ) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    return res.status(409).json({
      message: "Resource already exists",
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
