
import React, { useEffect, useState } from 'react';
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';
import './HospitalNotifications.css';

const HospitalNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      setError('');
      try {
        const hospitalId = window.user?.hospitalId || localStorage.getItem('hospitalId');
        if (!hospitalId) {
          setError('Hospital ID not found.');
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/hospital-notifications/${hospitalId}`);
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        setError('Could not load notifications.');
      }
      setLoading(false);
    }
    fetchNotifications();
  }, []);

  return (
    <div className="dashboard-container" style={{ width: '100vw', minHeight: '100vh', display: 'flex' }}>
      <div style={{position:'fixed', left:0, top:0, height:'100vh', width:'260px', zIndex:10}}>
        <HospitalSidebar active="notifications" />
      </div>
      <div className="dashboard-main" style={{marginLeft:'260px', width: 'calc(100vw - 260px)', maxWidth: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <div className="dashboard-content" style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px #e0e7ef', padding:'1.2rem', margin:'1.2rem 0', maxWidth:'600px', width:'100%'}}>
          <h2 style={{color:'#2563eb', fontWeight:'bold', fontSize:'1.5rem', marginBottom:'1rem'}}>Notifications</h2>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <div className="notifications-list" style={{display:'flex',flexDirection:'column',gap:'0.7rem'}}>
            {loading ? (
              <div>Loading...</div>
            ) : notifications.length > 0 ? (
              notifications.map((note, idx) => (
                <div key={note._id || idx} className="notification-card" style={{background:'#eaf6fb',borderRadius:'0.7rem',padding:'0.7rem 1rem',boxShadow:'0 1px 4px #e0e7ef',display:'flex',alignItems:'center',gap:'1rem'}}>
                  <span className="notification-bell" style={{fontSize:'1.3rem',color:'#2563eb'}}>🔔</span>
                  <div style={{flex:1}}>
                    <div className="notification-message" style={{fontWeight:'500',fontSize:'1.08rem',color:'#222'}}>{note.message}</div>
                    <div className="notification-time" style={{fontSize:'0.97rem',color:'#2563eb'}}>{new Date(note.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{color:'#2563eb'}}>No notifications found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalNotifications;
