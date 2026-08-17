import express from "express";
import { booksRouter } from "./routes/books.routes.js";
import { reviewsRouter } from "./routes/reviews.routes.js";
import { authRouter } from "./routes/auth.routes.js";

const app = express();
const port = 3000;

// Global Middleware
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
app.use("/api/auth", authRouter);

// Error Middleware
app.use((error, req, res, next) => {
  console.error(error);

  if (error.code === "23505") {
    return res.status(409).json({
      message: "Username or email already exists",
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
