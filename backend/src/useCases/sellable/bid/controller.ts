import { Request, Response, NextFunction } from 'express';
import { setFlagsFromString } from 'v8';
import { HttpStatus, apiError } from '../../../techWrap/errorService';
import { bidService } from './service';

export async function bidController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!(req.body.sellableID && req.body.bidAmount)) {
      throw apiError(
        HttpStatus.BAD_REQUEST,
        'Bad request! (sellableID or bidAmount is missing)'
      );
    }
    const data = await bidService(
      req.user,
      req.body.sellableID,
      req.body.bidAmount
    );
    res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

// 1. check if the posting exists at all (and is biddable)
// 2. check if the bid was higher than the previous bid.

// // (function bidInputValidation(r: Request = req): boolean {
// //   const {sellableID,bidAmount } = r.body;
// //   if (!(sellableID && bidAmount)) {
// //     throw apiError(
// //       HttpStatus.BAD_REQUEST,
// //       'Bad request! (postID or bidAmount is missing)'
// //     );
// //   } else if (!Number.isInteger(bidAmount) || bidAmount<=0  ){
// //     throw apiError(
// //       HttpStatus.BAD_REQUEST,
// //       'Bad request! (bidAmount not a positive integer)'
// //     );
// //   } else if(r.user.balance >=bidAmount){
// //     throw apiError(
// //       HttpStatus.BAD_REQUEST,
// //       "Your balance is below the selected bid amount, please upload more funds and retry!"
// //     );
// //   } else {
// //     return true;
// //   }
// // })();
