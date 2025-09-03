import User from '../models/User.js';
import Hospital from '../models/Hospital.js';
import Organization from '../models/Organization.js';
import Donor from '../models/Donor.js';

// Dashboard summary
export const getDashboardSummary = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const totalHospitals = await Hospital.countDocuments();
    const totalOrganizations = await Organization.countDocuments();
    const totalDonations = await Donor.aggregate([
      { $unwind: '$status' },
      { $match: { 'status.status': 'Donated' } },
      { $count: 'donations' }
    ]);
    res.json({
      totalDonors,
      totalHospitals,
      totalOrganizations,
      totalDonations: totalDonations[0]?.donations || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approvals (pending hospital/org)
export const getPendingApprovals = async (req, res) => {
  try {
    // Find all pending hospital and organization users
    const pendingUsers = await User.find({ category: { $in: ['Hospital', 'Organization'] }, status: 'PENDING' });
    // For each user, populate their hospital/org details and flatten the result
    const results = await Promise.all(pendingUsers.map(async (user) => {
      let details = {};
      if (user.category === 'Hospital') {
        const h = await Hospital.findOne({ user: user._id });
        if (h) {
          details = {
            name: h.name,
            licenseId: h.licenseId,
            address: h.address,
            contact: h.contact,
            status: h.status
          };
        }
      } else if (user.category === 'Organization') {
        const o = await Organization.findOne({ user: user._id });
        if (o) {
          details = {
            name: o.name,
            address: o.address,
            contact: o.contact,
            status: o.status
          };
        }
      }
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        category: user.category,
        ...details
      };
    }));
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = 'APPROVED';
    await user.save();
    // Also update Hospital/Organization status if applicable
    if (user.category === 'Hospital') {
      await Hospital.findOneAndUpdate({ user: user._id }, { status: 'APPROVED' });
    } else if (user.category === 'Organization') {
      await Organization.findOneAndUpdate({ user: user._id }, { status: 'APPROVED' });
    }
    res.json({ message: 'User approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.status = 'REJECTED';
    await user.save();
    if (user.category === 'Hospital') {
      await Hospital.findOneAndUpdate({ user: user._id }, { status: 'REJECTED' });
    } else if (user.category === 'Organization') {
      await Organization.findOneAndUpdate({ user: user._id }, { status: 'REJECTED' });
    }
    res.json({ message: 'User rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Analytics
export const getAnalytics = async (req, res) => {
  try {
    // Example: donors by blood group
    const bloodGroups = await Donor.aggregate([
      { $group: { _id: '$bloodType', count: { $sum: 1 } } }
    ]);
    // Example: most requested organ
    const organs = await Donor.aggregate([
      { $unwind: '$organsPledged' },
      { $group: { _id: '$organsPledged', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    res.json({ bloodGroups, mostRequestedOrgan: organs[0]?._id || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reports/Issues (stub)
export const getReports = async (req, res) => {
  try {
    // This would fetch complaints/issues
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User suspended and deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// All users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
