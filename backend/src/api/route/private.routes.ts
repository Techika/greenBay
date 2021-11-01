import cors from 'cors';
import express from 'express';
import { bidController } from '../../useCases/sellable/bid/controller';
import { sellableGetController } from '../../useCases/sellable/get/controller';
import { sellController } from '../../useCases/sellable/sell/controller';
import { requestAuthenticator } from '../middleware/requestAuthenticator';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(requestAuthenticator);

router.post('/sell', sellController);
// router.get('/view/:what/:param', gettingSellables);
router.get('/view/:what', sellableGetController);
router.post('/bid', bidController);

export default router;
