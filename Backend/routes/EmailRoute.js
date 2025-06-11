import express from 'express';
import { sendAttendanceReport } from '../controllers/EmailController.js';

const router = express.Router();

router.route("/sendreport").post(sendAttendanceReport);

export default router;
