import React from 'react';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import './DonorProfile.css';

const DonorProfile = () => {
  return (
    <div className="dashboard-container" style={{width:'100vw', minHeight:'100vh', display:'flex'}}>
      <DonorSidebar active="profile" />
      <div className="dashboard-main" style={{width: '100%', maxWidth: 'none', flex: 1, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <div className="dashboard-content" style={{width: '100%', maxWidth: 'none', marginLeft:0}}>
          <h2>Profile</h2>
          <div style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', margin:'1.2rem 0', color:'#2563eb', fontWeight:'500', fontSize:'1.08rem', textAlign:'left', width:'100%', maxWidth:'500px'}}>
            <div><strong>Chintapalli Naga Syamala</strong></div>
            <div>Email: syamala@gmail.com</div>
            <div>Phone: 9876543210</div>
            <div>Blood Group: O+</div>
            <div>City: Hyderabad</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
