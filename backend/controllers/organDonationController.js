// Get all organ donation registrations (admin view)
export async function getAllOrganDonations(req, res) {
  try {
    const allDonations = await OrganDonation.find({});
    res.json(allDonations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Get all living (before_death) donors for hospital dashboard
export async function getLivingDonors(req, res) {
  try {
    // Show donors who chose 'before_death' or 'both'
    const livingDonors = await OrganDonation.find({
      $or: [
        { donationType: 'before_death' },
        { donationType: 'both' }
      ]
    });
    res.json(livingDonors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Photo upload handler
export async function uploadDonorPhoto(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No photo file uploaded.' });
  }
  // Return the file path to be stored in the main registration
  return res.status(201).json({ success: true, photoPath: req.file.path });
}
import User from '../models/User.js';
// Get all users with donor category
export async function getDonorUsers(req, res) {
  try {
    const donors = await User.find({ category: 'Donor' });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all users with organization category
export async function getOrganizationUsers(req, res) {
  try {
    const orgs = await User.find({ category: 'Organization' });
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all users with hospital category
export async function getHospitalUsers(req, res) {
  try {
    const hospitals = await User.find({ category: 'Hospital' });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
import Donor from '../models/Donor.js';
import OrganDonation from '../models/OrganDonation.js';
import path from 'path';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const GMAIL_USER = process.env.GMAIL_USER;

import fs from 'fs';
const allowedExtensions = ['.jpg', '.jpeg', '.pdf'];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .pdf files are allowed!'), false);
  }
}

export const upload = multer({ storage, fileFilter });

export async function registerOrganDonation(req, res) {
    // Setup nodemailer transporter for Gmail using .env credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    try {
      // Log incoming body and files for debugging
      console.log('Register request body:', req.body);
      console.log('Register request files:', req.files);

      const {
        name,
        age,
        gender,
        email,
        city,
        bloodType,
        pledge,
        phone,
        donationType,
        nomineeName1,
        nomineePhone1,
        nomineeEmail1,
        nomineeName2,
        nomineePhone2,
        nomineeEmail2,
        nomineeName3,
        nomineePhone3,
        nomineeEmail3
      } = req.body;
      let medicalCertificate = '';
      let photo = '';
      if (req.files) {
        if (req.files.medicalCertificate && req.files.medicalCertificate[0]) {
          // Save only filename for medical certificate
          medicalCertificate = req.files.medicalCertificate[0].filename || req.files.medicalCertificate[0].path.split('uploads/').pop();
        }
        if (req.files.photo && req.files.photo[0]) {
          // Save only filename for photo
          photo = req.files.photo[0].filename || req.files.photo[0].path.split('uploads/').pop();
          console.log('DEBUG: Saving donor photo filename:', photo);
        }
      }
      let mappedDonationType = 'before_death';
      if (donationType && donationType.toLowerCase() === 'order pledge' || donationType && donationType.toLowerCase() === 'after death') mappedDonationType = 'after_death';
      if (donationType && donationType.toLowerCase() === 'both') mappedDonationType = 'both';

      // Check if donor already registered by email
      const existingDonor = await OrganDonation.findOne({ email });
      if (existingDonor) {
        return res.status(409).json({ success: false, error: 'You have already registered as a donor with this email.' });
      }

      // Log mapped fields for debugging
      console.log('Mapped fields:', {
        name,
        age,
        gender,
        photo,
        email,
        city,
        bloodGroup: bloodType,
        organs: pledge,
        phone,
        donationType: mappedDonationType,
        nominee1: { name: nomineeName1, phone: nomineePhone1, email: nomineeEmail1 },
        nominee2: { name: nomineeName2, phone: nomineePhone2, email: nomineeEmail2 },
        nominee3: { name: nomineeName3, phone: nomineePhone3, email: nomineeEmail3 },
        medicalCertificate
      });

      // Split organs for 'both' type
      let livingOrgans = [];
      let deceasedOrgans = [];
      if (mappedDonationType === 'both' && Array.isArray(pledge)) {
        // Living: Kidney, Partial Liver, Blood
        livingOrgans = pledge.filter(org => ['Kidney','Partial Liver','Blood'].includes(org));
        // Deceased: Heart, Lungs, Pancreas, Corneas, Full Liver, Intestine, Skin, Bone, Heart Valve
        deceasedOrgans = pledge.filter(org => ['Heart','Lungs','Pancreas','Corneas','Full Liver','Intestine','Skin','Bone','Heart Valve'].includes(org));
      }
      // Save main donation record
      const organDonation = new OrganDonation({
        name,
        age: age !== undefined && age !== null && age !== '' ? Number(age) : undefined,
        gender,
        photo,
        email,
        city,
        bloodGroup: bloodType,
        organs: pledge,
        phone,
        donationType: mappedDonationType,
        nominee1: { name: nomineeName1, phone: nomineePhone1, email: nomineeEmail1 },
        nominee2: { name: nomineeName2, phone: nomineePhone2, email: nomineeEmail2 },
        nominee3: { name: nomineeName3, phone: nomineePhone3, email: nomineeEmail3 },
        medicalCertificate,
        status: 'Registered',
        createdAt: new Date()
      });
      await organDonation.save();
      // Route pledges to hospital/organization
      // Get all hospital and organization emails
      const hospitals = await User.find({ category: 'Hospital' });
      const hospitalEmails = hospitals.map(h => h.email);
      const organizations = await User.find({ category: 'Organization' });
      const organizationEmails = organizations.map(o => o.email);

      // Email living organ pledges to hospitals
      if ((mappedDonationType === 'before_death' && pledge.length) || (mappedDonationType === 'both' && livingOrgans.length)) {
        const mailOptions = {
          from: GMAIL_USER,
          to: hospitalEmails,
          subject: 'New Living Organ Donation Pledge',
          text: `Donor: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrgans Pledged (Living): ${(mappedDonationType==='both'?livingOrgans:pledge).join(', ')}\nDonation Type: ${donationType}`
        };
        transporter.sendMail(mailOptions).catch(err => console.error('Hospital email error:', err));
      }
      // Email after-death organ pledges to organizations
      if ((mappedDonationType === 'after_death' && pledge.length) || (mappedDonationType === 'both' && deceasedOrgans.length)) {
        const mailOptions = {
          from: GMAIL_USER,
          to: organizationEmails,
          subject: 'New After-Death Organ Donation Pledge',
          text: `Donor: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrgans Pledged (After Death): ${(mappedDonationType==='both'?deceasedOrgans:pledge).join(', ')}\nDonation Type: ${donationType}`
        };
        transporter.sendMail(mailOptions).catch(err => console.error('Organization email error:', err));
      }
      // Send email to each nominee (optional, does not affect response)
      const nominees = [
        { name: nomineeName1, phone: nomineePhone1, email: nomineeEmail1 },
        { name: nomineeName2, phone: nomineePhone2, email: nomineeEmail2 },
        { name: nomineeName3, phone: nomineePhone3, email: nomineeEmail3 }
      ];
      const nomineeEmailPromises = nominees.filter(nominee => nominee.email).map(nominee => {
        const mailOptions = {
          from: GMAIL_USER,
          to: nominee.email,
          subject: 'Organ Donation Nominee Notification',
          text: `Dear ${nominee.name},\n\nYou have been nominated by ${name} (${email}, Phone: ${phone}) as a responsible contact for their organ donation pledge.\n\nDonor Details:\n- Name: ${name}\n- Age: ${age}\n- Gender: ${gender}\n- City: ${city}\n- Blood Group: ${bloodType}\n- Organs Pledged: ${Array.isArray(pledge) ? pledge.join(', ') : pledge}\n- Donation Type: ${donationType}\n\nYour role as a nominee is to support and help fulfill the donor's wishes. Please keep this information safe and inform the donor's family if needed.\n\nThank you for being part of this life-saving mission!\n\nOrganDonation Team (+91 7207476697)`
        };
        return transporter.sendMail(mailOptions).catch(mailErr => {
          console.error('Failed to send email to nominee:', nominee.email, mailErr);
        });
      });
      Promise.allSettled(nomineeEmailPromises);
      res.status(201).json({ success: true, organDonation });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ success: false, error: err.message, details: err });
    }
}

export async function getOrganDonationStatus(req, res) {
  try {
    const { email } = req.query;
    const organDonation = await OrganDonation.findOne({ email });
    if (!organDonation) {
      return res.status(200).json({ isRegistered: false });
    }
    res.json({ isRegistered: true, ...organDonation._doc });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
