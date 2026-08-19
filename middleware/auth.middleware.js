import jwt from "jsonwebtoken";
import { getReviewByIdService } from "../services/reviews.service.js";
import { AppError } from "../utils/AppError.js";

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authentication required", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    throw new AppError("Admin access required", 403);
  }

  next();
}

async function authorizeReviewOwner(req, res, next) {
  try {
    const review = await getReviewByIdService(req.reviewId);

    if (!review) {
      throw new AppError("Review not found", 404);
    }

    if (req.user.id !== review.user_id) {
      throw new AppError(
        "You do not have permission to modify this review",
        403,
      );
    }

    req.review = review;

    next();
  } catch (error) {
    next(error);
  }
}

export { authenticateToken, requireAdmin, authorizeReviewOwner };
