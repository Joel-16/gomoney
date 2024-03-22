import { Request, Response, NextFunction } from "express";

import { logger } from "../utils/logger";
import { CustomError } from "../utils/response/custom-error/CustomError";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${err.HttpStatusCode}, Message:: ${err.message}`);
  return res.status(err.HttpStatusCode).json(err.JSON);
};
