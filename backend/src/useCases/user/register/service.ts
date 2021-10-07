import bcrypt from 'bcryptjs';
import {
  apiError,
  DatabaseError,
  HttpStatus,
} from '../../../techWrap/errorService';
import { userAuthentication } from '../login/service';
import { userQuery } from '../User';

export async function register(
  username: string,
  password: string,
  email: string,
  initialFunds: number
): Promise<any> {
  userAuthentication.preValidate(username, password);
  const dbPassword = bcrypt.hashSync(password, 10);
  const user = await userQuery.getUserByUsername(username);
  if (user) {
    throw apiError(HttpStatus.CONFLICT, 'Username is already taken');
  }
  const savedUser = await userQuery.registerUser(
    username,
    dbPassword,
    email,
    initialFunds
  );
  return savedUser;
}
