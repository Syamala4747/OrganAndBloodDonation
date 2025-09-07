// Usage: node scripts/fixDonorData.js <donor_email>
// This script ensures the donor document has organ donation details for the given email.

import mongoose from 'mongoose';
import Donor from '../models/Donor.js';

const MONGO_URI = 'mongodb://localhost:27017/organandblooddonation'; // Change if needed

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/fixDonorData.js <donor_email>');
  process.exit(1);
}

async function fixDonor() {
  await mongoose.connect(MONGO_URI);
  const donor = await Donor.findOne({ email });
  if (!donor) {
    console.error('Donor not found');
    process.exit(1);
  }
  donor.organsPledged = ['Kidney', 'Heart']; // Set desired organs
  donor.donationType = 'after_death'; // Set to 'before_death' or 'after_death'
  await donor.save();
  console.log('Donor registration fixed:', donor);
  mongoose.disconnect();
}

fixDonor();
