import { ErrorValidation, ErrorResponse } from "./types";

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorsValidation: ErrorValidation[] | null;

  constructor(httpStatusCode: number, message: string, errorsValidation: ErrorValidation[] | null = null) {
    super(message);

    this.name = this.constructor.name;
    this.httpStatusCode = httpStatusCode;
    this.errorsValidation = errorsValidation;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorMessage: this.message,
      errorsValidation: this.errorsValidation,
    };
  }
}
