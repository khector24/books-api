function validateCreateReview(req, res, next) {
  const { rating } = req.body;

  const ratingNumber = Number(rating);

  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return res.status(400).json({
      message: "Rating must be an integer between 1 and 5",
    });
  }

  req.body.rating = ratingNumber;

  next();
}

export { validateCreateReview };
