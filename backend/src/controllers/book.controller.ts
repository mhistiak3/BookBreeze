import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import { v4 as uuidv4 } from "uuid";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    console.log("Cover Image Uploaded:", uploadCoverImage);

    // Upload PDF file to Cloudinary using upload_stream
  const filePublicId = `${uuidv4()}.pdf`;
    const uploadFile = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          public_id: `file/${filePublicId}`,
          folder: "bookbreeze",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
      stream.end(bookFile.buffer); 
    });

    console.log("PDF File Uploaded:", uploadFile);

    // Response
    res.status(201).json({
      message: "Book created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    next(createHttpError(500, "Something went wrong during file upload"));
  }
};

export { createBook };
