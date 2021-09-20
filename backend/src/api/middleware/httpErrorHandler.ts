import { Request, Response, NextFunction } from 'express';
import {HttpException} from '../../techWrap/errorService';
import logger from '../../techWrap/logService';

export default function httpErrorHandler(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  logger.error(message);
  // response.set({ 'content-type': 'application/json; charset=utf-8' });
  response.status(status).send({
    status: 'error',
    message,
  });
}
