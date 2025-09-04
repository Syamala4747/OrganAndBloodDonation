import express from 'express';
import DonorNotification from '../models/DonorNotification.js';

const router = express.Router();

// Get notifications for a donor
router.get('/:donorId', async (req, res) => {
  try {
    const notifications = await DonorNotification.find({ donor: req.params.donorId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    await DonorNotification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
