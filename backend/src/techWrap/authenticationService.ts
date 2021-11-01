import jwt from 'jsonwebtoken';
import { TokenPayload } from '../api/RequestModel';
import { SECRETKEY } from '../config/config';
import { User, userQuery } from '../useCases/user/User';

export async function verifyToken(token: string): Promise<User> {
  const verifiedToken = jwt.verify(token, SECRETKEY) as TokenPayload;
  const user = await userQuery.getUserByUsername(verifiedToken.userName);
  return user;
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
    }
  );
  return token;
}
