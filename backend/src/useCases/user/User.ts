import { Url } from 'url';
import { dbService } from '../../techWrap/dbService';
import { internalServerError } from '../../techWrap/errorService';
import { Sellable } from '../sellable/Sellable';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  status: 'unconfirmed' | 'confirmed' | 'verified';
  state: 'open' | 'locked' | 'closed';
  balance: number;
  sellables: Sellable[];
  bids: Sellable[];
  purchases:Sellable[];
}

export interface RegistrationRequest {
  username: string;
  password: string;
  email:string;
  initialFunds:number;
}

// export interface RegistrationResponse {
//   id: number;
//   username: string;
// }
export interface RegistrationResponse {
    result: string;
  }

export interface SqlResultUser {
  results: Array<User>;
  fields: Array<unknown>;
}

export interface SqlResultRegistration {
  id: number,
  username: string,
  status: string
}

export const userQuery = {
  getUserByUsername: async (username: string): Promise<User> => {
    const dbResult: SqlResultUser = await (
      (dbService.query(
      'SELECT * FROM user WHERE username=?;', [username]
    ) as unknown) as SqlResultUser);
    return dbResult.results[0];
  },

  registerUser: async (username: string, password: string, email: string, initialFunds:number ) => {
    const insertUserResult: any = await (
      (dbService.query(
      `INSERT INTO user
      (username, password, email, balance, status, state ) 
      VALUES ( ?, ?, ?, ?, ?, ? );`,
      [username, password, email, initialFunds, 'unconfirmed', 'open']
    ) as unknown) as SqlResultUser);

    if (!insertUserResult) {
      throw internalServerError('Could not insert user');
    }
    
    return insertUserResult
    // {
    //   insertUserResult
    //   insertUserResult.results[0];
    //   // id: insertUserResult.results.insertId,
    //   // username,
    // };
  },

};