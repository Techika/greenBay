import { Request, Response, NextFunction } from 'express';
import { LoginRequest } from './model';
import { userAuthentication } from './service';

export async function loginController(
  req: Request<LoginRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { username, password } = req.body;
  const data = await userAuthentication
    .loginService(username, password)
    .catch(error => next(error));
  if (data) {
    res.status(200).json(data);
  }
}
