import { Request, Response, NextFunction } from 'express';
import { SellRequest } from './model';
import sellService from './service';

export async function sellController(
  req: Request<SellRequest>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const data = await sellService({ ...req.body, sellerId: req.user.id }).catch(
    error => {
      return next(error);
    }
  );
  if (data) {
    res.status(200).json(data);
  }
}
