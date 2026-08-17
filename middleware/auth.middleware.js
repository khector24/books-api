import jwt from "jsonwebtoken";
import { getReviewByIdService } from "../services/reviews.service.js";

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

function requireAdmin(req, res, next) {
  console.log(req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
}

async function authorizeReviewOwner(req, res, next) {
  try {
    const review = await getReviewByIdService(req.reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (req.user.id !== review.user_id) {
      return res.status(403).json({
        message: "You do not have permission to modify this review",
      });
    }

    req.review = review;

    next();
  } catch (error) {
    next(error);
  }
}

export { authenticateToken, requireAdmin, authorizeReviewOwner };
