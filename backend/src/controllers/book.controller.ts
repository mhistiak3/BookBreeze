import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import { v4 as uuidv4 } from "uuid";
import BookModel from "../models/book.model";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    // validation
    if (!title || !genre) {
      throw createHttpError(400, "All fields are required");
    }
    // File validation
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (!files.coverImage || !files.file) {
      throw createHttpError(
        400,
        "Please provide book cover image and book file"
      );
    }

    const coverImage = files.coverImage[0];
    const bookFile = files.file[0];
    // Upload cover image to Cloudinary
    const dataCoverImage = `data:${
      coverImage.mimetype
    };base64,${coverImage.buffer.toString("base64")}`;
    const coverImagePublicId = uuidv4();
    const uploadCoverImage = await cloudinary.uploader.upload(dataCoverImage, {
      resource_type: "auto",
      public_id: coverImagePublicId,
      folder: "bookbreeze",
    });
    // Upload PDF file to Cloudinary using upload_stream
    const filePublicId = `${uuidv4()}.pdf`;
    const uploadFile = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            public_id: `bookbreeze/${filePublicId}`,
            folder: "bookbreeze",
          },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error) {
              return reject(error); // Reject if there's an error
            }
            if (result) {
              resolve(result); // Resolve with the result
            }
          }
        );
        stream.end(bookFile.buffer); // Send the file buffer
      }
    );

    // create book
    const book = await BookModel.create({
      title,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      author: (req as any).userId,
      genre,
      coverImage: {
        public_id: uploadCoverImage.public_id,
        url: uploadCoverImage.secure_url,
      },
      file: {
        public_id: uploadFile.public_id,
        url: uploadFile.secure_url,
      },
    });

    if (!book) {
      throw createHttpError(500, "Something went wrong during book creation");
    }

    // Response
    res.status(201).json({
      message: "Book created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "Something went wrong during book creation";
    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    next(createHttpError(500, errorMessage));
  }
};

// update book
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  const { bookId } = req.params;

  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw createHttpError(404, "Book not found");
    }
    // check right author
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (book.author.toString() !== (req as any).userId) {
      throw createHttpError(403, "You are not allowed to update this book");
    }
    // if cover image is updated
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.coverImage) {
      const coverImage = files.coverImage[0];
      const dataCoverImage = `data:${
        coverImage.mimetype
      };base64,${coverImage.buffer.toString("base64")}`;
      const coverImagePublicId = book.coverImage.public_id;
      const uploadCoverImage = await cloudinary.uploader.upload(
        dataCoverImage,
        {
          resource_type: "auto",
          public_id: coverImagePublicId,
          folder: "bookbreeze",
        }
      );
      book.coverImage = {
        public_id: uploadCoverImage.public_id,
        url: uploadCoverImage.secure_url,
      };
    }

    // if file PDF is updated
    if (files.file) {
      const bookFile = files.file[0];
      const filePublicId = book.file.public_id;
      const uploadFile = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "raw",
              public_id: filePublicId,
              folder: "bookbreeze",
            },
            (
              error: UploadApiErrorResponse | undefined,
              result: UploadApiResponse | undefined
            ) => {
              if (error) {
                return reject(error);
              }
              if (result) {
                resolve(result);
              }
            }
          );
          stream.end(bookFile.buffer);
        }
      );
      book.file = {
        public_id: uploadFile.public_id,
        url: uploadFile.secure_url,
      };
    }

    // if title is updated
    if (title) {
      book.title = title;
    }
    // if genre is updated
    if (genre) {
      book.genre = genre;
    }
    await book.save();
    res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "Something went wrong during book creation";
    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    next(createHttpError(500, errorMessage));
  }
};

// book list
const bookList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "Something went wrong during book creation";
    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    next(createHttpError(500, errorMessage));
  }
};

// single book
const singleBook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw createHttpError(404, "Book not found");
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "Something went wrong during book creation";
    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    next(createHttpError(500, errorMessage));
  }
};

// delete book
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const { bookId } = req.params;
  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw createHttpError(404, "Book not found");
    }
    // check right author
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (book.author.toString() !== (req as any).userId) {
      throw createHttpError(403, "You are not allowed to delete this book");
    }
    await cloudinary.uploader.destroy(book.coverImage.public_id);
    await cloudinary.uploader.destroy(book.file.public_id);
    await BookModel.findByIdAndDelete(bookId);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "Something went wrong during book creation";
    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    next(createHttpError(500, errorMessage));
  }
};

export { createBook, updateBook, bookList, singleBook, deleteBook };
