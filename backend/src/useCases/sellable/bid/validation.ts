import { Request, Response, NextFunction } from 'express';
import { HttpStatus, apiError } from '../../../techWrap/errorService';
import { currentTimeStamp } from '../../../techWrap/timeService';
import { User } from '../../user/User';
import { Sellable } from '../Sellable';

export function bidInputValidation(
  bidder: User,
  sellableID: number,
  bidAmount: number
): boolean {
  if (!Number.isInteger(Number(bidAmount)) || Number(bidAmount) <= 0) {
    throw apiError(
      HttpStatus.BAD_REQUEST,
      `Bad request! (bidAmount $${bidAmount} is not a positive integer)`
    );
  } else if (bidder.balance <= bidAmount) {
    throw apiError(
      HttpStatus.BAD_REQUEST,
      `Your balance ($${bidder.balance}) is below the selected bid amount ($${bidAmount}), please upload more funds and retry!`
    );
  } else {
    return true;
  }
}

export function bidPreValidation(
  bidder: User,
  amount: number,
  sellable: Sellable
): boolean {
  if (!sellable) {
    throw apiError(
      HttpStatus.NOT_FOUND,
      'The tageted sellable item is not found in the database!'
    );
  } else if (
    sellable.status !== 'open' ||
    (sellable.posted_until && sellable.posted_until < currentTimeStamp())
  ) {
    throw apiError(
      HttpStatus.NOT_ACCEPTABLE,
      'The targeted sellable item is not open for bids!'
    );
  } else if (sellable.price_type === 'fixed' && amount < sellable.max_price!) {
    throw apiError(
      HttpStatus.NOT_ACCEPTABLE,
      `The targeted sellable has a fixed price of $${sellable.max_price}! (your bid was: $${amount})`
    );
  } else if (sellable.min_price && sellable.min_price > amount) {
    throw apiError(
      HttpStatus.NOT_ACCEPTABLE,
      `The bid amount ($${amount}) is lower than the sellable's minimum bid mount ($${sellable.min_price}), submit a higher bid!`
    );
  } else if (sellable.last_bid_amount && sellable.last_bid_amount >= amount) {
    throw apiError(
      HttpStatus.NOT_ACCEPTABLE,
      `The bid amount ($${amount}) is not higher than the last registered bid ($${sellable.last_bid_amount}), submit a higher bid!`
    );
  } else {
    return true;
  }
}
