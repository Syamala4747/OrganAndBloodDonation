import React, { useEffect, useState } from 'react';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';
import './OrgStatus.css';

const OrgStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Replace with actual endpoint for organization status
        const res = await fetch('/api/organization/status');
        if (!res.ok) throw new Error('Failed to fetch status');
        const data = await res.json();
        setStatus(data);
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
      <OrganizationSidebar active="status" />
      <div className="dashboard-main" style={{width: '100%', maxWidth: 'none', flex: 1, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <div className="dashboard-content" style={{width: '100%', maxWidth: 'none', marginLeft:0}}>
          <h2>Status</h2>
          {loading ? (
            <div>Loading...</div>
          ) : status && status.isRegistered ? (
            <div style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', margin:'1.2rem 0', color:'#ea580c', fontWeight:'500', fontSize:'1.08rem', textAlign:'left', width:'100%', maxWidth:'500px'}}>
              <div><strong>Organization Registered</strong></div>
              <div>Name: {status.name}</div>
              <div>Email: {status.email}</div>
              <div>Phone: {status.phone}</div>
              <div>City: {status.city}</div>
              <div>Status: {status.status}</div>
            </div>
          ) : (
            <div style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', margin:'1.2rem 0', color:'#ea580c', fontWeight:'500', fontSize:'1.08rem', textAlign:'center', width:'100%'}}>
              You have not registered your organization yet.<br />
              <span style={{color:'#ea580c'}}>Register to help save lives!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgStatus;
