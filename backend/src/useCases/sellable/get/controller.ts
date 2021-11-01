import { Request, Response, NextFunction } from 'express';
import { SellableGetOptions } from './model';
import { sellableGetService } from './service';

export async function sellableGetController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const queryObject: SellableGetOptions = {};
  switch (req.params.what) {
    case 'all': {
      break;
    }
    case 'mine': {
      queryObject.seller_id = Number(req.user.id);
      break;
    }
    case 'owner': {
      queryObject.seller_id = Number(req.query.id);
      break;
    }
    case 'single': {
      queryObject.id = Number(req.query.id);
      break;
    }
    default:
      break;
  }
  const data = await sellableGetService(queryObject).catch(error => {
    return next(error);
  });
  if (data) {
    res.status(200).json(data);
  }
}
