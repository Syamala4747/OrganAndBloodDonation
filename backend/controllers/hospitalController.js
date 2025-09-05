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
    const { donorId, organ } = req.body;
  console.log('RequestDonation received donorId:', donorId);
  const allDonors = await Donor.find({});
  console.log('All donors:', allDonors);
  const donor = await Donor.findById(donorId);
    if (!donor || !donor.email) {
      console.log('Donor not found or donor email missing for donorId:', donorId);
      return res.status(404).json({ message: 'Donor not found or donor email missing' });
    }
    donor.status.push({ type: organ, date: new Date(), status: 'Requested', requestedBy: req.user.username });
    await donor.save();
    // Get hospital details
    const hospitalDetails = await Hospital.findOne({ user: req.user._id });
    let hospitalInfo = '';
    if (hospitalDetails) {
      hospitalInfo = `\nHospital Details:\n- Name: ${hospitalDetails.name || req.user.username}\n- Phone: ${hospitalDetails.contact || 'N/A'}\n- Email: ${hospitalDetails.email || 'N/A'}\n- City: ${hospitalDetails.city || hospitalDetails.location || 'N/A'}`;
    } else {
      hospitalInfo = `\nHospital Username: ${req.user.username}`;
    }
    // Create notification for donor
    const DonorNotification = (await import('../models/DonorNotification.js')).default;
    await DonorNotification.create({
      donor: donor._id,
      message: `Dear Donor,\n\nYou have received a new organ donation request for '${organ}' from the hospital below.${hospitalInfo}\n\nPlease review the request and respond by accepting or rejecting. Thank you for your support!`,
      hospital: req.user.username,
      organ,
      actionRequired: true // flag for frontend to show accept/reject
    });
    res.json({ message: 'Donation requested and donor notified.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Donor accepts/rejects donation request
export const respondDonationRequest = async (req, res) => {
  try {
    const { notificationId, response } = req.body; // response: 'accepted' or 'rejected'
    const DonorNotification = (await import('../models/DonorNotification.js')).default;
    const notification = await DonorNotification.findById(notificationId);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    notification.isRead = true;
    notification.actionRequired = false;
    notification.response = response;
    await notification.save();

    // Notify hospital
    // You may want a HospitalNotification model, but for now, send a donor notification with hospital as recipient
    await DonorNotification.create({
      donor: null, // not for donor
      hospital: notification.hospital,
      organ: notification.organ,
      message: `Donor has ${response} your request for ${notification.organ} donation.`,
      isRead: false,
      response
    });
    res.json({ message: `Request ${response} and hospital notified.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


