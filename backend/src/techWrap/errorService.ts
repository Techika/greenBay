export function apiError(errorCode: HttpStatus, message: string): ApiError {
  return new ApiError(errorCode, message);
}
export enum HttpStatus {
  'BAD_REQUEST' = 400,
  'UNAUTHORIZED' = 401,
  'FORBIDDEN' = 403,
  'NOT_FOUND' = 404,
  'NOT_ACCEPTABLE' = 406,
  'CONFLICT' = 409,
  'INTERNAL_SERVER_ERROR' = 500,
}
export interface ApiError {
  status: 'error';
  statusCode: number;
  message: string;
}
export class ApiError extends Error implements ApiError {
  status: 'error' = 'error';
  statusCode: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
    this.message = message;
  }
}

export interface DatabaseError {
  sqlMessage: string;
}
export class DatabaseError extends Error implements DatabaseError {
  sqlMessage: string;
  constructor(message: string) {
    super(message);
    this.sqlMessage = message;
  }
}

// export const apiError: ApiError = {
//   badRequest: (message: string) => apiExceptionFactory(400, message),
//   unauthorized: (message: string) => apiExceptionFactory(401, message),
//   forbidden: (message: string) => apiExceptionFactory(403, message),
//   notFound: (message: string) => apiExceptionFactory(404, message),
//   notAcceptable: (message: string) => apiExceptionFactory(406, message),
//   conflict: (message: string) => apiExceptionFactory(409, message),
//   internalServer: (message: string) => apiExceptionFactory(500, message),
// };

// const apiErrorType = {
//   'badRequest':400,
//   'unauthorized':401,
//   'forbidden':403,
//   'notFound':404,
//   'notAcceptable':406,
//   'conflict':409,
//   'internalServer':500,
// }

// type ApiErrorType = [K in apiErrorType           ] : number//typeof {...apiErrorType;

// const apiErrorTypes = [
//   'badRequest',
//   'unauthorized',
//   'forbidden',
//   'notFound',
//   'notAcceptable',
//   'conflict',
//   'internalServer',
// ] as const;
// const apiErrorTypes = [
//   ['badRequest',400],
//   ['unauthorized',401],
//   ['forbidden',403],
//   ['notFound',404],
//   ['notAcceptable',406],
//   ['conflict',409],
//   ['internalServer',500],
// ] as const;
// export const rapiError3 = apiErrorType.reduce((acc,curr)=> (acc[curr]='',acc),{});
// export const apiError2:ApiError = apiErrorType.reduce(arr => {
//   `arr[0]`:(message: string) => apiExceptionFactory(arr[1], message)
// })

// type ApiErrorTypes = typeof apiErrorType[];

// type ApiErrorTypes =
//   | 'badRequest'
//   | 'unauthorized'
//   | 'forbidden'
//   | 'notFound'
//   | 'notAcceptable'
//   | 'conflict'
//   | 'internalServer';
// type ApiError = {
//   [K in ApiErrorTypes]: (s: string) => ApiException;
// };
