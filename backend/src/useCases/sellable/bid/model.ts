export interface BidResponse {
  [key: string]: any;
}

export interface SellableBidParams {
  bid_amount: number;
  bid_at: number;
  bidder_id: number;
  sellable_id: number;
  bidder_balance: number;
  bidder_locked_balance: number;
}

export interface SellableBidResults {
  [key: string]: any;
}

export interface SellableBuyParams {
  sell_price: number;
  sold_at: number;
  buyer_id: number;
  sellable_id: number;
  bidder_locked_balance: number;
}

export interface SellableBuyResults {
  [key: string]: any;
}
