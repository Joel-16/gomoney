import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { CustomError } from "../../utils/response/custom-error/CustomError";
import { ErrorValidation } from "../../utils/response/custom-error/types";

export const validatorLogin = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  password = !password ? "" : password;

  if (!emailRegex.test(email)) {
    errorsValidation.push({ email: "Email is not in the right format" });
  }

  if (validator.isEmpty(password)) {
    errorsValidation.push({ password: "Password field is required" });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, "Login validation error", errorsValidation);
    return next(customError);
  }
  return next();
};
