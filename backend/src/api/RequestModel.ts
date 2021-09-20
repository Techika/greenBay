// import { TokenPayload } from "../useCases/user/User";

export interface TokenPayload {
  userId: number,
  userName: string,
}

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}