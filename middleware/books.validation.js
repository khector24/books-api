import { AppError } from "../utils/AppError.js";
import Joi from "joi";

const bookIdSchema = Joi.number().integer().min(1).required();

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  published_year: Joi.number()
    .integer()
    .max(new Date().getFullYear())
    .required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  published_year: Joi.number().integer().max(new Date().getFullYear()),
}).min(1);

const bookQuerySchema = Joi.object({
  sort: Joi.string().valid("id", "title", "author"),
  order: Joi.string().valid("ASC", "DESC"),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
}).with("order", "sort");

function validateBookId(req, res, next) {
  const { error, value } = bookIdSchema.validate(req.params.id);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.bookId = value;

  next();
}

function validateBookQuery(req, res, next) {
  const { error, value } = bookQuerySchema.validate(req.query);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.validatedQuery = value;

  next();
}

function validateCreateBook(req, res, next) {
  const { error, value } = createBookSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.body = value;

  next();
}

function validateUpdateBook(req, res, next) {
  const { error, value } = updateBookSchema.validate(req.body);

  if (error) {
    throw new AppError(error.message, 400);
  }

  req.body = value;

  next();
}

export {
  validateBookId,
  validateBookQuery,
  validateCreateBook,
  validateUpdateBook,
};
