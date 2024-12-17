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
    if (!title  || !genre) {
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
      author: "6745c24d502de7f3c8e305b5",
      genre,
      coverImage: uploadCoverImage.secure_url,
      file: uploadFile.secure_url,
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

export { createBook };
