// Upload donor photo to Cloudinary
export const uploadDonorPhoto = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    donor.photo = req.file.path; // Cloudinary URL
    await donor.save();
    res.json({ photoUrl: donor.photo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
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
    let donor = await Donor.findOne({ user: req.user._id }).populate('user', '-password');
    let isRegistered = false;
    let donorData = {};
    // Try to find by email in OrganDonation collection as well
    const userEmail = donor?.email || req.user?.email;
    const organDonation = await (await import('../models/OrganDonation.js')).default.findOne({ email: userEmail });

    // Merge data from both sources, prioritizing OrganDonation if registered
    if (organDonation) {
      isRegistered = true;
      donorData = {
        name: organDonation.name || donor?.name || req.user?.username || '',
        email: organDonation.email || donor?.email || req.user?.email || '',
        phone: organDonation.phone || donor?.user?.username || donor?.user?.email || req.user?.username || req.user?.email || '',
        bloodGroup: organDonation.bloodGroup || donor?.bloodType || '',
        city: organDonation.city || donor?.location || '',
        organs: organDonation.organs || donor?.organsPledged || [],
        donationType: organDonation.donationType || donor?.donationType || '',
        age: organDonation.age || donor?.age,
        photo: organDonation.photo || donor?.photo,
        medicalCertificate: organDonation.medicalCertificate || donor?.medicalCertificate,
        status: 'Registered',
      };
    } else if (donor && ((donor.organsPledged && donor.organsPledged.length > 0) || !!donor.donationType)) {
      isRegistered = true;
      donorData = {
        name: donor.name,
        email: donor.email,
        phone: donor.user?.username || donor.user?.email || '',
        bloodGroup: donor.bloodType,
        city: donor.location,
        organs: donor.organsPledged,
        donationType: donor.donationType,
        age: donor.age,
        photo: donor.photo,
        medicalCertificate: donor.medicalCertificate,
        status: 'Registered',
      };
    } else {
      donorData = {
        name: donor?.name || req.user?.username || '',
        email: donor?.email || req.user?.email || '',
        phone: donor?.user?.username || donor?.user?.email || req.user?.username || req.user?.email || '',
        bloodGroup: donor?.bloodType || '',
        city: donor?.location || '',
        organs: [],
        donationType: '',
        age: donor?.age,
        photo: donor?.photo,
        medicalCertificate: donor?.medicalCertificate,
        status: 'Not Registered',
      };
    }
    res.json({ isRegistered, ...donorData });
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
