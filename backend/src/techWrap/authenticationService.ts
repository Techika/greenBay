import jwt from 'jsonwebtoken';
import {SECRETKEY} from "../config/config"
import { User } from '../useCases/user/User';

export function verifyToken (token:string) {
  return jwt.verify(token,SECRETKEY)
}

export function signToken(user: User): string {
  const token = jwt.sign(
    {
      userId: user.id,
      userName: user.username,
    },
    SECRETKEY,
    {
      expiresIn: '1h',
    },
  );
  return token
}