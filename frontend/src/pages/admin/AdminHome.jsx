

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import AdminApprovals from './AdminApprovals';
import AdminAnalytics from './AdminAnalytics';
import AdminUsers from './AdminUsers';
import './AdminHome.css';


const AdminHome = () => {
  const navigate = useNavigate();
  // Determine active sidebar item based on current path
  const path = window.location.pathname;
  let active = 'home';
  if (path.includes('/admin/approvals')) active = 'approvals';
  else if (path.includes('/admin/analytics')) active = 'analytics';
  else if (path.includes('/admin/users')) active = 'users';

  return (
    <div className="dashboard-container">
  <AdminSidebar active={active} onLogout={() => { localStorage.removeItem('token'); navigate('/signup'); }} />
  <div className="dashboard-main">
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={
              <>
                <h1 style={{fontWeight:'bold', fontSize:'2.2rem', marginBottom:'1.2rem'}}>Admin Dashboard</h1>
                <div style={{display:'flex', gap:'2rem', flexWrap:'wrap', marginBottom:'2rem'}}>
                  <div style={{flex:'1', minWidth:'220px', background:'#f0fff4', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(34,197,94,0.08)', padding:'2rem 1.2rem', textAlign:'center'}}>
                    <div style={{fontSize:'2.2rem', color:'#22c55e', marginBottom:'0.5rem'}}>👤</div>
                    <div style={{fontWeight:'bold', fontSize:'1.5rem'}}>Total Donors</div>
                    <div style={{fontSize:'1.2rem', color:'#222'}}>View and manage all registered donors</div>
                  </div>
                  <div style={{flex:'1', minWidth:'220px', background:'#f0f6ff', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(37,99,235,0.08)', padding:'2rem 1.2rem', textAlign:'center'}}>
                    <div style={{fontSize:'2.2rem', color:'#2563eb', marginBottom:'0.5rem'}}>🏥</div>
                    <div style={{fontWeight:'bold', fontSize:'1.5rem'}}>Total Hospitals</div>
                    <div style={{fontSize:'1.2rem', color:'#222'}}>View and approve hospital requests</div>
                  </div>
                  <div style={{flex:'1', minWidth:'220px', background:'#f9f7ff', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(139,92,246,0.08)', padding:'2rem 1.2rem', textAlign:'center'}}>
                    <div style={{fontSize:'2.2rem', color:'#8b5cf6', marginBottom:'0.5rem'}}>🏢</div>
                    <div style={{fontWeight:'bold', fontSize:'1.5rem'}}>Total Organizations</div>
                    <div style={{fontSize:'1.2rem', color:'#222'}}>View and approve organization requests</div>
                  </div>
                  <div style={{flex:'1', minWidth:'220px', background:'#fff5f5', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(239,68,68,0.08)', padding:'2rem 1.2rem', textAlign:'center'}}>
                    <div style={{fontSize:'2.2rem', color:'#ef4444', marginBottom:'0.5rem'}}>📊</div>
                    <div style={{fontWeight:'bold', fontSize:'1.5rem'}}>Analytics</div>
                  </div>
                </div>
                <div style={{marginTop:'2rem', textAlign:'center', color:'#334155', fontSize:'1.15rem'}}>
                  Welcome, Admin! Use the sidebar to manage users, approvals, analytics, and more.
                </div>
              </>
            } />
            <Route path="approvals" element={<AdminApprovals />} />
            <Route path="users" element={<AdminUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
