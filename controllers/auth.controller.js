import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUserService,
  loginUserService,
} from "../services/auth.service.js";

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
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
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

export { register, login };
