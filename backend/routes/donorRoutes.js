import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDonorProfile, updateDonorProfile, getDonorStatus, addSupportQuery } from '../controllers/donorController.js';
const router = express.Router();

router.get('/profile', protect, getDonorProfile);
router.put('/profile', protect, updateDonorProfile);
router.get('/status', protect, getDonorStatus);
router.post('/support', protect, addSupportQuery);

export default router;
