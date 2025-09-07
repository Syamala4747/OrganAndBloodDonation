import express from 'express';
import { createRequest, getDonorRequests, respondToRequest, getHospitalRequests } from '../controllers/donorRequestController.js';
import { protectDonor, protectHospital } from '../middleware/authMiddleware.js';

const router = express.Router();

// Simple test route to confirm backend connectivity
router.get('/test', (req, res) => {
	res.json({ message: 'Backend donor-request route is working!' });
});

// Hospital creates a request for a donor
router.post('/create', (req, res, next) => {
	console.log('Incoming donor request:', req.method, req.url, req.headers, req.body);
	next();
}, protectHospital, createRequest);

// Donor fetches their requests/notifications
router.get('/donor', protectDonor, getDonorRequests);

// Donor responds to a request
// Allow GET for email link responses (no auth, but validate requestId)
router.get('/respond', async (req, res) => {
	const { requestId, response } = req.query;
	if (!requestId || !response) return res.status(400).send('Missing parameters');
	// Call controller logic directly
	try {
		const { respondToRequest } = await import('../controllers/donorRequestController.js');
		await respondToRequest({ body: { requestId, response }, user: {} }, {
			json: msg => res.send(`<h2>Thank you! Your response has been recorded.</h2>`),
			status: code => ({ json: msg => res.status(code).send(msg) })
		});
	} catch (err) {
		res.status(500).send('Error processing response');
	}
});
router.post('/respond', protectDonor, respondToRequest);

// Hospital fetches their requests/responses
router.get('/hospital', protectHospital, getHospitalRequests);

export default router;
