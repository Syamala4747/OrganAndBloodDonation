// Script to clean up verificationDocs in Hospital and Organization collections
// Removes 'uploads/' prefix from all filenames in verificationDocs arrays

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Hospital from '../models/Hospital.js';
import Organization from '../models/Organization.js';
import connectDB from '../config/db.js';

async function fixDocs() {
  await connectDB();
  let hospitalCount = 0;
  let orgCount = 0;

  // Fix Hospital verificationDocs
  const hospitals = await Hospital.find({ verificationDocs: { $exists: true, $ne: [] } });
  for (const hospital of hospitals) {
    const fixedDocs = hospital.verificationDocs.map(doc => doc.replace(/^uploads\//, ''));
    if (JSON.stringify(fixedDocs) !== JSON.stringify(hospital.verificationDocs)) {
      hospital.verificationDocs = fixedDocs;
      await hospital.save();
      hospitalCount++;
    }
  }

  // Fix Organization verificationDocs
  const orgs = await Organization.find({ verificationDocs: { $exists: true, $ne: [] } });
  for (const org of orgs) {
    const fixedDocs = org.verificationDocs.map(doc => doc.replace(/^uploads\//, ''));
    if (JSON.stringify(fixedDocs) !== JSON.stringify(org.verificationDocs)) {
      org.verificationDocs = fixedDocs;
      await org.save();
      orgCount++;
    }
  }

  console.log(`Fixed ${hospitalCount} hospital(s) and ${orgCount} organization(s).`);
  process.exit(0);
}

fixDocs().catch(err => {
  console.error('Error fixing verificationDocs:', err);
  process.exit(1);
});
