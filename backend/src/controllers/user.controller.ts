import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user.model";
import {hash} from "bcrypt";
// create user controller
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // Validation of user data
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // Check if user already exist
    const user = await UserModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already exist with this email");
      return next(error);
    }
    // Hash Password
    const hashedPassword = await hash(password, 10);

    // create user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword
    })

    // send response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    const httpError = createHttpError(500, "Something went wrong");
    next(httpError);
  }
};

export { createUser };
