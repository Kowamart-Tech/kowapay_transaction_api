import {
  createLogger,
  transports,
  format,
  Logger as WinstonLogger,
} from "winston";
import { Request, Response, NextFunction } from "express";

export default class Logger {
  static logger: WinstonLogger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "logs/error.log",
        level: "error",
        format: format.combine(
          format.timestamp(),
          format.errors({ stack: true }),
          format.json()
        ),
      }),
      new transports.File({ filename: "logs/combined.log" }),
    ],
  });

  static logRequest(req: Request, res: Response, next: NextFunction): void {
    Logger.logger.info(`${req.method} ${req.url}`);
    next();
  }
}