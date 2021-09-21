import { Sellable } from '../Sellable';

export interface SellRequest {
  title: string;
  description: string;
  photoURL: string;
  minPrice: number;
  maxPrice?: number;
  priceType: string;
  postedUntil?: number;
  sellerId: number;
}

export interface SellResponse {
  status: string;
  sellable: Sellable;
  message?: string;
}
