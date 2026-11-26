import mongoose from "mongoose";
import logger from "../utils/logger.js";
import env from "./index.js";

async function connectDB() {
  try {
    mongoose.set("autoIndex", true);
    await mongoose.connect(env.MONGODB_URI);

    logger.info(`Database conneced successfully`);
  } catch (error) {
    logger.error(
      `An error occurred while connecting to the database: ${error}`,
    );
    process.exit(1);
  }
}

export default connectDB;
