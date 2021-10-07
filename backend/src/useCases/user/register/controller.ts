import { Request, Response, NextFunction } from 'express';
import * as User from '../User';
import { register } from './service';

export async function registration(
  req: Request<User.RegistrationRequest>,
  res: Response<User.RegistrationResponse>,
  next: NextFunction
): Promise<void> {
  const { username, password, email, initialFunds } = req.body;

  // const registeredUser =
  await register(username, password, email, initialFunds).catch(error =>
    next(error)
  );
  res.status(201).json({ result: 'Registration successful!' });
}
