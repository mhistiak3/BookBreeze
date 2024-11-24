/***
 * Title: BookBreeze API
 * Author: Istiak Ahammad
 * Date: 2022-06-14
 * Description: BookBreeze API, API for book store
 ***/

// Imports
import express from "express";

// Constants
const app = express();

// Routes
app.use("/", (req, res) => {
  res.json({ message: "Welcome to BookBreeze API" });
});

// export
export default app;
