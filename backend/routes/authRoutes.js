
import express from 'express';
import { donorSignup, login, requestSignup, forgotPassword } from '../controllers/authController.js';
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

// Donor signup
router.post('/donor-signup', donorSignup);
// Hospital signup
router.post('/hospital-signup', upload.single('proofOfEvidence'), requestSignup); // will distinguish in controller
// Organization signup
router.post('/organization-signup', upload.single('proofOfEvidence'), requestSignup); // will distinguish in controller

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

export default router;
