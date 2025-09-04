import React, { useState } from 'react';
import axios from 'axios';
import './OrgProfile.css';

const organization = {
  name: 'ABC Org',
  type: 'eye',
  address: '456 Main St, India',
  contact: '+91 9123456789',
};

const OrgProfile = () => {
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
      // Add other required fields if needed
      const res = await axios.post('/api/organization/upload-proof', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadMsg('File uploaded successfully!');
    } catch (err) {
      setUploadMsg('Upload failed.');
    }
    setLoading(false);
  };

  return (
    <div className="profile-card-container">
      <h2>Organization Profile</h2>
      <div className="profile-card">
        <div className="profile-photo organization">🏢</div>
        <div className="profile-details">
          <div><strong>Name:</strong> {organization.name}</div>
          <div><strong>Type:</strong> {organization.type}</div>
          <div><strong>Address:</strong> {organization.address}</div>
          <div><strong>Contact:</strong> {organization.contact}</div>
          <input type="file" onChange={handleFileChange} style={{ marginTop: '1rem' }} />
          <button className="upload-btn" onClick={handleUpload} disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Uploading...' : 'Upload Verification Documents'}
          </button>
          {uploadMsg && <div style={{ color: uploadMsg.includes('success') ? 'green' : 'red', marginTop: '0.5rem' }}>{uploadMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
