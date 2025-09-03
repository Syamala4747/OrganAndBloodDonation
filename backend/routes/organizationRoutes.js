import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getOrgProfile, updateOrgProfile, getAfterDeathDonors, addOrgContactQuery } from '../controllers/organizationController.js';
const router = express.Router();

router.get('/profile', protect, getOrgProfile);
router.put('/profile', protect, updateOrgProfile);
router.get('/after-death-donors', protect, getAfterDeathDonors);
router.post('/contact', protect, addOrgContactQuery);

export default router;
