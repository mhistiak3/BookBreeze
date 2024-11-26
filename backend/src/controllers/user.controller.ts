import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

// create user controller
const createUser = (req: Request, res: Response, next:NextFunction) => {
  const { name, email, password } = req.body;
  
  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
   return next(error);
  }

  // Process

  // send response
  res.status(201).json({ message: "User created successfully" });
};

export { createUser };
