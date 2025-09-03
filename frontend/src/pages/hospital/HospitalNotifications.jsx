import React from 'react';
import './HospitalNotifications.css';

const notifications = [
  { message: 'Donor accepted your request', time: '5 min ago' },
  { message: 'Donor declined your request', time: '2 days ago' },
];

const HospitalNotifications = () => (
  <div className="notifications-container">
    <h2>Notifications</h2>
    <div className="notifications-list">
      {notifications.map((note, idx) => (
        <div key={idx} className="notification-card">
          <span className="notification-bell">🔔</span>
          <div>
            <div className="notification-message">{note.message}</div>
            <div className="notification-time">{note.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HospitalNotifications;
