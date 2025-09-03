import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { getDashboardSummary, getPendingApprovals, approveUser, rejectUser, getAnalytics, getReports, suspendUser, getAllUsers } from '../controllers/adminController.js';
const router = express.Router();

router.get('/dashboard', protect, adminOnly, getDashboardSummary);
router.get('/approvals', protect, adminOnly, getPendingApprovals);
router.post('/approve', protect, adminOnly, approveUser);
router.post('/reject', protect, adminOnly, rejectUser);
router.get('/analytics', protect, adminOnly, getAnalytics);
router.get('/reports', protect, adminOnly, getReports);
router.post('/suspend', protect, adminOnly, suspendUser);
router.get('/users', protect, adminOnly, getAllUsers);

export default router;
