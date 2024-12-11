// book model
import mongoose from "mongoose";
import { Book } from "../types/book.type";

const bookSchema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genre: { type: String, required: true },
    coverImage: { type: String, required: true },
    file: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const BookModel = mongoose.model<Book>("Book", bookSchema);

export default BookModel;
