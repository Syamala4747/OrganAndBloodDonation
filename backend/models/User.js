import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: { type: String, enum: ['Donor', 'Hospital', 'Admin', 'Organization'], required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'APPROVED' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
