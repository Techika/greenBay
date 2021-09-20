import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../../techWrap/errorService';
import { LoginRequest } from './model';
import { userAuthentication } from './service';

export async function loginAttempt (
  req: Request<LoginRequest>,
  res: Response,
  next: NextFunction,)
  : Promise<void>  {
  const { username, password } = req.body;
  const data = await userAuthentication
    .login(username, password)
    .catch((error) => {
      next(new HttpException(error.errorStatus, error.errorMessage));
    });
  if (data) {
    res.status(200).json(data);
  }
}

