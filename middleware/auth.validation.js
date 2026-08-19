import { AppError } from "../utils/AppError.js";
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userRoleSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
});

const userIdSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
});

function validateRegister(req, res, next) {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.body = value;

  next();
}

function validateLogin(req, res, next) {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.body = value;

  next();
}

function validateUserId(req, res, next) {
  const { error, value } = userIdSchema.validate(req.params);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.userId = value.userId;

  next();
}

function validateUserRole(req, res, next) {
  const { error, value } = userRoleSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.userRole = value.role;

  next();
}

export { validateRegister, validateLogin, validateUserId, validateUserRole };
