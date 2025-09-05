
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
      <HospitalSidebar active="notifications" />
      <div className="dashboard-main" style={{ width: '100%', maxWidth: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <div className="dashboard-content" style={{ width: '100%', maxWidth: 'none', marginLeft: 0 }}>
          <h2>Notifications</h2>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <div className="notifications-list">
            {loading ? (
              <div>Loading...</div>
            ) : notifications.length > 0 ? (
              notifications.map((note, idx) => (
                <div key={note._id || idx} className="notification-card">
                  <span className="notification-bell">🔔</span>
                  <div>
                    <div className="notification-message">{note.message}</div>
                    <div className="notification-time">{new Date(note.createdAt).toLocaleString()}</div>
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
