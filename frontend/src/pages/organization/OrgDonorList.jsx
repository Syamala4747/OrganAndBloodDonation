import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrgDonorList.css';
import robotImg from '../../assets/robot.png';

const OrgDonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/organization/after-death-donors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonors(res.data);
      } catch (err) {
        setError('Failed to fetch donors');
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  return (
    <div className="dashboard-container" style={{minHeight:'100vh', width:'100vw', background:'#f7faff'}}>
      <OrganizationSidebar active="donor-list" />
      <div className="dashboard-main" style={{width:'calc(100vw - 260px)', marginLeft:'260px', maxWidth:'none', padding:'2rem 0'}}>
        <div className="dashboard-content" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
          <h2 style={{color:'#f97316', fontWeight:'bold', fontSize:'2rem', marginBottom:'2rem'}}>After-Death Pledged Donors</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="org-donor-cards-list">
              {donors.length === 0 ? (
                <div>No donors found.</div>
              ) : (
                donors.map((donor, idx) => (
                  <div className="org-donor-card" key={idx} style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px #e0e7ef', padding:'1.5rem', marginBottom:'1.2rem', maxWidth:'600px', width:'100%', minHeight:'220px', display:'flex', flexDirection:'row', alignItems:'center', gap:'2rem', position:'relative'}}>
                    {/* Donor Image */}
                    <div style={{width:'160px',height:'160px',background:'#f3f4f6',borderRadius:'1rem',boxShadow:'0 1px 4px #e0e7ef',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {donor.photoUrl ? (
                        <img src={donor.photoUrl} alt="Donor Photo" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'1rem'}} />
                      ) : (
                        <img src={robotImg} alt="Donor" style={{width:'100px',height:'100px',borderRadius:'50%',objectFit:'cover'}} />
                      )}
                    </div>
                    {/* Donor Info */}
                    <div style={{flex:1, display:'flex', flexDirection:'column', gap:'0.5rem', justifyContent:'center'}}>
                      <div style={{fontWeight:'bold',fontSize:'1.15rem',color:'#f97316',marginBottom:'0.2rem'}}>{donor.name}</div>
                      <div style={{fontSize:'1rem'}}><b>Age:</b> {donor.age} {donor.location && (<span>&nbsp; <b>City:</b> {donor.location}</span>)}</div>
                      <div style={{fontSize:'1rem'}}><b>Blood Type:</b> <span style={{background:'#1e293b',color:'#fff',borderRadius:'0.5rem',padding:'0.1rem 0.6rem',fontWeight:'bold',fontSize:'1rem',marginLeft:'0.5rem'}}>{donor.bloodType}</span></div>
                      <div style={{fontSize:'1rem'}}><b>Organs Pledged:</b> {
                        donor.organsPledgedAfterDeath?.length > 0
                          ? donor.organsPledgedAfterDeath.map(org => <span key={org} className="org-tag" style={{background:'#fde68a',color:'#b45309',borderRadius:'0.5rem',padding:'0.15rem 0.7rem',marginRight:'0.3rem',fontWeight:'bold',fontSize:'1rem'}}>{org}</span>)
                          : <span style={{color:'#f87171'}}>None</span>
                      }</div>
                      <div style={{fontSize:'1rem'}}><b>Medical Certificate:</b> {donor.medicalCertificate ? (
                        <a href={donor.medicalCertificate} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline'}}>View/Download</a>
                      ) : (
                        <span style={{color:'#f87171'}}>Not uploaded</span>
                      )}
                      </div>
                      {/* Request button removed as per instructions */}
                    </div>
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

export default OrgDonorList;
