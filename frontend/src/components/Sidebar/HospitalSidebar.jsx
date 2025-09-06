
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const HospitalSidebar = ({ active }) => (
  <aside className="sidebar hospital-sidebar">
    <div className="sidebar-logo">🏥 Hospital Panel</div>
    <nav>
      <ul>
        <li className={active === 'home' ? 'active' : ''}>
          <Link to="/hospital/home" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>🏠</span> Home
          </Link>
        </li>
        <li className={active === 'living-donors' ? 'active' : ''}>
          <Link to="/hospital/living-donors" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>🫀</span> Living Donors
          </Link>
        </li>
  {/* Requests Status page link removed as per user request */}
        <li className={active === 'notifications' ? 'active' : ''}>
          <Link to="/hospital/notifications" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>🔔</span> Notifications
          </Link>
        </li>
        <li className={active === 'profile' ? 'active' : ''}>
          <Link to="/hospital/profile" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>🏥</span> Hospital Profile
          </Link>
        </li>
        <li className={active === 'support' ? 'active' : ''}>
          <Link to="/hospital/support" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>📩</span> Contact & Support
          </Link>
        </li>
        <li>
            <Link to="/hospital/logout" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>⏏️</span> Logout
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default HospitalSidebar;
