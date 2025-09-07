import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = ({ active, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-logo">🛡️ Admin Panel</div>
        <nav>
          <ul>
            <li className={active === 'home' ? 'active' : ''} style={{color:'#fff', fontWeight:'bold'}}><Link to="/admin/" style={{color:'#fff'}}>🏠 Dashboard Home</Link></li>
            <li className={active === 'approvals' ? 'active' : ''} style={{color:'#fff', fontWeight:'bold'}}><Link to="/admin/approvals" style={{color:'#fff'}}>✅ Approvals</Link></li>
            <li className={active === 'users' ? 'active' : ''} style={{color:'#fff', fontWeight:'bold'}}><Link to="/admin/users" style={{color:'#fff'}}>👤 All Users</Link></li>
            <li onClick={onLogout} style={{cursor:'pointer', color:'#fff', fontWeight:'bold'}}><span>⏏️</span> Logout</li>
          </ul>
        </nav>
      </aside>
      {/* Mobile Navbar */}
      <nav className="admin-mobile-navbar">
        <div className="admin-mobile-navbar-header">
          <span style={{fontWeight:'bold', fontSize:'1.2rem', color:'#fff'}}>🛡️ Admin Panel</span>
          <button className="admin-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span style={{fontSize:'1.7rem', color:'#fff'}}>&#9776;</span>
          </button>
        </div>
        {mobileMenuOpen && (
          <ul className="admin-mobile-menu">
            <li className={active === 'home' ? 'active' : ''}><Link to="/admin/" onClick={()=>setMobileMenuOpen(false)}>🏠 Dashboard Home</Link></li>
            <li className={active === 'approvals' ? 'active' : ''}><Link to="/admin/approvals" onClick={()=>setMobileMenuOpen(false)}>✅ Approvals</Link></li>
            <li className={active === 'users' ? 'active' : ''}><Link to="/admin/users" onClick={()=>setMobileMenuOpen(false)}>👤 All Users</Link></li>
            <li onClick={()=>{setMobileMenuOpen(false); onLogout();}} style={{cursor:'pointer'}}><span>⏏️</span> Logout</li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default AdminSidebar;
