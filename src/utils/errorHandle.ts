import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";
import HttpException from "../utils/httpExceptions";
import Logger from  "../middleware/log";

/**
 * Format Zod validation errors
 */
const formatZodError = (error: ZodError) => {
  return error.errors.map((err: ZodIssue) => ({
    path: err.path.join("."),
    message: err.message,
    code: err.code,
  }));
};

/**
 * Async error handler wrapper
 */
const errorHandler =
  (
    method: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await method(req, res, next);
    } catch (error: unknown) {
      Logger.logger.error("Error caught in errorHandler:", error);

      let status = 500;
      let message = "Internal Server Error";
      let details: any = null;

      if (error instanceof HttpException) {
        status = error.status;
        message = error.message;
        details = error.details;
      } else if (error instanceof ZodError) {
        status = 400;
        message = "Validation Error";
        details = formatZodError(error);
      } else if (error instanceof Error) {
        switch (error.message) {
          case "Authorization denied":
            status = 401;
            message = "Authorization denied";
            break;
          case "Not Authorized":
            status = 403;
            message = "Not Authorized";
            break;
          case "Not Found":
            status = 404;
            message = "Resource Not Found";
            break;
          case "Bad Request":
            status = 400;
            message = "Bad Request";
            break;
          default:
            message = error.message || "Internal Server Error";
            details = error;
            break;
        }
      } else {
        details = error;
      }

      res.status(status).json({
        status,
        success: false,
        message,
        details,
      });

      Logger.logger.error(
        `Error Response Sent: ${JSON.stringify({
          status,
          message,
          details,
        })}`
      );
    }
  };

export { errorHandler };
