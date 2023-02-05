import { format } from "winston";
import { transports } from "winston";
import cors from "cors";
import express, { Request, Response } from "express";
import expressWinston from "express-winston";
import { config } from "./config/secret";
import { formatErrorMessage, logger } from "./helpers/logger";
import connectDB from "./database";
import { InstitutionModel } from "./database/models/Institution";

/**
 * @description initiate connection to mongoDB database
 */

connectDB();

const app = express();

/**
 * @description initiate logger
 */

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

/**
 * @description initiate middleware functions
 */

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Finance Management System");
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.File({
        filename: "logs/internalErrors.log",
      }),
    ],
    format: format.combine(
      format.json(),
      format.timestamp(),
      formatErrorMessage
    ),
  })
);

app.listen(config.PORT, () =>
  console.log(`Server started on PORT: ${config.PORT}`)
);
