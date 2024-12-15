import { config as envconfig } from "dotenv";

envconfig();

const _config = {
  port: process.env.PORT,
  db_url: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
const config = Object.freeze(_config);
export default config;
