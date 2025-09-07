import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};


const adminOnly = (req, res, next) => {
  if (req.user && req.user.category === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

const protectDonor = [protect, (req, res, next) => {
  if (req.user && req.user.category === 'Donor') {
    next();
  } else {
    res.status(403).json({ message: 'Donor access required' });
  }
}];

const protectHospital = [protect, (req, res, next) => {
  if (req.user && req.user.category === 'Hospital') {
    next();
  } else {
    res.status(403).json({ message: 'Hospital access required' });
  }
}];

export { protect, adminOnly, protectDonor, protectHospital };
