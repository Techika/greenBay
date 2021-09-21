import cors from 'cors';
import express from 'express';
import { gettingSellables } from '../../useCases/sellable/get/controller';
import { selling } from '../../useCases/sellable/sell/controller';
import { requestAuthenticatior } from '../middleware/requestAuthenticator';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(requestAuthenticatior);

router.post('/sell', selling);
// router.get('/view/:what/:param', gettingSellables);
router.get('/view/:what', gettingSellables);
// router.post('/bid', bidding);

export default router;
