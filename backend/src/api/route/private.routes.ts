import cors from "cors";
import express from "express";
import { requestAuthenticatior } from "../middleware/requestAuthenticator";

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(requestAuthenticatior);


export default router;
