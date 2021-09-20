import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../../techWrap/errorService';
import * as User from '../User';
import { register } from './service';

export async function registration(
    req: Request<User.RegistrationRequest>,
    res: Response<User.RegistrationResponse>,
    next: NextFunction
  ): Promise<void> {
    const { username, password, email, initialFunds } = req.body;
    console.log('pw',password);
    
    const registeredUser = await 
      register( username, password, email, initialFunds )
      .catch(error => {
        next(
          new HttpException(
            error.errorStatus,
            error.errorMessage?.message || `DB error: ${error.sqlMessage}` ||'DB error: '
          )
        );
      });
    res.status(201).json( {result:"Registration successful!"} );
  }