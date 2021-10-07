import { OkPacket } from 'mysql';
import { validURL } from '../../../techWrap/typeService';
import { apiError, HttpStatus } from '../../../techWrap/errorService';
import { Sellable, sellableQuery } from '../Sellable';
import { SellRequest, SellResponse } from './model';

function preValidate(req: SellRequest) {
  if (
    !req.title ||
    !req.description ||
    !req.photoURL ||
    !req.minPrice ||
    !req.priceType
  ) {
    const missing: string[] = [];
    if (!req.hasOwnProperty('title')) missing.push('title');
    if (!req.hasOwnProperty('description')) missing.push('description');
    if (!req.hasOwnProperty('photoURL')) missing.push('photoURL');
    if (!req.hasOwnProperty('minPrice')) missing.push('minPrice');
    if (!req.hasOwnProperty('priceType')) missing.push('priceType');
    throw apiError(
      HttpStatus.BAD_REQUEST,
      `Unable to create item! Missing parameters: ${missing.join(', ')}`
    );
  } else if (req.minPrice < 0 || !Number.isInteger(req.minPrice)) {
    throw apiError(
      HttpStatus.BAD_REQUEST,
      'Unable to create item! Only positive whole number prices allowed.'
    );
  } else if (!validURL(req.photoURL)) {
    throw apiError(
      HttpStatus.BAD_REQUEST,
      'Unable to create item! Photo URL must be a valid URL. (http...)'
    );
  } else if (!['fixed', 'bid', 'hibrid'].includes(req.priceType)) {
    throw apiError(
      HttpStatus.BAD_REQUEST,
      'Unable to create item! Available pricing strategies are: fixed, bid or hibrid'
    );
  }
}

const sell = async (req: SellRequest): Promise<SellResponse> => {
  preValidate(req);
  const { insertId: id } = (await sellableQuery.postSellable(req)) as OkPacket;
  const sellable: Sellable = (await sellableQuery.getSellables({ id }))
    .results[0];
  const sellResponse: SellResponse = {
    status: 'ok',
    sellable,
  };

  return sellResponse;
};

export default sell;
