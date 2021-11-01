// import { TokenPayload } from "../useCases/user/User";

import { User } from '../useCases/user/User';

export interface TokenPayload {
  userId: number;
  userName: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export interface BidRequestBody {
  sellableID: number;
  bidAmount: number;
}
