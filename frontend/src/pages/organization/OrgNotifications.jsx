import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrgNotifications.css';

const OrgNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        // Replace with actual endpoint if available
        const res = await axios.get('/api/organization/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(res.data);
      } catch (err) {
        setError('Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <ul className="notifications-list">
          {notifications.map((note, idx) => (
            <li key={idx} className="notification-item">
              <div className="notification-message">{note.message}</div>
              <div className="notification-date">{note.date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrgNotifications;
