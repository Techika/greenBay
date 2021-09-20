export class HttpException extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export interface GeneralError {
  errorStatus: number;
  errorMessage: ErrorMessage;
}

interface ErrorMessage {
  status: string;
  message: string;
}

export function errorHandler(message: string): ErrorMessage {
  return {
    status: 'error',
    message,
  };
}

function generalError(httpsStatus: number): (s: string) => GeneralError {
  return function (message: string): GeneralError {
    return {
      errorStatus: httpsStatus,
      errorMessage: errorHandler(message),
    };
  };
}

export const badRequestError: (string: string) => GeneralError = generalError(
  400
);
export const unauthorizedError: (string: string) => GeneralError = generalError(
  401
);
export const forbiddenError: (string: string) => GeneralError = generalError(
  403
);
export const notFoundError: (string: string) => GeneralError = generalError(
  404
);
export const notAcceptableError: (string: string) => GeneralError = generalError(
  406,
);
export const ConflictError: (string: string) => GeneralError = generalError(
  409
);
export const internalServerError: (string: string) => GeneralError = generalError(
  500,
);

export const NotAcceptableError: (
  string: string
) => GeneralError = generalError(406);
