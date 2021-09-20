

import bcrypt from 'bcryptjs';
import { ConflictError } from '../../../techWrap/errorService';
import { userAuthentication } from '../login/service';
import { userQuery } from '../User';


export async function register (
  username: string,
  password: string,
  email:string,
  initialFunds: number,
): Promise<any> {
  userAuthentication.preValidate(username, password);
  const dbPassword = bcrypt.hashSync(password, 10);
  const user = await userQuery.getUserByUsername(username);
  if (user) {
    throw ConflictError('Username is already taken');
  }
  const savedUser = await userQuery.registerUser(username, dbPassword, email, initialFunds);

  return savedUser;
};
