import { dbService, dbTransaction } from '../../../techWrap/dbService';
import { apiError, HttpStatus } from '../../../techWrap/errorService';
import { currentTimeStamp } from '../../../techWrap/timeService';
import { User, userQuery } from '../../user/User';
import { sellableQuery } from '../Sellable';
import { BidResponse } from './model';
import { bidInputValidation, bidPreValidation } from './validation';

export const bidService = async (
  bidder: User,
  sellable_id: number,
  bid_amount: number
): Promise<BidResponse> => {
  if (bidInputValidation(bidder, sellable_id, bid_amount)) {
    const sellable = (await sellableQuery.getSellables({ id: sellable_id }))
      .results[0];
    // console.log(sellable);
    if (bidPreValidation(bidder, bid_amount, sellable)) {
      const timeStamp = currentTimeStamp();
      if (sellable.max_price && bid_amount >= sellable.max_price) {
        // in case the Bid results in a fixed Buy
        bid_amount = sellable.max_price;
        const bidResponse = await sellableQuery.bidSellable({
          bid_amount,
          bid_at: timeStamp,
          bidder_id: bidder.id,
          sellable_id,
          last_bidder_id: sellable.last_bidder_id,
          last_bid_amount: sellable.last_bid_amount,
        });
        // console.log(bidResponse);
        const sellResponse = await sellableQuery.buySellable({
          sell_price: sellable.max_price,
          sold_at: timeStamp,
          buyer_id: bidder.id,
          sellable_id,
        });
        // console.log(sellResponse);
      } else if (!sellable.max_price || sellable.max_price > bid_amount) {
        // in case a normal Bid occurs, and bidding remains open
        const bidResponse = await sellableQuery.bidSellable({
          bid_amount,
          bid_at: timeStamp,
          bidder_id: bidder.id,
          sellable_id,
          last_bidder_id: sellable.last_bidder_id,
          last_bid_amount: sellable.last_bid_amount,
        });
      }
      return (await sellableQuery.getSellables({ id: sellable_id })).results[0];
    } // if prevalidation fails, but no error thrown yet
    throw apiError(
      HttpStatus.NOT_ACCEPTABLE,
      `Bid bidPreValidation ran into an undefined problem, please contact an Admin`
    );
  } // if inputValidation fails, but no error thrown yet
  throw apiError(
    HttpStatus.NOT_ACCEPTABLE,
    `Bid bidInputValidation ran into an undefined problem, please contact an Admin`
  );
};
