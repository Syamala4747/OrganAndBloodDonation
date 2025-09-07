import DonorRequest from '../models/DonorRequest.js';
import Donor from '../models/Donor.js';
import Hospital from '../models/Hospital.js';
// Add your mail utility import here

// Hospital creates a request for a donor
export const createRequest = async (req, res) => {
  try {
    const { donorId, organ } = req.body;
    const hospitalId = req.user._id; // assuming hospital is authenticated
    console.log('Searching for donorId:', donorId);
    let donor = await Donor.findById(donorId);
    let donorEmail = null;
    if (donor) {
      console.log('Found donor in Donor collection:', donorId);
      donorEmail = donor.email;
    }
    if (!donor) {
      // Try OrganDonation collection if not found in Donor
      const OrganDonation = (await import('../models/OrganDonation.js')).default;
      donor = await OrganDonation.findById(donorId);
      if (donor) {
        console.log('Found donor in OrganDonation collection:', donorId);
        donorEmail = donor.email;
      }
      if (!donor) {
        console.log('Donor not found in either collection:', donorId);
        return res.status(404).json({ message: 'Donor not found' });
      }
    }
    const request = await DonorRequest.create({ donor: donorId, hospital: hospitalId, organ, donorEmail });

    // Send notification and email to donor
    // Get hospital details
  const hospitalDoc = await Hospital.findById(hospitalId).populate('user');
  // Always prefer Hospital fields, fallback to User fields, and fetch User directly if missing
  let hospitalName = hospitalDoc?.name;
  let licenseId = hospitalDoc?.licenseId;
  let address = hospitalDoc?.address;
  let contact = hospitalDoc?.contact;
  let hospitalEmail = hospitalDoc?.user?.email;
  // If any field is missing, fetch User directly
  if (!hospitalName || !licenseId || !address || !contact || !hospitalEmail) {
    const User = (await import('../models/User.js')).default;
    const userDoc = await User.findById(hospitalDoc?.user?._id);
    hospitalName = hospitalName || userDoc?.name || userDoc?.username || 'Default Hospital Name';
    licenseId = licenseId || userDoc?.licenseId || 'DefaultLicense123';
    address = address || userDoc?.address || 'Default Address';
    contact = contact || userDoc?.contact || userDoc?.contactNumber || '9999999999';
    hospitalEmail = hospitalEmail || userDoc?.email || 'lifeshare4747@gmail.com';
    console.log('UserDoc fallback:', userDoc);
  }
  // For debugging, log the final values
  console.log('HospitalDoc:', hospitalDoc);
  console.log('Hospital User:', hospitalDoc?.user);
  console.log('Final hospitalName:', hospitalName);
  console.log('Final licenseId:', licenseId);
  console.log('Final address:', address);
  console.log('Final contact:', contact);
  console.log('Final hospitalEmail:', hospitalEmail);
  const hospitalDetails = `Hospital Name: ${hospitalName}\nLicense ID: ${licenseId}\nAddress: ${address}\nContact: ${contact}\nEmail: ${hospitalEmail}`;

    // 1. Create DonorNotification
    const DonorNotification = (await import('../models/DonorNotification.js')).default;
    await DonorNotification.create({
      donor: donorId,
      message: `Dear Donor,\n\nYou have received a new organ donation request for '${organ}'.\n\n${hospitalDetails}\n\nPlease respond by clicking Accept or Ignore in your dashboard notification.`,
      hospital: hospitalId,
      organ,
      isRead: false,
      actionRequired: true
    });

    // 2. Send email to donor
    try {
      const nodemailer = (await import('nodemailer')).default;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });
      // Send simple donor request email (no Accept/Ignore links)
      const mailOptions = {
        from: process.env.GMAIL_USER,
        replyTo: hospitalEmail,
        to: donorEmail,
        subject: `Hospital Organ Donation Request: ${organ}`,
        html: `<div style="font-family:sans-serif;font-size:1rem;color:#222;background:#f9fafb;padding:1.2rem;border-radius:1rem;">
          <h2 style="color:#2563eb;">Organ Donation Request</h2>
          <p>Dear <b>${donor.name}</b>,</p>
          <p>The hospital <b>${hospitalName}</b> has requested you for <b>${organ}</b> donation.</p>
          <pre style="background:#f3f4f6;padding:0.7rem;border-radius:0.7rem;">${hospitalDetails}</pre>
          <p style="color:#555;">If you are willing to donate, please contact the hospital team using the details above.</p>
          <p>Thank you for your generosity!</p>
        </div>`
      };
      console.log('Sending donor request email to:', donorEmail);
      await transporter.sendMail(mailOptions)
        .then(info => console.log('Donor request email sent:', info.response))
        .catch(emailErr => console.error('Failed to send donor request email:', emailErr));
    } catch (emailErr) {
      console.error('Failed to send donor request email:', emailErr);
    }

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Donor fetches their requests/notifications
export const getDonorRequests = async (req, res) => {
  try {
    const donorId = req.user._id; // assuming donor is authenticated
    const requests = await DonorRequest.find({ donor: donorId }).populate('hospital', 'name city');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Donor responds to a request
export const respondToRequest = async (req, res) => {
  try {
    const { requestId, response } = req.body; // response: 'accepted' or 'ignored'
    const donorId = req.user._id;
    const request = await DonorRequest.findOne({ _id: requestId, donor: donorId });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    request.status = response;
    request.response = response;
    request.respondedAt = new Date();
    await request.save();
    // Send notification and email to hospital
    const hospitalDoc = await Hospital.findById(request.hospital).populate('user');
    const hospitalEmail = hospitalDoc?.user?.email || process.env.GMAIL_USER;
    const donorDoc = await Donor.findById(request.donor);
    const donorName = donorDoc?.name || 'Donor';
    const organ = request.organ;
    const responseText = response === 'accepted' ? 'accepted your request' : 'rejected your invitation';

    // Send email to hospital
    try {
      const nodemailer = (await import('nodemailer')).default;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });
      const mailOptions = {
        from: donorDoc?.email || process.env.GMAIL_USER,
        to: hospitalEmail,
        subject: `Donor Response for ${organ} Request`,
        text: `Dear Hospital,\n\n${donorName} has ${responseText} for ${organ} donation.\n\nThank you for using Organ & Blood Donation Portal.`
      };
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Failed to send hospital notification email:', err);
    }

    res.json({ message: 'Response recorded and hospital notified', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hospital fetches responses
export const getHospitalRequests = async (req, res) => {
  try {
    const hospitalId = req.user._id; // assuming hospital is authenticated
    const requests = await DonorRequest.find({ hospital: hospitalId }).populate('donor', 'name age city bloodGroup');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
