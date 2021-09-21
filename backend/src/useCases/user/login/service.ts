import { compareSync } from 'bcryptjs';
import { signToken } from '../../../techWrap/authenticationService';
import { badRequestError, notAcceptableError, unauthorizedError } from '../../../techWrap/errorService';
import { userQuery } from '../User';
import { LoginResponse } from './model';


function preValidate(username: string, password: string) {
  if (!username && !password) {
    throw badRequestError('Username and password is required.');
  } else if (!username) {
    throw badRequestError('Username is required.');
  } else if (!password) {
    throw badRequestError('Password is required.');
  } else if (password.length < 8) {
    throw notAcceptableError('Password must be 8 characters.');
  }
}


const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  preValidate(username, password);
  const user = await userQuery.getUserByUsername(username);
  if (!user || !compareSync(password, user.password))
    throw unauthorizedError('Username or password is incorrect.');
  const token = signToken(user)
  const loginResponse:LoginResponse = {
    status:'ok',
    username: user.username,
    balance: user.balance,
    token,
  }
  return loginResponse;
};


export const userAuthentication = {
  login,
  preValidate,
};
