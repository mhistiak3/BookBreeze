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


const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
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
