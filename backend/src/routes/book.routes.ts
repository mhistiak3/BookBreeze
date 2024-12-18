/**
 * Name: book.routes.ts
 * Author: Istiak Ahammad
 * Date: 2022-06-14
 * Description: book routes
 */

// Imports
import { Router } from "express";
import { createBook, updateBook } from "../controllers/book.controller";
import multer from "multer";
import authenticationMiddleware from "../middlewares/authentication.middleware";

// Constants
const bookRouter = Router();

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// create book route
bookRouter.post(
  "/",
  authenticationMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

// update book
bookRouter.put(
  "/:bookId",
  authenticationMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

export default bookRouter;
