import { compareSync } from 'bcryptjs';
import { signToken } from '../../../techWrap/authenticationService';
import { apiError, HttpStatus } from '../../../techWrap/errorService';
import { userQuery } from '../User';
import { LoginResponse } from './model';

function preValidate(username: string, password: string) {
  if (!username && !password) {
    throw apiError(
      HttpStatus.BAD_REQUEST,
      'Username and password is required.'
    );
  } else if (!username) {
    throw apiError(HttpStatus.BAD_REQUEST, 'Username is required.');
  } else if (!password) {
    throw apiError(HttpStatus.BAD_REQUEST, 'Password is required.');
  } else if (password.length < 8) {
    throw apiError(HttpStatus.NOT_ACCEPTABLE, 'Password must be 8 characters.');
  }
}

const loginService = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  preValidate(username, password);
  const user = await userQuery.getUserByUsername(username);
  if (!user || !compareSync(password, user.password))
    throw apiError(
      HttpStatus.UNAUTHORIZED,
      'Username or password is incorrect.'
    );
  const token = signToken(user);
  const loginResponse: LoginResponse = {
    status: 'ok',
    username: user.username,
    balance: user.balance,
    token,
  };
  return loginResponse;
};

export const userAuthentication = {
  loginService,
  preValidate,
};
