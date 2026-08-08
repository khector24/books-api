import express from "express";
import { booksRouter } from "./routes/books.routes.js";

const app = express();
const port = 3000;

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.get("/", (req, res) => {
  res.send("Welcome to this beautiful landing page!");
});
app.use("/api/books", booksRouter);

// Error Middleware
app.use((error, req, res, next) => {
  console.error(error);

  return res.status(500).json({
    message: "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
