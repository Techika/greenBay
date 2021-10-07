import { Request, Response, NextFunction } from 'express';
import { SellRequest } from './model';
import sell from './service';

export async function selling(
  req: Request<SellRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const data = await sell({ ...req.body, sellerId: req.user.userId }).catch(
    error => {
      return next(error);
    }
  );
  if (data) {
    res.status(200).json(data);
  }
}
