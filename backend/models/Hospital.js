import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  licenseId: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  verificationDocs: [{ type: String }],
  requests: [{
    type: { type: String },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
    status: { type: String },
    date: { type: Date },
    notes: { type: String }
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Hospital', hospitalSchema);
