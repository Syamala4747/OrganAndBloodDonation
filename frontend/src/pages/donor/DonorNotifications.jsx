import React from 'react';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import Navbar from '../../components/Navbar';
import './DonorNotifications.css';

const notifications = [
  { message: 'New donation request from XYZ Hospital', time: '2 min ago' },
  { message: 'Your blood donation was verified', time: '1 day ago' },
];

const DonorNotifications = () => (
  <>
    <Navbar />
    <div className="dashboard-container" style={{ width: '100vw', minHeight: '100vh', display: 'flex' }}>
      <DonorSidebar active="notifications" />
      <div className="dashboard-main" style={{ width: '100%', maxWidth: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <div className="dashboard-content" style={{ width: '100%', maxWidth: 'none', marginLeft: 0 }}>
          <h2>Notifications</h2>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((note, idx) => (
                <div key={idx} className="notification-card">
                  <span className="notification-bell">🔔</span>
                  <div>
                    <div className="notification-message">{note.message}</div>
                    <div className="notification-time">{note.time}</div>
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

export default DonorNotifications;
