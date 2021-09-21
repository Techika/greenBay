import { Sellable, sellableQuery } from '../Sellable';
import { SellableGetOptions, SellableGetResponse } from './model';

export const getSellables = async (
  req: SellableGetOptions
): Promise<SellableGetResponse> => {
  const sellables: Sellable[] = (await sellableQuery.getSellables(req)).results;
  return {
    status: 'ok',
    sellables,
  };
};
