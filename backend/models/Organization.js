import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  verificationDocs: [{ type: String }],
  donors: [{
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
    pledgeType: { type: String },
    nomineeName: { type: String },
    nomineeContact: { type: String }
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Organization', organizationSchema);



