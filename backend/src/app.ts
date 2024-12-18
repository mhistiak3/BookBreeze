/***
 * Title: BookBreeze API
 * Author: Istiak Ahammad
 * Date: 2022-06-14
 * Description: BookBreeze API, API for book store
 ***/

// Imports
import express from "express";
import cors from "cors";
import globalErrorsHandler from "./middlewares/global.errors.handler";
import userRouter from "./routes/user.routes";
import bookRouter from "./routes/book.routes";

// Constants
const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());


// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BookBreeze API" });
});

// * Routes register
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// global error handler
app.use(globalErrorsHandler);

// export
export default app;
