import { Request, Response, NextFunction } from 'express';
import { HttpStatus, apiError } from '../../../techWrap/errorService';

export async function bidding(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // 0. get the post id and the bid value
  const { postID, bidValue } = req.body;
  if (!(postID || bidValue)) {
    next(
      apiError(
        HttpStatus.BAD_REQUEST,
        'Bad request! (postID or bidAmount is missing)'
      )
    );
  }
  // 00. Check if the bidder has the amount to be bidded
  // 1. check if the posting exists at all (and is biddable)
  // 2. check if the bid was higher than the previous bid.
}
