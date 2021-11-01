import cors from 'cors';
import express from 'express';
import { loginController } from '../../useCases/user/login/controller';
import { registrationController } from '../../useCases/user/register/controller';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registrationController);
router.post('/login', loginController);

export default router;
