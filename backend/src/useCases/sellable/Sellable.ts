import { SellRequest } from './sell/model';
import * as mysql from 'mysql';
import { dbService } from '../../techWrap/dbService';
import { apiError, HttpStatus } from '../../techWrap/errorService';
import { currentTimeStamp } from '../../techWrap/timeService';
import { SellableGetOptions, SellableGetResults } from './get/model';

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
  sell_price?: number;
  posted_until?: number;
  sold_at?: number;
  bids?: Bid[];
  price_type: 'fixed' | 'bid' | 'hibrid';
  status: 'closed' | 'open' | 'sold';
}

export interface Bid {
  id: string;
  bidderId: string;
  bidderNick: string;
  sellableId: string;
  sellableTitle: string;
  bidAt: number;
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
        ${req.id ? `AND id = ${mysql.escape(req.id)}` : ''}
        ${req.seller_id ? `AND seller_id = ${mysql.escape(req.seller_id)}` : ''}
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
};
