import express from "express";
import { booksRouter } from "./routes/books.routes.js";
import { reviewsRouter } from "./routes/reviews.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

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
app.use("/api", authRouter);

// Error Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
