import { format } from "winston";
import { transports } from "winston";
import express, { Request, Response } from "express";
import expressWinston from "express-winston";
import { config } from "./config/secret";
import { formatErrorMessage, logger } from "./helpers/logger";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Finance Management System");
});

app.get("/warn", (req: Request, res: Response) => {
  logger.warn("This is a warn log");
  res.status(400).send("You are getting a warning");
});

app.get("/error", (req: Request, res: Response) => {
  throw new Error("This is a custom error");
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
