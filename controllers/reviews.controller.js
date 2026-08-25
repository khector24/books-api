import {
  getBookReviewsService,
  createBookReviewService,
  updateReviewService,
  deleteReviewService,
} from "../services/reviews.service.js";
import { AppError } from "../utils/AppError.js";

async function getBookReviews(req, res, next) {
  try {
    const bookId = req.bookId;
    const bookReviews = await getBookReviewsService(bookId);

    return res.json({ data: bookReviews });
  } catch (error) {
    next(error);
  }
}

async function createBookReview(req, res, next) {
  try {
    const bookId = req.bookId;
    const userId = req.user.id;
    const { rating, review } = req.body;

    const newReview = await createBookReviewService(
      bookId,
      userId,
      rating,
      review,
    );

    return res.status(201).json({
      message: "Review created",
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  try {
    const { rating, review } = req.body;

    const updatedReview = await updateReviewService(
      rating,
      review,
      req.reviewId,
    );

    if (!updatedReview) {
      throw new AppError("Review not found", 404);
    }

    return res.json({
      message: "Review updated",
      data: updatedReview,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const deletedReview = await deleteReviewService(req.reviewId);

    if (!deletedReview) {
      throw new AppError("Review not found", 404);
    }

    return res.json({
      message: "Review deleted successfully",
      data: deletedReview,
    });
  } catch (error) {
    next(error);
  }
}

export { getBookReviews, createBookReview, updateReview, deleteReview };
