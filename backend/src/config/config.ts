import { config as envconfig } from "dotenv";
envconfig();

const _config = {
  port: process.env.PORT,
  db_url: process.env.MONGO_CONNECTION_STRING,
};
const config = Object.freeze(_config);
export default config;
