import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const HospitalSidebar = ({ active }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
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
      {/* Mobile Navbar */}
      <nav className="hospital-mobile-navbar">
        <div className="hospital-mobile-navbar-header">
          <span style={{fontWeight:'bold', fontSize:'1.2rem', color:'#fff'}}>🏥 Hospital Panel</span>
          <button className="hospital-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span style={{fontSize:'1.7rem', color:'#fff'}}>&#9776;</span>
          </button>
        </div>
        {mobileMenuOpen && (
          <ul className="hospital-mobile-menu">
            <li className={active === 'home' ? 'active' : ''}><Link to="/hospital/home" onClick={()=>setMobileMenuOpen(false)}><span>🏠</span> Home</Link></li>
            <li className={active === 'living-donors' ? 'active' : ''}><Link to="/hospital/living-donors" onClick={()=>setMobileMenuOpen(false)}><span>🫀</span> Living Donors</Link></li>
            <li className={active === 'notifications' ? 'active' : ''}><Link to="/hospital/notifications" onClick={()=>setMobileMenuOpen(false)}><span>🔔</span> Notifications</Link></li>
            <li className={active === 'profile' ? 'active' : ''}><Link to="/hospital/profile" onClick={()=>setMobileMenuOpen(false)}><span>🏥</span> Hospital Profile</Link></li>
            <li className={active === 'support' ? 'active' : ''}><Link to="/hospital/support" onClick={()=>setMobileMenuOpen(false)}><span>📩</span> Contact & Support</Link></li>
            <li><Link to="/hospital/logout" onClick={()=>setMobileMenuOpen(false)}><span>⏏️</span> Logout</Link></li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default HospitalSidebar;
