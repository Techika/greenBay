export interface BidResponse {
  [key: string]: any;
}

export interface SellableBidParams {
  bid_amount: number;
  bid_at: number;
  bidder_id: number;
  sellable_id: number;
  bidder_balance?: number; // Migth not be required if calculated in Query
  bidder_locked_balance?: number; // Migth not be required if calculated in Query
  last_bidder_id?: number;
  last_bid_amount?: number;
}

export interface SellableBidResults {
  [key: string]: any;
}

export interface SellableBuyParams {
  sell_price: number;
  sold_at: number;
  buyer_id: number;
  sellable_id: number;
  bidder_locked_balance?: number; // Migth not be required if calculated in Query
}

export interface SellableBuyResults {
  [key: string]: any;
}
