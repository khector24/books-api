import express from "express";
import { booksRouter } from "./routes/books.routes.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.get("/", (req, res) => {
  res.send("Welcome to this beautiful landing page!");
});
app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
