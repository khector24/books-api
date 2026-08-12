import {
  getBookReviewService,
  createBookReviewService,
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
    const { rating, review } = req.body;

    const newReview = await createBookReviewService(book_id, rating, review);

    return res.status(201).json({
      newReview,
      message: "Review Created",
    });
  } catch (error) {
    next(error);
  }
}

export { getBookReviews, createBookReview };
