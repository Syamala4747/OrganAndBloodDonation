
import express from 'express';
import { registerOrganDonation, getOrganDonationStatus, getLivingDonors, getAllOrganDonations, upload } from '../controllers/organDonationController.js';

const router = express.Router();
// Admin: Get all organ donation registrations
router.get('/all', getAllOrganDonations);
// Get all living donors (before_death) for hospital dashboard
router.get('/living-donors', getLivingDonors);

// ...existing code...
router.post('/register', upload.fields([
	{ name: 'medicalCertificate', maxCount: 1 },
	{ name: 'photo', maxCount: 1 }
]), registerOrganDonation);
router.get('/status', getOrganDonationStatus);

export default router;
