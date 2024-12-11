/**
 * Name: book.routes.ts
 * Author: Istiak Ahammad
 * Date: 2022-06-14
 * Description: book routes
 */

// Imports
import { Router } from "express";
import { createBook } from "../controllers/book.controller";
import multer from "multer";

// Constants
const bookRouter = Router();

// multer
const upload = multer({
  dest: "../../public/data/uploads",
  limits: {
    fileSize: 3e7, // 30 MB
  },
});

// register route
bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
