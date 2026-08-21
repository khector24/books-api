import express from "express";
import {
  validateRegister,
  validateLogin,
  validateUserId,
  validateUserRole,
} from "../middleware/auth.validation.js";
import {
  register,
  login,
  updateUserRole,
} from "../controllers/auth.controller.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

const authRouter = express.Router();

authRouter.post("/auth/register", validateRegister, register);
authRouter.post("/auth/login", loginLimiter, validateLogin, login);
authRouter.patch(
  "/users/:userId/role",
  authenticateToken,
  requireAdmin,
  validateUserId,
  validateUserRole,
  updateUserRole,
);

export { authRouter };
