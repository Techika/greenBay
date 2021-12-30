// import { OkPacket } from 'mysql2';
import { validURL } from '../../../techWrap/typeService';
import { apiError, HttpStatus } from '../../../techWrap/errorService';
import { Sellable, sellableQuery } from '../Sellable';
import { SellRequest, SellResponse } from './model';
import { OkResponse } from '../../../techWrap/dbService';

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
  } else if (req.minPrice < 0 || !Number.isInteger(Number(req.minPrice))) {
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

const sellService = async (req: SellRequest): Promise<SellResponse> => {
  preValidate(req);
  const { insertId: id } = ((await sellableQuery.postSellable(
    req
  )) as OkResponse).results;
  console.log('id', id);
  const sellable: Sellable = (await sellableQuery.getSellables({ id }))
    .results[0];
  const sellResponse: SellResponse = {
    status: 'ok',
    sellable,
  };

  return sellResponse;
};

export default sellService;
