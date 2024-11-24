// imports
import mongoose from "mongoose";
import config from "./config";

// connect db
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
    await mongoose.connect(config.db_url as string);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
