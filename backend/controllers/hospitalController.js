// Upload/Update hospital proof of evidence
export const uploadHospitalProof = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ user: req.user._id });
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    if (req.file) {
      hospital.verificationDocs = [req.file.path];
      await hospital.save();
      console.log('Hospital proof updated:', hospital.verificationDocs);
      return res.json({ message: 'Proof uploaded', verificationDocs: hospital.verificationDocs });
    } else {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import Hospital from '../models/Hospital.js';
import Donor from '../models/Donor.js';
import User from '../models/User.js';

// Get hospital profile
export const getHospitalProfile = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ user: req.user._id }).populate('user', '-password');
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update hospital profile
export const updateHospitalProfile = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ user: req.user._id });
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    Object.assign(hospital, req.body);
    await hospital.save();
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search donors
export const searchDonors = async (req, res) => {
  try {
    const { bloodType, organType, location } = req.query;
    const query = {};
    if (bloodType) query.bloodType = bloodType;
    if (organType) query.organsPledged = organType;
    if (location) query.location = location;
    const donors = await Donor.find(query).populate('user', '-password');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Request donation
export const requestDonation = async (req, res) => {
  try {
    const { donorId, type, notes } = req.body;
    const donor = await Donor.findById(donorId);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    donor.status.push({ type, date: new Date(), status: 'Requested', requestedBy: req.user.username, notes });
    await donor.save();
    res.json({ message: 'Donation requested' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get hospital requests status
export const getRequestsStatus = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ user: req.user._id });
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital.requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
