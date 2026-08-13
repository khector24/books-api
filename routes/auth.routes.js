import express from "express";
import {
  validateRegister,
  validateLogin,
} from "../middleware/auth.validation.js";
import { register, login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);

export { authRouter };
