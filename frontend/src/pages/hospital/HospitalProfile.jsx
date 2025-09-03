import React from 'react';
import './HospitalProfile.css';

const hospital = {
  name: 'XYZ Hospital',
  licenseId: 'HOSP12345',
  address: '123 Main St, India',
  contact: '+91 9876543210',
};

const HospitalProfile = () => (
  <div className="profile-card-container">
    <h2>Hospital Profile</h2>
    <div className="profile-card">
      <div className="profile-photo hospital">🏥</div>
      <div className="profile-details">
        <div><strong>Name:</strong> {hospital.name}</div>
        <div><strong>License ID:</strong> {hospital.licenseId}</div>
        <div><strong>Address:</strong> {hospital.address}</div>
        <div><strong>Contact:</strong> {hospital.contact}</div>
        <button className="edit-btn">Edit</button>
        <button className="upload-btn">Upload Verification Documents</button>
      </div>
    </div>
  </div>
);

export default HospitalProfile;
