import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getHospitalProfile, updateHospitalProfile, searchDonors, requestDonation, getRequestsStatus } from '../controllers/hospitalController.js';
const router = express.Router();

router.get('/profile', protect, getHospitalProfile);
router.put('/profile', protect, updateHospitalProfile);
router.get('/donors', protect, searchDonors);
router.post('/request-donation', protect, requestDonation);
router.get('/requests-status', protect, getRequestsStatus);

export default router;
