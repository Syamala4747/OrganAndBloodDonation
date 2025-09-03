import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const OrganizationSidebar = ({ active }) => (
  <aside className="sidebar organization-sidebar">
    <div className="sidebar-logo">🏢 Organization Panel</div>
    <nav>
      <ul>
        <li className={active === 'home' ? 'active' : ''}><span>🏠</span> Home</li>
        <li className={active === 'after-death-donors' ? 'active' : ''}>
          <Link to="/organization/after-death-donors" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span>⚰️</span> After-Death Donors
          </Link>
        </li>
        <li className={active === 'notifications' ? 'active' : ''}><span>🔔</span> Notifications</li>
        <li className={active === 'contact' ? 'active' : ''}><span>📩</span> Contact</li>
        <li><span>⏏️</span> Logout</li>
      </ul>
    </nav>
  </aside>
);

export default OrganizationSidebar;
