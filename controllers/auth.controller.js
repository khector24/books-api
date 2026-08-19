import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUserService,
  loginUserService,
  updateUserRoleService,
} from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserService(username, email, hashedPassword);

    return res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await loginUserService(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      throw new AppError("Invalid email or password", 401);
    }

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      secret,
      {
        expiresIn: "7d",
      },
    );

    return res.json({
      message: `Welcome ${user.username}`,
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserRole(req, res, next) {
  try {
    const updatedUser = await updateUserRoleService(req.userRole, req.userId);

    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    return res.json({
      message: `User updated successfully!`,
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export { register, login, updateUserRole };
