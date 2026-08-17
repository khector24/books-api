function validateCreateReviewFields(req, res, next) {
  const { rating, review } = req.body;

  if (rating === undefined || !review) {
    return res.status(400).json({
      message: "Rating and review are required",
    });
  }

  next();
}

function validateRating(req, res, next) {
  const { rating } = req.body;

  if (rating === undefined) {
    return next();
  }

  const ratingNumber = Number(rating);

  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return res.status(400).json({
      message: "Rating must be an integer between 1 and 5",
    });
  }

  req.body.rating = ratingNumber;

  next();
}

function validateReviewId(req, res, next) {
  const reviewId = Number(req.params.reviewId);

  if (!Number.isInteger(reviewId) || reviewId < 1) {
    return res.status(400).json({
      message: "Invalid review ID",
    });
  }

  req.reviewId = reviewId;

  next();
}

function validateUpdateReview(req, res, next) {
  const { rating, review } = req.body;

  if (rating === undefined && review === undefined) {
    return res.status(400).json({
      message: "Rating or review is required",
    });
  }

  next();
}

export {
  validateCreateReviewFields,
  validateRating,
  validateReviewId,
  validateUpdateReview,
};
