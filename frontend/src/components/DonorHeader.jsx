import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DonorHeader.css';

const donorInfo = {
  name: 'Chintapalli Naga Syamala',
  email: 'syamala@gmail.com',
  phone: '9876543210',
  bloodGroup: 'O+',
  city: 'Hyderabad',
};

const DonorHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="donor-header">
      <div className="donor-header-icons">
        <span className="donor-header-icon" title="Notifications" onClick={() => navigate('/donor/notifications')}>
          <i className="fa fa-bell"></i>
        </span>
        <span className="donor-header-icon" title="Profile" onClick={() => navigate('/donor/profile')}>
          <i className="fa fa-user"></i>
        </span>
      </div>
      <div className="donor-header-info">
        <div><strong>{donorInfo.name}</strong></div>
        <div>Email: {donorInfo.email}</div>
        <div>Phone: {donorInfo.phone}</div>
        <div>Blood Group: {donorInfo.bloodGroup}</div>
        <div>City: {donorInfo.city}</div>
      </div>
    </div>
  );
};

export default DonorHeader;
