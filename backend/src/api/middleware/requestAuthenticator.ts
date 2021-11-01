import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '../../techWrap/authenticationService';
import { TokenPayload } from '../RequestModel';
import { apiError, HttpStatus } from '../../techWrap/errorService';

export const requestAuthenticator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token: string | undefined = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(apiError(HttpStatus.UNAUTHORIZED, 'Missing token'));
  }

  try {
    req.user = await verifyToken(token);
    return next();
  } catch (error) {
    return next(apiError(HttpStatus.UNAUTHORIZED, 'Invalid token'));
  }
};
