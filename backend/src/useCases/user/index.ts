import { loginController } from './login/controller';
import { userAuthentication } from './login/service';
import { registrationController } from './register/controller';
import { registrationService } from './register/service';
import { userQuery } from './User';

export const userController = {
  registrationController,
  loginController,
};
export const userService = {
  registrationService,
  userAuthentication,
};

export const userModel = {
  User: userQuery,
};
