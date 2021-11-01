import { dbService } from '../../../techWrap/dbService';
import { apiError, HttpStatus } from '../../../techWrap/errorService';
import { currentTimeStamp } from '../../../techWrap/timeService';
import { User, userQuery } from '../../user/User';
import { sellableQuery } from '../Sellable';
import { BidResponse } from './model';
import { bidInputValidation, bidPreValidation } from './validation';
import mysql from 'mysql';

export const bidService = async (
  bidder: User,
  sellable_id: number,
  bid_amount: number
): Promise<BidResponse> => {
  if (bidInputValidation(bidder, sellable_id, bid_amount)) {
    const sellable = (await sellableQuery.getSellables({ id: sellable_id }))
      .results[0];
    if (bidPreValidation(bidder, bid_amount, sellable)) {
      const timeStamp = currentTimeStamp();
      if (sellable.max_price && bid_amount >= sellable.max_price) {
        //When bid meets fixed price
        bid_amount = sellable.max_price;
        // dbService.beginTransaction()
        try {
          await
        } catch (error) {
          
        }
        const bidResponse = await sellableQuery.bidSellable({
          bid_amount,
          bid_at: timeStamp,
          bidder_id: bidder.id,
          sellable_id,
          bidder_balance: bidder.balance - bid_amount,
          bidder_locked_balance: bidder.locked_balance + bid_amount,
        });
        console.log(bidResponse);
        const sellResponse = await sellableQuery.buySellable({
          sell_price: sellable.max_price,
          sold_at: timeStamp,
          buyer_id: bidder.id,
          sellable_id,
          bidder_locked_balance: bidder.locked_balance,
        });
        console.log(sellResponse);
        return { response: 'testOK' };
      } else if (!sellable.max_price || sellable.max_price > bid_amount) {
        //When bid is without or below fixed price
        const bidResponse = await sellableQuery.bidSellable({
          bid_amount,
          bid_at: timeStamp,
          bidder_id: bidder.id,
          sellable_id,
          bidder_balance: bidder.balance - bid_amount,
          bidder_locked_balance: bidder.locked_balance + bid_amount,
        });
        console.log(bidResponse);
        return { response: 'testOK2' };
      }
    }
  }
  return { response: 'testOK3' };
};

// export const bidValidation = async ( bidderUsername:string, postID:number, amunt:number):Promise<boolean> =>{
//   const bidder = await userQuery.getUserByUsername(bidderUsername);

// }
