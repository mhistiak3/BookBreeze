import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // response
        res.json({ message: "Book created successfully" });
    } catch (error) {
       console.log(error);
       const httpError = createHttpError(500, "Something went wrong");
       next(httpError);

    }
}


export { createBook };