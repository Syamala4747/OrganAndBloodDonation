import Donor from '../models/Donor.js';
import User from '../models/User.js';

// Get donor profile
export const getDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id }).populate('user', '-password');
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update donor profile
export const updateDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    Object.assign(donor, req.body);
    await donor.save();
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get donor status table
export const getDonorStatus = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor.status);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add donor support query
export const addSupportQuery = async (req, res) => {
  try {
    // Here you would send an email or save the query
    res.json({ message: 'Support query sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
