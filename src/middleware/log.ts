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
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    transports: [
      // Console-only transport (serverless friendly)
      new transports.Console(),
    ],
  });

  static logRequest(req: Request, res: Response, next: NextFunction): void {
    Logger.logger.info("Incoming request", {
      method: req.method,
      url: req.originalUrl || req.url,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    });

    next();
  }
}
