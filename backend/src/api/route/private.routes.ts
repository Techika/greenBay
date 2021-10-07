import cors from 'cors';
import express from 'express';
import { bidding } from '../../useCases/sellable/bid/controller';
import { gettingSellables } from '../../useCases/sellable/get/controller';
import { selling } from '../../useCases/sellable/sell/controller';
import { requestAuthenticator } from '../middleware/requestAuthenticator';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(requestAuthenticator);

router.post('/sell', selling);
// router.get('/view/:what/:param', gettingSellables);
router.get('/view/:what', gettingSellables);
router.post('/bid', bidding);

export default router;
