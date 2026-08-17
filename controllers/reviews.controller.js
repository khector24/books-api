import {
  getBookReviewService,
  createBookReviewService,
  updateReviewService,
  deleteReviewService,
} from "../services/reviews.service.js";

async function getBookReviews(req, res, next) {
  try {
    const book_id = req.bookId;
    const bookReviews = await getBookReviewService(book_id);

    return res.json(bookReviews);
  } catch (error) {
    next(error);
  }
}

async function createBookReview(req, res, next) {
  try {
    const book_id = req.bookId;
    const user_id = req.user.id;
    const { rating, review } = req.body;

    const newReview = await createBookReviewService(
      book_id,
      user_id,
      rating,
      review,
    );

    return res.status(201).json({
      newReview,
      message: "Review Created",
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

    return res.json({
      updatedReview,
      message: "Review Updated",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const deletedReview = await deleteReviewService(req.reviewId);

    return res.json({
      message: "Review Deleted Successfully",
      deletedReview,
    });
  } catch (error) {
    next(error);
  }
}

export { getBookReviews, createBookReview, updateReview, deleteReview };
