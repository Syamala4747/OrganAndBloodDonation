import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const DonorSidebar = ({ active }) => {
  const navigate = useNavigate();
  return (
    <aside className="sidebar donor-sidebar">
      <div className="sidebar-logo">❤️ Organ Donation</div>
      <nav>
        <ul>
          <li className={active === 'home' ? 'active' : ''} onClick={()=>navigate('/donor')} style={{cursor:'pointer'}}><span>🏠</span> Home</li>
          <li className={active === 'status' ? 'active' : ''} onClick={()=>navigate('/donor/status')} style={{cursor:'pointer'}}><span>📊</span> Status</li>
          <li className={active === 'notifications' ? 'active' : ''} onClick={()=>navigate('/donor/notifications')} style={{cursor:'pointer'}}><span>🔔</span> Notifications</li>
          <li className={active === 'profile' ? 'active' : ''} onClick={()=>navigate('/donor/profile')} style={{cursor:'pointer'}}><span>👤</span> Profile</li>
          <li className={active === 'support' ? 'active' : ''} onClick={()=>navigate('/donor/support')} style={{cursor:'pointer'}}><span>📩</span> Contact & Support</li>
          <li onClick={()=>navigate('/signup')} style={{cursor:'pointer'}}><span>⏏️</span> Logout</li>
        </ul>
      </nav>
    </aside>
  );
};

export default DonorSidebar;
