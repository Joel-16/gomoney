import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { CustomError } from "../../utils/response/custom-error/CustomError";
import { ErrorValidation } from "../../utils/response/custom-error/types";

export const validatorEditProfile = (req: Request, res: Response, next: NextFunction) => {
  let { email, firstname, lastname, address } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

  if (!emailRegex.test(email)) {
    errorsValidation.push({ email: "Email is not in the right format" });
  }

  if (firstname && validator.isEmpty(firstname)) {
    errorsValidation.push({ firstname: "firstname is not in the right format" });
  }

  if (lastname && validator.isEmpty(lastname)) {
    errorsValidation.push({ lastname: "lastname is not in the right format" });
  }

  if (address && validator.isEmpty(address)) {
    errorsValidation.push({ address: "address is not in the right format" });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, "Login validation error", errorsValidation);
    return next(customError);
  }
  return next();
};
