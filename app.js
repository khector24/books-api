import express from "express";
import cors from "cors";
import helmet from "helmet";
import { booksRouter } from "./routes/books.routes.js";
import { reviewsRouter } from "./routes/reviews.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Global Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.get("/", (req, res) => {
  res.send("Welcome to this beautiful landing page!");
});

// book routes
app.use("/api/books", booksRouter);

// review routes
app.use("/api", reviewsRouter);

// auth routes
app.use("/api", authRouter);

// Error Middleware
app.use(errorHandler);

export { app };
