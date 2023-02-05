import mongoose from "mongoose";
import { config } from "../config/secret";
import { logger } from "../helpers/logger";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoConnectionString);
    console.log(`server connected to database at ${conn.connection.host}`);
    logger.info("Mongo connection done");
  } catch (error) {
    console.log(error);
    logger.info("Mongoose connection error");
    logger.error(error);
    process.exit(1);
  }
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.debug(
    "Mongoose default connection open to " + config.mongoConnectionString
  );
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.error("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

export default connectDB;
