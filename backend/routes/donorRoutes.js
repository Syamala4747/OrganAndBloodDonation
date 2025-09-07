
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getDonorProfile, updateDonorProfile, getDonorStatus, addSupportQuery, uploadDonorPhoto } from '../controllers/donorController.js';
const router = express.Router();

router.get('/profile', protect, getDonorProfile);
router.put('/profile', protect, updateDonorProfile);
router.get('/status', protect, getDonorStatus);
router.post('/support', protect, addSupportQuery);

// Cloudinary photo upload
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'donor_photos',
		allowed_formats: ['jpg', 'png', 'jpeg']
	}
});
const upload = multer({ storage });
router.post('/upload-photo', protect, upload.single('photo'), uploadDonorPhoto);

export default router;
