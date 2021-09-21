import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../../techWrap/errorService';
import { SellRequest } from './model';
import sell from './service';

export async function selling(
  req: Request<SellRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const data = await sell({ ...req.body, sellerId: req.user.userId }).catch(
    error => {
      next(new HttpException(error.errorStatus, error.errorMessage));
    }
  );
  if (data) {
    res.status(200).json(data);
  }
}
