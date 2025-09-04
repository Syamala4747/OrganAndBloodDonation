import React, { useEffect, useState } from 'react';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import Navbar from '../../components/Navbar';
import './DonorNotifications.css';

// Fetch notifications from backend
const DonorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      setError('');
      try {
        // Get donorId from localStorage or window.user
        const donorId = window.user?.donorId || localStorage.getItem('donorId');
        if (!donorId) {
          setError('Donor ID not found.');
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/donor-notifications/${donorId}`);
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
    <>
      <Navbar />
      <div className="dashboard-container" style={{ width: '100vw', minHeight: '100vh', display: 'flex' }}>
        <DonorSidebar active="notifications" />
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
                <div
                  style={{
                    background: '#f3f4f6',
                    borderRadius: '1.2rem',
                    padding: '1.2rem',
                    margin: '1.2rem 0',
                    color: '#2563eb',
                    fontWeight: '500',
                    fontSize: '1.08rem',
                    textAlign: 'center',
                  }}
                >
                  No notifications yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorNotifications;
