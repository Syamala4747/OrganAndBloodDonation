import mongoose from 'mongoose';

const DonorRequestSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  organ: { type: String, required: true },
  donorEmail: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'ignored'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  respondedAt: { type: Date },
  response: { type: String, enum: ['accepted', 'ignored'] },
});

export default mongoose.model('DonorRequest', DonorRequestSchema);
