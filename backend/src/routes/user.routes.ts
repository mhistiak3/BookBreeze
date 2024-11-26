/**
 * Name: user.routes.ts
 * Author: Istiak Ahammad
 * Date: 2022-06-14
 * Description: User routes
 */

// Imports
import { Router } from "express";
import { createUser } from "../controllers/user.controller";

// Constants
const userRouter = Router();

// register route
userRouter.post("/register", createUser);

export default userRouter;
