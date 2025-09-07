// Script to update missing hospital details in the database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Hospital from '../models/Hospital.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/organandblood';

async function updateHospitals() {
  await mongoose.connect(MONGO_URI);
  const hospitals = await Hospital.find({});
  for (const hospital of hospitals) {
    let updated = false;
    if (!hospital.name) { hospital.name = 'Default Hospital Name'; updated = true; }
    if (!hospital.licenseId) { hospital.licenseId = 'DefaultLicense123'; updated = true; }
    if (!hospital.address) { hospital.address = 'Default Address'; updated = true; }
    if (!hospital.contact) { hospital.contact = '9999999999'; updated = true; }
    if (updated) {
      await hospital.save();
      console.log(`Updated hospital: ${hospital._id}`);
    }
  }
  mongoose.disconnect();
  console.log('Hospital details update complete.');
}

updateHospitals();
