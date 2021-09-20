import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '../../techWrap/authenticationService';
// import { TokenPayload } from '../../useCases/user/User';
import { TokenPayload } from '../RequestModel';
import { HttpException, unauthorizedError } from '../../techWrap/errorService';


export const requestAuthenticatior = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token: string | undefined = authHeader && authHeader.split(' ')[1];
  if (!token) throw unauthorizedError('Missing token.');
  try {
    const verifiedTokenPayload:TokenPayload = verifyToken (token) as TokenPayload;
    req.user = verifiedTokenPayload;
    return next();
  } catch (error) {
    const err = unauthorizedError('Invalid token')
    return next(new HttpException(err.errorStatus, err.errorMessage.message));
  }
};