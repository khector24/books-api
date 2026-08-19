import express from "express";
import {
  authenticateToken,
  authorizeReviewOwner,
} from "../middleware/auth.middleware.js";

import {
  getBookReviews,
  createBookReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.controller.js";
import { validateBookId } from "../middleware/books.validation.js";
import {
  validateCreateReviewFields,
  validateReviewId,
  validateUpdateReview,
} from "../middleware/reviews.validation.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/books/:id/reviews", validateBookId, getBookReviews);
reviewsRouter.post(
  "/books/:id/reviews",
  authenticateToken,
  validateBookId,
  validateCreateReviewFields,
  createBookReview,
);
reviewsRouter.patch(
  "/reviews/:reviewId",
  authenticateToken,
  validateReviewId,
  authorizeReviewOwner,
  validateUpdateReview,
  updateReview,
);
reviewsRouter.delete(
  "/reviews/:reviewId",
  authenticateToken,
  validateReviewId,
  authorizeReviewOwner,
  deleteReview,
);

export { reviewsRouter };
