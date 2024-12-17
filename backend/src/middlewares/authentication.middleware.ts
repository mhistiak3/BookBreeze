// authentication
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      next(createHttpError(401, "Unauthorized"));
    }
    const decodedToken = jwt.verify(
      token as string,
      config.jwt_secret as string
    );
    if (!decodedToken) {
      throw createHttpError(401, "Unauthorized");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).userId = decodedToken.sub;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
