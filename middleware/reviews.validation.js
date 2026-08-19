import Joi from "joi";
import { AppError } from "../utils/AppError.js";

const createReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  review: Joi.string(),
});

const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  review: Joi.string(),
}).or("rating", "review");

const reviewIdSchema = Joi.number().integer().min(1).required();

function validateCreateReviewFields(req, res, next) {
  const { error, value } = createReviewSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.body = value;

  next();
}

function validateReviewId(req, res, next) {
  const { error, value } = reviewIdSchema.validate(req.params.reviewId);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.reviewId = value;

  next();
}

function validateUpdateReview(req, res, next) {
  const { error, value } = updateReviewSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.body = value;

  next();
}

export { validateCreateReviewFields, validateReviewId, validateUpdateReview };
