import React, { useState } from 'react';
import axios from 'axios';
import './HospitalProfile.css';

const hospital = {
  name: 'XYZ Hospital',
  licenseId: 'HOSP12345',
  address: '123 Main St, India',
  contact: '+91 9876543210',
};

const HospitalProfile = () => {
  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMsg('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMsg('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setUploadMsg('');
    try {
      const formData = new FormData();
      formData.append('proofOfEvidence', file);
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/hospital/upload-proof', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setUploadMsg('File uploaded successfully!');
    } catch (err) {
      setUploadMsg('Upload failed.');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <HospitalSidebar active="profile" />
      <div className="dashboard-main">
        <nav className="dashboard-navbar">
          <input className="dashboard-search" placeholder="Search donors..." />
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile hospital">🏥</div>
          </div>
        </nav>
        <div className="dashboard-content">
          <h2>Hospital Profile</h2>
          <div className="profile-card">
            <div className="profile-photo hospital">🏥</div>
            <div className="profile-details">
              <div><strong>Name:</strong> {hospital.name}</div>
              <div><strong>License ID:</strong> {hospital.licenseId}</div>
              <div><strong>Address:</strong> {hospital.address}</div>
              <div><strong>Contact:</strong> {hospital.contact}</div>
              <button className="edit-btn">Edit</button>
              <input type="file" onChange={handleFileChange} style={{ marginTop: '1rem' }} />
              <button className="upload-btn" onClick={handleUpload} disabled={loading} style={{ marginTop: '0.5rem' }}>
                {loading ? 'Uploading...' : 'Upload Verification Documents'}
              </button>
              {uploadMsg && <div style={{ color: uploadMsg.includes('success') ? 'green' : 'red', marginTop: '0.5rem' }}>{uploadMsg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
