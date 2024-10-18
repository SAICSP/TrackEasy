import { Router } from "express";
import {sendwhatsapp} from '../controllers/Whatsappcontroller.js';

const router = Router();

router.route('/sendwhatsapp').post(sendwhatsapp);

export default router;