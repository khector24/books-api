import express from "express";

import {
  getBookReviews,
  createBookReview,
} from "../controllers/reviews.controller.js";
import { validateBookId } from "../middleware/books.validation.js";
import { validateCreateReview } from "../middleware/reviews.validation.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/:id/reviews", validateBookId, getBookReviews);
reviewsRouter.post(
  "/:id/reviews",
  validateBookId,
  validateCreateReview,
  createBookReview,
);

export { reviewsRouter };
