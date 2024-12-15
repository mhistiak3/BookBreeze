import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import { v4 as uuidv4 } from 'uuid';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  file validation
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (!files.coverImage || !files.file) {
      throw createHttpError(
        400,
        "Please provide book cover image and book file"
      );
    }

     const dataCoverImage = `data:${
       files.coverImage[0].mimetype
     };base64,${files.coverImage[0].buffer.toString("base64")}`;
     const coverImage_public_id = uuidv4()
    // upload to cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataCoverImage, {
      resource_type: "auto",
      public_id: coverImage_public_id,
    });
    console.log(uploadResult);

    
    // response
    res.json({ message: "Book created successfully" });
  } catch (error) {
    console.log(error);
    const httpError = createHttpError(500, "Something went wrong");
    next(httpError);
  }
};

export { createBook };
