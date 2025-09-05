import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const OrganizationSidebar = ({ active }) => (
  <aside className="sidebar organization-sidebar">
    <div className="sidebar-logo">🏢 Organization Panel</div>
    <nav>
      <ul>
        <li className={active === 'home' ? 'active' : ''}>
          <Link to="/organization/home" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>🏠</span> Home
          </Link>
        </li>
        <li className={active === 'after-death-donors' ? 'active' : ''}>
          <Link to="/organization/after-death-donors" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>⚰️</span> After-Death Donors
          </Link>
        </li>
        <li className={active === 'notifications' ? 'active' : ''}>
          <Link to="/organization/notifications" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>🔔</span> Notifications
          </Link>
        </li>
        <li className={active === 'contact' ? 'active' : ''}>
          <Link to="/organization/contact" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>📩</span> Contact
          </Link>
        </li>
        <li>
            <Link to="/organization/logout" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>⏏️</span> Logout
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default OrganizationSidebar;
