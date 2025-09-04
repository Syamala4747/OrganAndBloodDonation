import React, { useEffect, useState } from 'react';
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';
import './HospitalLivingDonors.css';

const HospitalLivingDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchDonors() {
      setLoading(true);
      setError('');
      try {
  const res = await fetch('/api/organ-donation/living-donors');
        if (!res.ok) throw new Error('Failed to fetch donors');
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        setError('Could not load living donors.');
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
      <HospitalSidebar active="living-donors" />
      <div className="dashboard-main">
        <div className="dashboard-content">
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginBottom:'0', // even less space
            gap:'0.3rem', // even less gap
            flexWrap:'wrap',
            rowGap:'0', // no vertical gap when wrapping
          }}>
            <h1 className="living-donors-title">Living Donors</h1>
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
              <span style={{color:'#2563eb',fontSize:'1.35rem',marginRight:'0.7rem',display:'flex',alignItems:'center'}}>
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                type="text"
                className="donor-search-bar"
                placeholder="Search donors (name, blood, organ, location...)"
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
                onFocus={e=>e.target.parentNode.style.boxShadow='0 4px 16px rgba(37,99,235,0.13)'}
                onBlur={e=>e.target.parentNode.style.boxShadow='0 2px 8px rgba(30,41,59,0.07)'}
              />
            </div>
          </div>
          {error && <div className="living-donors-error">{error}</div>}
          {loading ? (
            <div className="living-donors-loading">Loading...</div>
          ) : (
            <div className="living-donors-cards-list">
              {filteredDonors.length === 0 ? (
                <div className="living-donors-empty">No living donors found.</div>
              ) : (
                filteredDonors.map((donor, idx) => (
                  <div className="living-donor-card" key={donor._id || idx}>
                    <div className="living-donor-card-header">
                      <span className="living-donor-avatar">�‍⚕️</span>
                      <span className="living-donor-name">{donor.name}</span>
                    </div>
                    <div className="living-donor-info">
                      <div><b>Age:</b> {donor.age}</div>
                      <div><b>Blood Type:</b> <span className="blood-type">{donor.bloodGroup}</span></div>
                      <div><b>Location:</b> {donor.location}</div>
                      <div><b>Organs Pledged:</b> {Array.isArray(donor.organs) ? donor.organs.map(org => <span key={org} className="organ-tag">{org}</span>) : donor.organs}</div>
                      <div><b>Phone:</b> {donor.phone}</div>
                      <div><b>Email:</b> {donor.email}</div>
                    </div>
                    {/* Organ selection and request button */}
                    {Array.isArray(donor.organs) && donor.organs.length > 0 ? (
                      <div style={{marginTop:'0.7rem'}}>
                        <select style={{marginRight:'0.7rem',padding:'0.4rem',borderRadius:'0.7rem',border:'1px solid #e5e7eb'}} id={`organ-select-${donor._id || idx}`}>
                          <option value="">Select organ</option>
                          {donor.organs.map(org => <option key={org} value={org}>{org}</option>)}
                        </select>
                        <button
                          style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:'1rem',padding:'0.6rem 1.2rem',fontWeight:'bold',cursor:'pointer'}}
                          onClick={async () => {
                            const organ = document.getElementById(`organ-select-${donor._id || idx}`).value;
                            if (!organ) return alert('Please select an organ to request.');
                            try {
                              const token = localStorage.getItem('token');
                              const res = await fetch('/api/hospital/request-donation', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                                },
                                body: JSON.stringify({ donorId: donor._id, organ })
                              });
                              if (res.ok) {
                                alert(`Request sent for ${organ} from donor: ${donor.name}`);
                              } else {
                                alert('Failed to send request.');
                              }
                            } catch (err) {
                              alert('Failed to send request.');
                            }
                          }}
                        >Request</button>
                      </div>
                    ) : (
                      <button style={{marginTop:'0.7rem',background:'#2563eb',color:'#fff',border:'none',borderRadius:'1rem',padding:'0.6rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} disabled>No organs available</button>
                    )}
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

export default HospitalLivingDonors;
