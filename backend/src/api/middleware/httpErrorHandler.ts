import { Request, Response, NextFunction } from 'express';
import {
  ApiError,
  DatabaseError,
  HttpStatus,
} from '../../techWrap/errorService';
import logger from '../../techWrap/logService';

export default function httpErrorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  let status = 'error';
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  if (error.hasOwnProperty('sqlMessage')) {
    message = (error as DatabaseError).sqlMessage;
  }

  logger.error(message);
  response.status(statusCode).send({ status, message });
}
