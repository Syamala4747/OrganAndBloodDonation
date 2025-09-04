import { getOrgProfile, updateOrgProfile, getAfterDeathDonors, addOrgContactQuery, uploadOrganizationProof } from '../controllers/organizationController.js';
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

router.get('/profile', protect, getOrgProfile);
router.put('/profile', protect, updateOrgProfile);
router.get('/after-death-donors', protect, getAfterDeathDonors);
router.post('/contact', protect, addOrgContactQuery);

// Upload/Update proof of evidence
router.post('/upload-proof', protect, upload.single('proofOfEvidence'), uploadOrganizationProof);

export default router;
