/**
 * Name: book.routes.ts
 * Author: Istiak Ahammad
 * Date: 2022-06-14
 * Description: book routes
 */

// Imports
import { Router } from "express";
import { createBook } from "../controllers/book.controller";


// Constants
const bookRouter = Router();

// register route
bookRouter.post("/",createBook);


export default bookRouter;
