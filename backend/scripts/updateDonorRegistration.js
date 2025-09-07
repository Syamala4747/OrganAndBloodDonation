// Usage: node scripts/updateDonorRegistration.js <donor_email>
// This script updates a donor's organ donation registration info in MongoDB.

import mongoose from 'mongoose';
import Donor from '../models/Donor.js';

const MONGO_URI = 'mongodb://localhost:27017/organandblooddonation'; // Change if needed

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/updateDonorRegistration.js <donor_email>');
  process.exit(1);
}

async function updateDonor() {
  await mongoose.connect(MONGO_URI);
  const donor = await Donor.findOne({ email });
  if (!donor) {
    console.error('Donor not found');
    process.exit(1);
  }
  donor.organsPledged = ['Kidney', 'Heart']; // Set desired organs
  donor.donationType = 'after_death'; // Set to 'before_death' or 'after_death'
  await donor.save();
  console.log('Donor registration updated:', donor);
  mongoose.disconnect();
}

updateDonor();
