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
  if (!token){
    const err = unauthorizedError('Missing token')
    return next(new HttpException(err.errorStatus, err.errorMessage.message));
  }
  try {
    req.user = verifyToken (token) as TokenPayload;
    return next();
  } catch (error) {
    const err = unauthorizedError('Invalid token')
    return next(new HttpException(err.errorStatus, err.errorMessage.message));
  }
};