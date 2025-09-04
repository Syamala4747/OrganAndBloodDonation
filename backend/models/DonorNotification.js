import mongoose from 'mongoose';

const donorNotificationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  message: { type: String, required: true },
  hospital: { type: String },
  organ: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('DonorNotification', donorNotificationSchema);
