import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';

import donorRoutes from './routes/donorRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import organDonationRoutes from './routes/organDonationRoutes.js';
import donorNotificationRoutes from './routes/donorNotificationRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import donorRequestRoutes from './routes/donorRequestRoutes.js';

// API routes

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);

app.use('/api/donor', donorRoutes);
app.use('/api/organ-donation', organDonationRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donor-request', donorRequestRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/donor-notifications', donorNotificationRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const setupAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return;
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await User.create({
      username: 'admin',
      email: adminEmail,
      password: hashed,
      category: 'Admin',
      status: 'APPROVED'
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

connectDB().then(async () => {
  await setupAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
