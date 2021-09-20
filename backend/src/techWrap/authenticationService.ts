import jwt from 'jsonwebtoken';
import {SECRETKEY} from "../config/config"
import { LoginResponse } from '../useCases/user/login/model';
import { User } from '../useCases/user/User';

export function verifyToken (token:string) {
  return jwt.verify(token,SECRETKEY)
}

export function signToken(user: User): LoginResponse {
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
  return {
    status: 'ok',
    token,
  };
}