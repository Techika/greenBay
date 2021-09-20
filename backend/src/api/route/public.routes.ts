import cors from "cors";
import express from "express";
import { loginAttempt } from "../../useCases/user/login/controller";
import { registration } from "../../useCases/user/register/controller";

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registration);
router.post('/login', loginAttempt);

export default router;