import React, { useEffect, useState } from 'react';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';
import './OrgAfterDeathDonors.css';

const OrgAfterDeathDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchDonors() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/organization/after-death-donors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch donors');
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        setError('Could not load after-death pledged donors.');
      }
      setLoading(false);
    }
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter(donor => {
    const q = search.toLowerCase();
    return (
      donor.name?.toLowerCase().includes(q) ||
      donor.bloodGroup?.toLowerCase().includes(q) ||
      donor.location?.toLowerCase().includes(q) ||
      donor.phone?.toLowerCase().includes(q) ||
      donor.email?.toLowerCase().includes(q) ||
      (Array.isArray(donor.organs) && donor.organs.join(' ').toLowerCase().includes(q))
    );
  });
  return (
    <div className="dashboard-container">
      <OrganizationSidebar active="after-death-donors" />
      <div className="dashboard-main">
        <div className="dashboard-content">
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginBottom:'0.3rem', // reduced space
            gap:'0.7rem', // reduced gap
            flexWrap:'wrap',
            rowGap:'0.2rem', // minimize vertical gap when wrapping
          }}>
            <h1 className="after-death-donors-title">After-Death Pledged Donors</h1>
            <div style={{
              background:'#f1f5f9',
              borderRadius:'1.5rem',
              boxShadow:'0 2px 8px rgba(30,41,59,0.07)',
              padding:'0.3rem 1.1rem 0.3rem 0.7rem',
              minWidth:'320px',
              flex:'0 1 370px',
              display:'flex',
              alignItems:'center',
              border:'1.5px solid #e0e7ef',
              transition:'box-shadow 0.18s, border 0.18s',
            }}>
              <span style={{color:'#f97316',fontSize:'1.35rem',marginRight:'0.7rem',display:'flex',alignItems:'center'}}>
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                type="text"
                className="donor-search-bar"
                placeholder="Search donors"
                value={search}
                onChange={e=>setSearch(e.target.value)}
                style={{
                  width:'100%',
                  padding:'0.7rem 0.7rem',
                  border:'none',
                  borderRadius:'1.2rem',
                  fontSize:'1.13rem',
                  background:'transparent',
                  outline:'none',
                  color:'#222',
                  boxShadow:'none',
                }}
                onFocus={e=>e.target.parentNode.style.boxShadow='0 4px 16px rgba(249,115,22,0.13)'}
                onBlur={e=>e.target.parentNode.style.boxShadow='0 2px 8px rgba(30,41,59,0.07)'}
              />
            </div>
          </div>
          {error && <div className="after-death-donors-error">{error}</div>}
          {loading ? (
            <div className="after-death-donors-loading">Loading...</div>
          ) : (
            <div className="after-death-donors-cards-list">
              {filteredDonors.length === 0 ? (
                <div className="after-death-donors-empty">No after-death pledged donors found.</div>
              ) : (
                filteredDonors.map((donor, idx) => (
                  <div className="after-death-donor-card" key={donor._id || idx}>
                    <div className="after-death-donor-card-header">
                      <span className="after-death-donor-avatar">⚰️</span>
                      <span className="after-death-donor-name">{donor.name}</span>
                      {donor.donationType === 'both' && (
                        <span className="donor-type-badge" style={{marginLeft:'0.7rem',background:'#fde68a',color:'#b45309',borderRadius:'0.5rem',padding:'0.1rem 0.6rem',fontSize:'0.95rem'}}>Both</span>
                      )}
                    </div>
                    <div className="after-death-donor-info">
                      <div><b>Age:</b> {donor.age}</div>
                      <div><b>Blood Type:</b> <span className="blood-type">{donor.bloodGroup || donor.bloodType}</span></div>
                      <div><b>Location:</b> {donor.location}</div>
                      <div><b>Organs Pledged:</b> {Array.isArray(donor.organs) ? donor.organs.map(org => <span key={org} className="organ-tag">{org}</span>) : donor.organs}</div>
                      <div><b>Phone:</b> {donor.phone}</div>
                      <div><b>Email:</b> {donor.email}</div>
                    </div>
                      <button style={{marginTop:'0.7rem',background:'#22c55e',color:'#fff',border:'none',borderRadius:'1rem',padding:'0.6rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>alert(`Request sent for donor: ${donor.name}`)}>Request</button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgAfterDeathDonors;
