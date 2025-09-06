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
    <div className="dashboard-container" style={{minHeight:'100vh', width:'100vw', background:'#f7faff'}}>
      <OrganizationSidebar active="after-death-donors" />
      <div className="dashboard-main" style={{width:'calc(100vw - 260px)', marginLeft:'260px', maxWidth:'none', padding:'2rem 0'}}>
        <div className="dashboard-content" style={{width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
          <h1 className="after-death-donors-title" style={{color:'#f97316', fontWeight:'bold', fontSize:'2rem', marginBottom:'2rem'}}>After-Death Pledged Donors</h1>
          {error && <div className="after-death-donors-error">{error}</div>}
          {loading ? (
            <div className="after-death-donors-loading">Loading...</div>
          ) : (
            <div className="after-death-donors-cards-list" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(600px, 1fr))', gap:'2rem', justifyItems:'center', width:'100%', margin:'0 auto'}}>
              {filteredDonors.length === 0 ? (
                <div className="after-death-donors-empty">No after-death pledged donors found.</div>
              ) : (
                filteredDonors.map((donor, idx) => {
                  // Only show after-death organs
                  const afterDeathOrgans = Array.isArray(donor.organs)
                    ? donor.organs.filter(org => [
                        'Heart','Lungs','Pancreas','Corneas','Full Liver','Intestine','Skin','Bone','Heart Valve'
                      ].includes(org))
                    : [];
                  return (
                    <div className="after-death-donor-card" key={donor._id || idx} style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px #e0e7ef', padding:'1.5rem', marginBottom:'1.2rem', maxWidth:'600px', width:'100%', minHeight:'220px', display:'flex', flexDirection:'row', alignItems:'center', gap:'2rem', position:'relative'}}>
                      {/* Donor Profile Photo */}
                      <div style={{width:'160px',height:'160px',background:'#f3f4f6',borderRadius:'1rem',boxShadow:'0 1px 4px #e0e7ef',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {donor.photo ? (
                          <img src={`http://localhost:5000/uploads/${donor.photo}`} alt="Donor Photo" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'1rem'}} />
                        ) : (
                          <span style={{fontSize:'3rem'}}>⚰️</span>
                        )}
                      </div>
                      {/* Donor Info */}
                      <div style={{flex:1, display:'flex', flexDirection:'column', gap:'0.5rem', justifyContent:'center'}}>
                        <div style={{fontWeight:'bold',fontSize:'1.15rem',color:'#f97316',marginBottom:'0.2rem'}}>{donor.name}</div>
                        <div style={{fontSize:'1rem'}}><b>Age:</b> {donor.age} {donor.location && (<span>&nbsp; <b>City:</b> {donor.location}</span>)}</div>
                        <div style={{fontSize:'1rem'}}><b>Blood Type:</b> <span style={{background:'#1e293b',color:'#fff',borderRadius:'0.5rem',padding:'0.1rem 0.6rem',fontWeight:'bold',fontSize:'1rem',marginLeft:'0.5rem'}}>{donor.bloodGroup || donor.bloodType}</span></div>
                        <div style={{fontSize:'1rem'}}><b>Organs Pledged:</b> {
                          afterDeathOrgans.length > 0
                            ? afterDeathOrgans.map(org => <span key={org} className="organ-tag" style={{background:'#fde68a',color:'#b45309',borderRadius:'0.5rem',padding:'0.15rem 0.7rem',marginRight:'0.3rem',fontWeight:'bold',fontSize:'1rem'}}>{org}</span>)
                            : <span style={{color:'#f87171'}}>None</span>
                        }</div>
                        <div style={{fontSize:'1rem'}}><b>Medical Certificate:</b> {donor.medicalCertificate ? (
                          <a href={`http://localhost:5000/uploads/${donor.medicalCertificate}`} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline'}}>View/Download</a>
                        ) : (
                          <span style={{color:'#f87171'}}>Not uploaded</span>
                        )}
                        </div>
                        <div style={{fontSize:'1rem'}}><b>Phone:</b> {donor.phone}</div>
                        <div style={{fontSize:'1rem'}}><b>Email:</b> {donor.email}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgAfterDeathDonors;
