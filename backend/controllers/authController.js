import nodemailer from 'nodemailer';
// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a simple reset token (for demo, use a random string)
    const resetToken = Math.random().toString(36).substring(2, 15);
    // Save token to user (in production, save to DB)
    user.resetToken = resetToken;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yourgmail@gmail.com', // replace with your email
        pass: 'yourapppassword' // replace with your app password
      }
    });

    const mailOptions = {
      from: 'yourgmail@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Hello,\n\nTo reset your password, use this code: ${resetToken}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import User from '../models/User.js';
import Donor from '../models/Donor.js';
import Hospital from '../models/Hospital.js';
import Organization from '../models/Organization.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Donor signup
export const donorSignup = async (req, res) => {
  try {
    const { username, email, password, category } = req.body;
    const userExists = await User.findOne({ $or: [ { email }, { username } ] });
  if (userExists) return res.status(409).json({ message: 'You have already registered as a donor with this email or username.' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, category });
    // Create Donor document with only username and email
    await Donor.create({
      user: user._id,
      name: username,
      email: email
    });
    const token = generateToken(user._id, user.category);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if ((user.category === 'Hospital' || user.category === 'Organization') && user.status !== 'APPROVED') {
      return res.status(403).json({ message: 'Account not approved by admin yet.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id, user.category);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hospital/Organization signup (pending approval)
export const requestSignup = async (req, res) => {
  try {
    const { category } = req.body;
    // File upload: req.file (multer)
    let proofPath = '';
    if (req.file) {
      proofPath = req.file.path;
    }
    if (category === 'Hospital') {
      // Hospital signup
      const { hospitalName, registrationNumber, email, password, address, contactNumber } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username: hospitalName, email, password: hashedPassword, category: 'Hospital', status: 'PENDING' });
      const hospital = await Hospital.create({
        user: user._id,
        name: hospitalName,
        licenseId: registrationNumber,
        address,
        contact: contactNumber,
        status: 'PENDING',
        verificationDocs: proofPath ? [proofPath] : []
      });
      return res.status(201).json({ user, hospital });
    } else if (category === 'Organization') {
      // Organization signup
      const { orgName, orgType, email, password, address, contactNumber } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username: orgName, email, password: hashedPassword, category: 'Organization', status: 'PENDING' });
      const organization = await Organization.create({
        user: user._id,
        name: orgName + (orgType ? ` (${orgType})` : ''),
        address,
        contact: contactNumber,
        status: 'PENDING',
        verificationDocs: proofPath ? [proofPath] : []
      });
      return res.status(201).json({ user, organization });
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
