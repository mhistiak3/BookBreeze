/***
 * Title: BookBreeze API
 * Author: Istiak Ahammad
 * Date: 2022-06-14
 * Description: BookBreeze API, API for book store
 ***/

// Imports
import express from "express";
import globalErrorsHandler from "./middlewares/global.errors.handler";

// Constants
const app = express();

// Routes
app.get("/", (req, res) => {
   
  res.json({ message: "Welcome to BookBreeze API" });
});

// global error handler

app.use(globalErrorsHandler);

// export
export default app;
