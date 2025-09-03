import express from 'express';
import { sendSupportEmail } from '../controllers/supportController.js';

const router = express.Router();

router.post('/email', sendSupportEmail);

export default router;
