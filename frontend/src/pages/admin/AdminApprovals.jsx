import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminApprovals.css';

const AdminApprovals = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPending = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/approvals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPending(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('You must be logged in as admin to view approvals.');
      } else if (err.response && err.response.status === 403) {
        setError('Access denied. Only admins can view approvals.');
      } else {
        setError('Failed to fetch pending approvals');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (userId, action) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/admin/${action}`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPending(pending.filter(item => item._id !== userId));
    } catch (err) {
      setError('Action failed');
    }
  };

  return (
    <div className="dashboard-content">
      <h1 style={{fontWeight:'bold', fontSize:'2.2rem', marginBottom:'1.2rem'}}>Pending Approvals</h1>
      <div style={{padding:'2rem 1.2rem', width:'100%'}}>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : pending.length === 0 ? (
          <div>No pending requests.</div>
        ) : (
          <div className="approvals-list" style={{display:'flex', gap:'2rem', flexWrap:'wrap', marginTop:'2rem'}}>
            {pending.map((item, idx) => (
              <div key={item._id || idx} style={{flex:'1', minWidth:'320px', background:'rgba(240,255,244,0.85)', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(34,197,94,0.08)', padding:'2rem 1.2rem', textAlign:'left'}}>
                <div style={{fontWeight:'bold', fontSize:'1.2rem', color:'#16a34a', marginBottom:'0.7rem'}}>{item.name || item.hospitalName || item.organizationName}</div>
                <div style={{fontSize:'1.05rem', color:'#222', marginBottom:'0.5rem'}}><b>Email:</b> {item.email}</div>
                <div style={{fontSize:'1rem', color:'#334155', marginBottom:'0.5rem'}}><b>Category:</b> {item.category}</div>
                {item.category === 'Hospital' && (
                  <div style={{marginBottom:'0.5rem'}}>
                    <div><b>License/Registration:</b> {item.licenseId || item.registrationNumber}</div>
                    <div><b>Address:</b> {item.address}</div>
                    <div><b>Contact:</b> {item.contact}</div>
                    {item.verificationDocs && item.verificationDocs.length > 0 && (
                      <div><b>Proof of Evidence:</b> {item.verificationDocs.map((doc, i) => (
                        <a key={i} href={`http://localhost:5000/uploads/${doc.replace(/^uploads\//, '')}`} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline',marginRight:'1rem'}}>View/Download</a>
                      ))}</div>
                    )}
                  </div>
                )}
                {item.category === 'Organization' && (
                  <div style={{marginBottom:'0.5rem'}}>
                    <div><b>Type:</b> {item.type || item.orgType}</div>
                    <div><b>Address:</b> {item.address}</div>
                    <div><b>Contact:</b> {item.contact}</div>
                    {item.verificationDocs && item.verificationDocs.length > 0 && (
                      <div><b>Proof of Evidence:</b> {item.verificationDocs.map((doc, i) => (
                        <a key={i} href={`http://localhost:5000/uploads/${doc.replace(/^uploads\//, '')}`} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline',marginRight:'1rem'}}>View/Download</a>
                      ))}</div>
                    )}
                  </div>
                )}
                <div style={{marginTop:'1rem', textAlign:'center'}}>
                  <button className="approve-btn" onClick={()=>handleAction(item._id,'approve')}>Approve</button>
                  <button className="reject-btn" onClick={()=>handleAction(item._id,'reject')}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApprovals;
