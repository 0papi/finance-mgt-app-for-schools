import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  transports: [
    new transports.File({
      level: "warn",
      filename: "logs/warnLogs.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/errorLogs.log",
    }),
  ],
  format: format.combine(
    format.json(),
    format.metadata(),
    format.timestamp(),
    format.prettyPrint()
  ),
});

export const formatErrorMessage = format.printf(
  ({ level, meta, timestamp }): string => {
    return `${timestamp} ${level}: ${meta.message}`;
  }
);
