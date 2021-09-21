import { Sellable } from '../Sellable';

export interface SellableGetResults {
  results: Array<Sellable>;
  fields: Array<unknown>;
}

export interface SellableGetOptions {
  id?: number;
  seller_id?: number;
}

export interface SellableGetResponse {
  status: string;
  sellables: Sellable[];
}
