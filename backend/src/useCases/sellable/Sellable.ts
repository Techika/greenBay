import { SellRequest } from './sell/model';
import { escape } from 'mysql2';
import { dbService } from '../../techWrap/dbService';
import { apiError, HttpStatus } from '../../techWrap/errorService';
import { currentTimeStamp } from '../../techWrap/timeService';
import { SellableGetOptions, SellableGetResults } from './get/model';
import {
  SellableBidParams,
  SellableBidResults,
  SellableBuyParams,
} from './bid/model';

export interface Sellable {
  id: string;
  seller_id: string;
  seller_nick?: string;
  title: string;
  posted_at: number;
  description: string;
  buyer_id?: string;
  buyer_nick?: string;
  photo_url?: string;
  min_price?: number;
  max_price?: number;
  last_bid_amount?: number;
  last_bidder_id?: number;
  sell_price?: number;
  posted_until?: number;
  sold_at?: number;
  bids?: Bid[];
  price_type: 'fixed' | 'bid' | 'hibrid';
  status: 'closed' | 'open' | 'sold';
}

export interface Bid {
  id: string;
  bidder_id: string;
  bidderNick: string;
  sellable_id: string;
  sellableTitle: string;
  bid_amount: number;
  bid_at: number;
}

export const sellableQuery = {
  postSellable: async (req: SellRequest): Promise<unknown> => {
    const {
      title,
      description,
      photoURL,
      minPrice,
      maxPrice,
      priceType,
      postedUntil,
      sellerId,
    } = req;
    const postedAt: number = currentTimeStamp();
    const dbResult = await (dbService.query(
      `INSERT INTO sellable
        (title, description, photo_url, min_price, max_price, price_type, posted_until, posted_at, seller_id, status ) 
        VALUES ( ? );`,
      [
        [
          title,
          description,
          photoURL,
          minPrice,
          maxPrice,
          priceType,
          postedUntil,
          postedAt,
          sellerId,
          'open',
        ],
      ]
    ) as unknown);
    if (!dbResult) {
      throw apiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Could not create sellable item!'
      );
    }
    return dbResult;
  },
  getSellables: async (
    req: SellableGetOptions
  ): Promise<SellableGetResults> => {
    const dbResult = await ((dbService.query(
      `
        SELECT * FROM sellable
        WHERE status LIKE '%'
        ${req.id ? `AND id = ${escape(req.id)}` : ''}
        ${req.seller_id ? `AND seller_id = ${escape(req.seller_id)}` : ''}
        ${!req.seller_id && !req.id ? `AND status = "open"` : ''}
      ;`,
      []
    ) as unknown) as SellableGetResults);
    if (!dbResult) {
      throw apiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Could not fetch Sellable items!'
      );
    }
    return dbResult;
  },
  bidSellable: async (req: SellableBidParams): Promise<SellableBidResults> => {
    const dbResult = await ((dbService.transaction(
      [
        `
      UPDATE user 
      SET 
        balance = balance + ?, 
        locked_balance = locked_balance - ?
      WHERE (id = ?)
      ;
        `,
        `
        UPDATE sellable
        SET
          last_bid_amount = ?,
          last_bid_at = ?,
          last_bidder_id = ?
        WHERE (id = ?)
        ;
          `,
        `
        INSERT INTO bid
          (bidder_id, sellable_id, bid_at, bid_amount)
        VALUES
          (?)
        ;
          `,
        `
        UPDATE user
        SET
          balance = balance - ?,
          locked_balance = locked_balance + ?
        WHERE (id = ?)
        ;
          `,
      ],
      [
        [req.last_bid_amount, req.last_bid_amount, req.last_bidder_id],
        [req.bid_amount, req.bid_at, req.bidder_id, req.sellable_id],
        [[req.bidder_id, req.sellable_id, req.bid_at, req.bid_amount]],
        [req.bid_amount, req.bid_amount, req.bidder_id],
      ]
    ) as unknown) as SellableBidResults);
    if (!dbResult) {
      throw apiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Could not fetch database response!'
      );
    }
    return dbResult;
  },
  buySellable: async (req: SellableBuyParams): Promise<SellableBidResults> => {
    const dbResult = await ((dbService.transaction(
      [
        `
      UPDATE sellable 
      SET 
        sell_price = ?, 
        sold_at = ?,
        buyer_id = ?,
        status = 'sold'
      WHERE (id = ?)
      ;`,
        `
      UPDATE user 
      SET 
        locked_balance = locked_balance - ?
      WHERE (id = ?)
      ;
      `,
      ],
      [
        [req.sell_price, req.sold_at, req.buyer_id, req.sellable_id],
        [req.sell_price, req.buyer_id],
      ]
    ) as unknown) as SellableBidResults);
    if (!dbResult) {
      throw apiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Could not fetch database response!'
      );
    }
    return dbResult;
  },
};
