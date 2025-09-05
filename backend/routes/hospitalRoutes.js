import { getHospitalProfile, updateHospitalProfile, searchDonors, requestDonation, getRequestsStatus, uploadHospitalProof, respondDonationRequest } from '../controllers/hospitalController.js';
import { protect } from '../middleware/authMiddleware.js';
import express from 'express';

import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Multer setup for proofOfEvidence file
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dir = 'uploads/';
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		cb(null, dir);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

router.get('/profile', protect, getHospitalProfile);
router.put('/profile', protect, updateHospitalProfile);
router.get('/donors', protect, searchDonors);
router.post('/request-donation', protect, requestDonation);
router.get('/requests-status', protect, getRequestsStatus);
router.post('/respond-donation', protect, respondDonationRequest);

// Upload/Update proof of evidence
router.post('/upload-proof', protect, upload.single('proofOfEvidence'), uploadHospitalProof);

export default router;
