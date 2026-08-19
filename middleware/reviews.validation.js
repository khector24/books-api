import { AppError } from "../utils/AppError.js";

function validateCreateReviewFields(req, res, next) {
  const { rating, review } = req.body;

  if (rating === undefined || !review) {
    throw new AppError("Rating and review are required", 400);
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
    throw new AppError("Rating must be an integer between 1 and 5", 400);
  }

  req.body.rating = ratingNumber;

  next();
}

function validateReviewId(req, res, next) {
  const reviewId = Number(req.params.reviewId);

  if (!Number.isInteger(reviewId) || reviewId < 1) {
    throw new AppError("Invalid review ID", 400);
  }

  req.reviewId = reviewId;

  next();
}

function validateUpdateReview(req, res, next) {
  const { rating, review } = req.body;

  if (rating === undefined && review === undefined) {
    throw new AppError("Rating or review is required", 400);
  }

  next();
}

export {
  validateCreateReviewFields,
  validateRating,
  validateReviewId,
  validateUpdateReview,
};
