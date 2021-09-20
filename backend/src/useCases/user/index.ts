import { loginAttempt } from "./login/controller"
import { userAuthentication } from "./login/service"
import { registration } from "./register/controller"
import { register } from "./register/service"
import { userQuery } from "./User"

export const userController ={
  registration,
  loginAttempt
}
export const userService = {
  register,
  userAuthentication
}

export const userModel ={
  User: userQuery
}