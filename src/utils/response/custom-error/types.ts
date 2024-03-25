export type ErrorResponse = {
  errorMessage: string;
  errorsValidation: ErrorValidation[] | null;
};

export type ErrorValidation = { [key: string]: string };
