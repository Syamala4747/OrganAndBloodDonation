
import React from 'react';
import './AdminAnalytics.css';

const bloodGroups = [
  { group: 'A+', count: 10 },
  { group: 'B+', count: 5 },
];
const organs = [
  { organ: 'Kidney', count: 7 },
  { organ: 'Heart', count: 3 },
];

const AdminAnalytics = () => (
  <div className="dashboard-content">
    <h1 style={{fontWeight:'bold', fontSize:'2.2rem', marginBottom:'1.2rem'}}>Analytics</h1>
    <div style={{display:'flex', gap:'2rem', flexWrap:'wrap', marginBottom:'2rem'}}>
      <div style={{flex:'1', minWidth:'260px', padding:'2rem 1.2rem', textAlign:'center'}}>
        <div style={{fontWeight:'bold', fontSize:'1.3rem', color:'#2563eb', marginBottom:'0.7rem'}}>Active Donors by Blood Group</div>
        {bloodGroups.map((bg, idx) => (
          <div key={idx} style={{fontSize:'1.1rem', marginBottom:'0.3rem'}}><b>{bg.group}:</b> {bg.count}</div>
        ))}
      </div>
      <div style={{flex:'1', minWidth:'260px', padding:'2rem 1.2rem', textAlign:'center'}}>
        <div style={{fontWeight:'bold', fontSize:'1.3rem', color:'#8b5cf6', marginBottom:'0.7rem'}}>Most Requested Organ</div>
        {organs.map((org, idx) => (
          <div key={idx} style={{fontSize:'1.1rem', marginBottom:'0.3rem'}}><b>{org.organ}:</b> {org.count}</div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminAnalytics;
