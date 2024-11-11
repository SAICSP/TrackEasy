import express from 'express';
import { sendAttendanceReport } from '../controllers/EmailController.js';

const router = express.Router();

router.post('/sendreport', sendAttendanceReport);

export default router;
