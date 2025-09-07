import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const DonorSidebar = ({ active }) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch unread notification count from backend
    async function fetchUnread() {
      const donorId = '68bb1aefdeb017d443a3de78';
      try {
        const res = await fetch(`/api/donor-notifications/${donorId}`);
        if (!res.ok) return;
        const data = await res.json();
        const unread = data.filter(n => n.isRead === false);
        setUnreadCount(unread.length);
      } catch {}
    }
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  // When notifications page is opened, clear badge
  useEffect(() => {
    if (active === 'notifications') {
      setUnreadCount(0);
    }
  }, [active]);

  return (
    <>
      <aside className="sidebar donor-sidebar">
        <div className="sidebar-logo">❤️ Organ Donation</div>
        <nav>
          <ul>
            <li className={active === 'home' ? 'active' : ''} onClick={()=>navigate('/donor')} style={{cursor:'pointer'}}><span>🏠</span> Home</li>
            <li className={active === 'status' ? 'active' : ''} onClick={()=>navigate('/donor/status')} style={{cursor:'pointer'}}><span>📊</span> Status</li>
            <li className={active === 'notifications' ? 'active' : ''} onClick={()=>navigate('/donor/notifications')} style={{cursor:'pointer',position:'relative'}}>
              <span>🔔</span> Notifications
              {unreadCount > 0 && (
                <span style={{position:'absolute',right:'-10px',top:'-8px',background:'#ef4444',color:'#fff',borderRadius:'50%',padding:'0.2em 0.6em',fontSize:'0.95em',fontWeight:'bold'}}>{unreadCount}</span>
              )}
            </li>
            <li className={active === 'support' ? 'active' : ''} onClick={()=>navigate('/donor/support')} style={{cursor:'pointer'}}><span>📩</span> Contact & Support</li>
            <li onClick={()=>navigate('/signup')} style={{cursor:'pointer'}}><span>⏏️</span> Logout</li>
          </ul>
        </nav>
      </aside>
      {/* Mobile Navbar */}
      <nav className="donor-mobile-navbar">
        <div className="donor-mobile-navbar-header">
          <span style={{fontWeight:'bold', fontSize:'1.2rem', color:'#fff'}}>❤️ Organ Donation</span>
          <button className="donor-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span style={{fontSize:'1.7rem', color:'#fff'}}>&#9776;</span>
          </button>
        </div>
        {mobileMenuOpen && (
          <ul className="donor-mobile-menu">
            <li className={active === 'home' ? 'active' : ''} onClick={()=>{setMobileMenuOpen(false);navigate('/donor')}}><span>🏠</span> Home</li>
            <li className={active === 'status' ? 'active' : ''} onClick={()=>{setMobileMenuOpen(false);navigate('/donor/status')}}><span>📊</span> Status</li>
            <li className={active === 'notifications' ? 'active' : ''} onClick={()=>{setMobileMenuOpen(false);navigate('/donor/notifications')}} style={{position:'relative'}}>
              <span>🔔</span> Notifications
              {unreadCount > 0 && (
                <span style={{position:'absolute',right:'-10px',top:'-8px',background:'#ef4444',color:'#fff',borderRadius:'50%',padding:'0.2em 0.6em',fontSize:'0.95em',fontWeight:'bold'}}>{unreadCount}</span>
              )}
            </li>
            <li className={active === 'support' ? 'active' : ''} onClick={()=>{setMobileMenuOpen(false);navigate('/donor/support')}}><span>📧</span> Contact & Support</li>
            <li onClick={()=>{setMobileMenuOpen(false);navigate('/signup')}}><span>⏏️</span> Logout</li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default DonorSidebar;
