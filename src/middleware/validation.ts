import { RequestHandler } from "express";

import { CustomError } from "../utils/response/custom-error/CustomError";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export const validationMiddleware = (
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
  ): RequestHandler => {
    return (req, res, next) => {
      validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints|| error.children)).join(', ');
          next(new CustomError(400, message));
        } else {
          next();
        }
      });
    };
  };

