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

const authRouter = express.Router();

authRouter.post("/auth/register", validateRegister, register);
authRouter.post("/auth/login", validateLogin, login);
authRouter.patch(
  "/users/:userId/role",
  authenticateToken,
  requireAdmin,
  validateUserId,
  validateUserRole,
  updateUserRole,
);

export { authRouter };
