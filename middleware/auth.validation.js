import { AppError } from "../utils/AppError.js";

function validateRegister(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new AppError("Username, email, and password are required", 400);
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  next();
}

function validateUserId(req, res, next) {
  const userId = Number(req.params.userId);

  if (!Number.isInteger(userId) || userId < 1) {
    throw new AppError("Invalid user ID", 400);
  }

  req.userId = userId;

  next();
}

function validateUserRole(req, res, next) {
  const allowedRoles = ["user", "admin"];

  const { role } = req.body;

  if (role === undefined || !allowedRoles.includes(role)) {
    throw new AppError("User role required or is not valid.", 400);
  }

  req.userRole = role;

  next();
}

export { validateRegister, validateLogin, validateUserId, validateUserRole };
