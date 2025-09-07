import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const OrganizationSidebar = ({ active }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <aside className="sidebar organization-sidebar">
        <div className="sidebar-logo">🏢 Organization Panel</div>
        <nav>
          <ul>
            <li className={active === 'home' ? 'active' : ''}>
              <Link to="/organization" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <span>🏠</span> Home
              </Link>
            </li>
            <li className={active === 'after-death-donors' ? 'active' : ''}>
              <Link to="/organization/after-death-donors" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <span>⚰️</span> Donors
              </Link>
            </li>
            <li className={active === 'notifications' ? 'active' : ''}>
              <Link to="/organization/notifications" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <span>🔔</span> Profile
              </Link>
            </li>
            <li className={active === 'contact' ? 'active' : ''}>
              <Link to="/organization/contact" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <span>📧</span> Contact
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
      {/* Mobile Navbar */}
      <nav className="organization-mobile-navbar">
        <div className="organization-mobile-navbar-header">
          <span style={{fontWeight:'bold', fontSize:'1.2rem', color:'#fff'}}>🏢 Organization Panel</span>
          <button className="organization-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span style={{fontSize:'1.7rem', color:'#fff'}}>&#9776;</span>
          </button>
        </div>
        {mobileMenuOpen && (
          <ul className="organization-mobile-menu">
            <li className={active === 'home' ? 'active' : ''}><Link to="/organization" onClick={()=>setMobileMenuOpen(false)}><span>🏠</span> Home</Link></li>
            <li className={active === 'after-death-donors' ? 'active' : ''}><Link to="/organization/after-death-donors" onClick={()=>setMobileMenuOpen(false)}><span>⚰️</span> Donors</Link></li>
            <li className={active === 'notifications' ? 'active' : ''}><Link to="/organization/notifications" onClick={()=>setMobileMenuOpen(false)}><span>🔔</span> Profile</Link></li>
            <li className={active === 'contact' ? 'active' : ''}><Link to="/organization/contact" onClick={()=>setMobileMenuOpen(false)}><span>📧</span> Contact</Link></li>
            <li><Link to="/organization/logout" onClick={()=>setMobileMenuOpen(false)}><span>⏏️</span> Logout</Link></li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default OrganizationSidebar;
