import React, { useState, useEffect } from 'react';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import './DonorProfile.css';


const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/donor/profile', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setDonor(data);
        setPhotoUrl(data.photo || '');
      }
    }
    fetchProfile();
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('photo', file);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/donor/upload-photo', {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      setPhotoUrl(data.photoUrl);
    }
    setUploading(false);
  };

  return (
    <div className="dashboard-container" style={{width:'100vw', minHeight:'100vh', display:'flex'}}>
      <DonorSidebar active="profile" />
      <div className="dashboard-main" style={{width: '100%', maxWidth: 'none', flex: 1, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <div className="dashboard-content" style={{width: '100%', maxWidth: 'none', marginLeft:0}}>
          <h2>Profile</h2>
          <div style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', margin:'1.2rem 0', color:'#2563eb', fontWeight:'500', fontSize:'1.08rem', textAlign:'left', width:'100%', maxWidth:'500px'}}>
            {photoUrl ? (
              <img src={photoUrl} alt="Donor" style={{width:'120px',height:'120px',borderRadius:'50%',objectFit:'cover',marginBottom:'1rem'}} />
            ) : (
              <div style={{width:'120px',height:'120px',borderRadius:'50%',background:'#eaf6fb',color:'#2563eb',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',fontWeight:'bold',marginBottom:'1rem'}}>No Photo</div>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploading} style={{marginBottom:'1rem'}} />
            {uploading && <div style={{color:'#2563eb'}}>Uploading...</div>}
            <div><strong>{donor?.name || 'Name not set'}</strong></div>
            <div>Email: {donor?.email || 'Not set'}</div>
            <div>Phone: {donor?.phone || 'Not set'}</div>
            <div>Blood Group: {donor?.bloodGroup || 'Not set'}</div>
            <div>City: {donor?.city || donor?.location || 'Not set'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
