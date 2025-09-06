


import React, { useEffect, useState } from 'react';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';
import './OrgNotifications.css';

const OrgProfile = () => {
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/organization/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch organization profile');
        const data = await res.json();
        setOrg(data);
      } catch (err) {
        setError('Could not load organization profile.');
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container" style={{ width: '100vw', minHeight: '100vh', display: 'flex' }}>
      <OrganizationSidebar active="notifications" />
      <div className="dashboard-main" style={{ width: '100%', maxWidth: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '2rem 0' }}>
        <div className="dashboard-content" style={{ width: '100%', maxWidth: '600px', marginLeft: 0, background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px #e0e7ef', padding:'2rem' }}>
          <h2 style={{color:'#f97316', fontWeight:'bold', fontSize:'2rem', marginBottom:'2rem'}}>Organization Profile</h2>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          {loading ? (
            <div>Loading...</div>
          ) : org ? (
            <div style={{fontSize:'1.1rem', color:'#222'}}>
              <div style={{marginBottom:'1.2rem'}}><b>Name:</b> {org.name}</div>
              <div style={{marginBottom:'1.2rem'}}><b>Address:</b> {org.address}</div>
              <div style={{marginBottom:'1.2rem'}}><b>Contact:</b> {org.contact}</div>
              <div style={{marginBottom:'1.2rem'}}><b>Status:</b> <span style={{color: org.status==='APPROVED' ? '#22c55e' : org.status==='REJECTED' ? '#ef4444' : '#f59e42', fontWeight:'bold'}}>{org.status}</span></div>
              <div style={{marginBottom:'1.2rem'}}><b>Created At:</b> {new Date(org.createdAt).toLocaleString()}</div>
              {org.verificationDocs && org.verificationDocs.length > 0 && (
                <div style={{marginBottom:'1.2rem'}}><b>Verification Documents:</b> {org.verificationDocs.map((doc, i) => (
                  <a key={i} href={`http://localhost:5000/uploads/${doc}`} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline',marginRight:'1rem'}}>View/Download</a>
                ))}</div>
              )}
            </div>
          ) : (
            <div>No organization profile found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
