import { Response } from "express";

export const successResponse = (
  res: Response,
  data: unknown,
  message: string,
  status: number,
) => {
  res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};