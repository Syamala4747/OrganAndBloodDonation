import React, { useEffect, useState } from 'react';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import Navbar from '../../components/Navbar';
import './DonorNotifications.css';

// Fetch notifications from backend
const DonorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [latestMessage, setLatestMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unread, setUnread] = useState(false);
  const [popupShownIds, setPopupShownIds] = useState([]);
  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      setError('');
      try {
        const donorId = '68bb1aefdeb017d443a3de78';
        const res = await fetch(`/api/donor-notifications/${donorId}`);
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        // Find unread notifications
        const unreadNotes = data.filter(n => n.isRead === false);
        setUnread(unreadNotes.length > 0);
        // Show popup only once per notification
        if (unreadNotes.length > 0) {
          const newUnread = unreadNotes.filter(n => !popupShownIds.includes(n._id));
          if (newUnread.length > 0) {
            setLatestMessage(newUnread[0].message);
            setShowPopup(true);
            setPopupShownIds([...popupShownIds, newUnread[0]._id]);
            setTimeout(() => setShowPopup(false), 4000);
          }
        }
        setNotifications(data);
      } catch (err) {
        setError('Could not load notifications.');
      }
      setLoading(false);
    }
    fetchNotifications();
    // Optionally poll for new notifications every 30s
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [notifications.length]);


  // Mark all notifications as read when opening notification list
  const markAllAsRead = async () => {
    const unreadNotes = notifications.filter(n => n.isRead === false);
    for (const note of unreadNotes) {
      await fetch(`/api/donor-notifications/${note._id}/read`, { method: 'PUT' });
    }
    setUnread(false);
  };

  return (
    <>
      <Navbar />
      {showPopup && (
        <div style={{position:'fixed',top:'2rem',right:'2rem',background:'#2563eb',color:'#fff',padding:'1rem 2rem',borderRadius:'1rem',boxShadow:'0 2px 8px rgba(0,0,0,0.12)',zIndex:1000,fontWeight:'600',fontSize:'1.1rem'}}>
          <span style={{marginRight:'0.7rem'}}>🔔</span> {latestMessage}
        </div>
      )}
      <div className="dashboard-container" style={{ width: '100vw', minHeight: '100vh', display: 'flex' }}>
        <DonorSidebar active="notifications" />
        <div className="dashboard-main" style={{ width: '100%', maxWidth: 'none', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <div className="dashboard-content" style={{ width: '100%', maxWidth: 'none', marginLeft: 0 }}>
            <h2>
              Notifications{' '}
              {unread && <span style={{background:'#ef4444',color:'#fff',borderRadius:'50%',padding:'0.3em 0.6em',fontSize:'0.9em',marginLeft:'0.5em'}}>●</span>}
            </h2>
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
                      {note.actionRequired && (
                        <div style={{marginTop:'0.7rem'}}>
                          <button style={{background:'#22c55e',color:'#fff',border:'none',borderRadius:'0.7rem',padding:'0.4rem 1rem',fontWeight:'bold',marginRight:'0.7rem',cursor:'pointer'}} onClick={async()=>{
                            await fetch('/api/hospital/respond-donation', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ notificationId: note._id, response: 'accepted' })
                            });
                            alert('Accepted! Hospital will be notified.');
                            markAllAsRead();
                          }}>Accept</button>
                          <button style={{background:'#ef4444',color:'#fff',border:'none',borderRadius:'0.7rem',padding:'0.4rem 1rem',fontWeight:'bold',cursor:'pointer'}} onClick={async()=>{
                            await fetch('/api/hospital/respond-donation', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ notificationId: note._id, response: 'rejected' })
                            });
                            alert('Rejected! Hospital will be notified.');
                            markAllAsRead();
                          }}>Reject</button>
                        </div>
                      )}
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
