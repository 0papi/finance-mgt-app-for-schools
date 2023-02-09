import { format } from "winston";
import { transports } from "winston";
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import expressWinston from "express-winston";
import { config } from "./config/secret";
import { formatErrorMessage, logger } from "./helpers/logger";
import connectDB from "./database";
import { HttpError } from "./errors/httpError";
import { errorHandler } from "./utils";
import routes from "./routes";

/**
 * @description initiate connection to mongoDB database
 */

connectDB();

/**
 * @description initiate middleware functions
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

/**
 * @description initiate logger
 */

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  const statusCode = (err as HttpError).statusCode || 500;
  res.status(statusCode || 500).send({ error: err.message });
});

app.get(
  "/test",
  errorHandler((req: Request, res: Response) => {
    const data = {
      name: "Evans",
      address: "114, Salman, Western Region, Ghana",
      country: "Ghana",
      continent: "Africa",
    };

    return data;
  })
);

app.listen(config.PORT, () =>
  console.log(`Server started on PORT: http://localhost:${config.PORT}`)
);
