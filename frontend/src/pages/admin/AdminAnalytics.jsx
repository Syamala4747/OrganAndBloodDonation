
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminAnalytics.css';


const AdminAnalytics = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [mostRequestedOrgan, setMostRequestedOrgan] = useState('');
  const [beforeDeathOrgans, setBeforeDeathOrgans] = useState([]);
  const [afterDeathOrgans, setAfterDeathOrgans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        });
  setBloodGroups(res.data.bloodGroups || []);
  setMostRequestedOrgan(res.data.mostRequestedOrgan || 'None');
  setBeforeDeathOrgans(res.data.beforeDeathOrgans || []);
  setAfterDeathOrgans(res.data.afterDeathOrgans || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load analytics');
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="dashboard-content">
      <h1 style={{fontWeight:'bold', fontSize:'2.2rem', marginBottom:'1.2rem'}}>Analytics</h1>
      {loading ? (
        <div>Loading analytics...</div>
      ) : error ? (
        <div style={{color:'red'}}>{error}</div>
      ) : (
        <div style={{display:'flex', gap:'2rem', flexWrap:'wrap', marginBottom:'2rem'}}>
          <div style={{flex:'1', minWidth:'260px', padding:'2rem 1.2rem', textAlign:'center'}}>
            <div style={{fontWeight:'bold', fontSize:'1.3rem', color:'#2563eb', marginBottom:'0.7rem'}}>Active Donors by Blood Group</div>
            {bloodGroups.length === 0 ? <div>No data</div> : bloodGroups.map((bg, idx) => (
              <div key={idx} style={{fontSize:'1.1rem', marginBottom:'0.3rem'}}><b>{bg._id}:</b> {bg.count}</div>
            ))}
          </div>
          <div style={{flex:'1', minWidth:'260px', padding:'2rem 1.2rem', textAlign:'center'}}>
            <div style={{fontWeight:'bold', fontSize:'1.3rem', color:'#8b5cf6', marginBottom:'0.7rem'}}>Most Requested Organ</div>
            <div style={{fontSize:'1.1rem', marginBottom:'0.3rem'}}><b>{mostRequestedOrgan}</b></div>
          </div>
          {/* Organs before and after death section */}
          <div style={{flex:'1', minWidth:'260px', padding:'2rem 1.2rem', textAlign:'center'}}>
            <div style={{fontWeight:'bold', fontSize:'1.3rem', color:'#ea580c', marginBottom:'0.7rem'}}>Organs Donors Willing to Donate</div>
            <div style={{marginBottom:'0.7rem'}}><b>Before Death:</b></div>
            <ul style={{listStyle:'none', padding:0}}>
              {beforeDeathOrgans.length > 0 ? (
                beforeDeathOrgans.map((org, idx) => (
                  <li key={idx} style={{fontSize:'1.05rem', marginBottom:'0.2rem'}}>{org}</li>
                ))
              ) : <li>No data</li>}
            </ul>
            <div style={{marginBottom:'0.7rem', marginTop:'1rem'}}><b>After Death:</b></div>
            <ul style={{listStyle:'none', padding:0}}>
              {afterDeathOrgans.length > 0 ? (
                afterDeathOrgans.map((org, idx) => (
                  <li key={idx} style={{fontSize:'1.05rem', marginBottom:'0.2rem'}}>{org}</li>
                ))
              ) : <li>No data</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
