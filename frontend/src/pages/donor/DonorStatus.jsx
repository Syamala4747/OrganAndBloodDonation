import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import './DonorStatus.css';

const DonorStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/api/donor/status');
        setStatus(res.data);
      } catch (err) {
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="dashboard-container" style={{width:'100vw', minHeight:'100vh', display:'flex'}}>
      <DonorSidebar active="status" />
      <div className="dashboard-main" style={{width: '100%', maxWidth: 'none', flex: 1, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <div className="dashboard-content" style={{width: '100%', maxWidth: 'none', marginLeft:0}}>
          <h2>Status</h2>
          {loading ? (
            <div>Loading...</div>
          ) : status && status.isRegistered ? (
            <div style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', margin:'1.2rem 0', color:'#2563eb', fontWeight:'500', fontSize:'1.08rem', textAlign:'left', width:'100%', maxWidth:'500px'}}>
              <div><strong>Organ Donation Registered</strong></div>
              <div>Name: {status.name}</div>
              <div>Email: {status.email}</div>
              <div>Phone: {status.phone}</div>
              <div>Blood Group: {status.bloodGroup}</div>
              <div>City: {status.city}</div>
              <div>Organs Donated: {status.organs && status.organs.join(', ')}</div>
              <div>Status: {status.status}</div>
            </div>
          ) : (
            <div style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', margin:'1.2rem 0', color:'#2563eb', fontWeight:'500', fontSize:'1.08rem', textAlign:'center', width:'100%'}}>
              You have not registered for organ donation yet.<br />
              <span style={{color:'#22c55e'}}>Save lives by registering as a donor!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorStatus;
