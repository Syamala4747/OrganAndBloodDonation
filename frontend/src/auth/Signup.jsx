import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const mobileStyles = `
  @media (max-width: 700px) {
    .mobile-auth-bg { flex-direction: column !important; padding: 0.5rem !important; }
    .mobile-auth-left, .mobile-auth-right { min-width: 100vw !important; max-width: 100vw !important; padding: 1.2rem 0.5rem !important; min-height: unset !important; }
    .mobile-auth-card { max-width: 98vw !important; padding: 1.2rem 0.5rem !important; }
    .mobile-auth-title { font-size: 1.5rem !important; }
    .mobile-auth-btn { font-size: 1rem !important; padding: 0.7rem 1rem !important; }
    .mobile-auth-label { font-size: 0.85rem !important; }
    .mobile-auth-form input, .mobile-auth-form select { font-size: 1rem !important; padding: 0.7rem 1rem !important; }
    .mobile-auth-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
    .mobile-auth-card form > * { margin-bottom: 0.7rem !important; }
  }
`;

const roleOptions = [
  { value: 'Donor', label: 'Donor', icon: '👤' },
  { value: 'Hospital', label: 'Hospital', icon: '🏥' },
  { value: 'Organization', label: 'Organization', icon: '🏢' },
];

const Signup = () => {
  // File upload states
  const [hospitalProof, setHospitalProof] = useState(null);
  const [orgProof, setOrgProof] = useState(null);
  // Common fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Donor');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('Donor');
  const navigate = useNavigate();
  // Donor fields (no extra fields needed)
  // Hospital fields
  const [hospitalName, setHospitalName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalContact, setHospitalContact] = useState('');
  // Organization fields
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgContact, setOrgContact] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    let endpoint = '';
    let dataToSend;
    if (selectedRole === 'Donor') {
      dataToSend = { username, email, password, category: 'Donor' };
      endpoint = '/api/auth/donor-signup';
      await axios.post(endpoint, dataToSend);
    } else if (selectedRole === 'Hospital') {
      const formData = new FormData();
      formData.append('username', hospitalName);
      formData.append('hospitalName', hospitalName);
      formData.append('registrationNumber', registrationNumber);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('address', hospitalAddress);
      formData.append('contactNumber', hospitalContact);
      formData.append('category', 'Hospital');
      if (hospitalProof) formData.append('proofOfEvidence', hospitalProof);
      endpoint = '/api/auth/hospital-signup';
      await axios.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    } else if (selectedRole === 'Organization') {
      const formData = new FormData();
      formData.append('username', orgName);
      formData.append('orgName', orgName);
      formData.append('orgType', orgType);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('address', orgAddress);
      formData.append('contactNumber', orgContact);
      formData.append('category', 'Organization');
      if (orgProof) formData.append('proofOfEvidence', orgProof);
      endpoint = '/api/auth/organization-signup';
      await axios.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    try {
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setCategory(role);
  };

  return (
    <div className="mobile-auth-bg" style={{display:'flex', minHeight:'100vh', background:'#f6fcfd', boxSizing:'border-box', padding:'0', alignItems:'center', justifyContent:'center'}}>
      <style>{mobileStyles}</style>
      <div className="mobile-auth-left" style={{flex:'1', minWidth:'50vw', maxWidth:'50vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'#f6fcfd', padding:'3rem 0', minHeight:'100vh'}}>
        <div className="mobile-auth-card" style={{width:'100%', maxWidth:'340px', marginBottom:'1.2rem'}}>
          <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.3rem'}}>
            <span style={{color:'#ef4444', fontSize:'2.2rem', fontWeight:'bold'}}>❤</span>
            <span className="mobile-auth-title" style={{fontWeight:'bold', fontSize:'2rem', color:'#0f172a', letterSpacing:'1px'}}>LifeShare</span>
          </div>
          <div style={{fontSize:'1rem', color:'#334155', marginBottom:'1rem'}}>Join our life-saving community</div>
          {/* Role selection boxes */}
          <div style={{display:'flex', justifyContent:'space-between', gap:'1rem', marginBottom:'1.5rem'}}>
            {roleOptions.map(opt => (
              <div key={opt.value}
                onClick={() => handleRoleSelect(opt.value)}
                style={{
                  flex:1,
                  cursor:'pointer',
                  background: selectedRole === opt.value ? '#e0f2fe' : '#f3f4f6',
                  border: selectedRole === opt.value ? '2px solid #22a6f5' : '2px solid transparent',
                  borderRadius:'1.2rem',
                  padding:'1.2rem 0.5rem',
                  textAlign:'center',
                  boxShadow: selectedRole === opt.value ? '0 2px 12px rgba(34,197,94,0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
                  color:'#222',
                  fontWeight:'bold',
                  fontSize:'1.1rem',
                  transition:'all 0.2s',
                  outline:'none',
                  userSelect:'none',
                }}
              >
                <span style={{fontSize:'2rem', display:'block', marginBottom:'0.3rem'}}>{opt.icon}</span>
                {opt.label}
              </div>
            ))}
          </div>
          <div style={{background:'#fff', borderRadius:'1rem', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', padding:'1.2rem 1rem', width:'100%', margin:'0 auto'}}>
            <h2 style={{fontWeight:'bold', fontSize:'1.3rem', marginBottom:'0.3rem', color:'#222'}}>Create Account</h2>
            <div style={{color:'#555', fontSize:'0.95rem', marginBottom:'1rem'}}>Join our life-saving community</div>
            {error && <div style={{color:'red', marginBottom:'0.7rem', fontSize:'0.95rem'}}>{error}</div>}
            <form className="mobile-auth-form" onSubmit={handleRegister}>
              {/* Donor Fields */}
              {selectedRole === 'Donor' && (
                <>
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Username</label>
                  <input type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Email</label>
                  <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Password</label>
                  <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                </>
              )}
              {/* Hospital Fields */}
              {selectedRole === 'Hospital' && (
                <>
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Hospital Name</label>
                  <input type="text" placeholder="Enter hospital name" value={hospitalName} onChange={e => setHospitalName(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Registration Number</label>
                  <input type="text" placeholder="Enter registration number" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Email</label>
                  <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Password</label>
                  <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Address</label>
                  <input type="text" placeholder="Enter address" value={hospitalAddress} onChange={e => setHospitalAddress(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Contact Number</label>
                  <input type="text" placeholder="Enter contact number" value={hospitalContact} onChange={e => setHospitalContact(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                    <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Proof of Evidence (PDF/JPG)</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setHospitalProof(e.target.files[0])} style={{width:'100%', marginBottom:'0.8rem'}} />
                </>
              )}
              {/* Organization Fields */}
              {selectedRole === 'Organization' && (
                <>
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Organization Name</label>
                  <input type="text" placeholder="Enter organization name" value={orgName} onChange={e => setOrgName(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Type</label>
                  <input type="text" placeholder="Enter organization type" value={orgType} onChange={e => setOrgType(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Email</label>
                  <input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Password</label>
                  <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Address</label>
                  <input type="text" placeholder="Enter address" value={orgAddress} onChange={e => setOrgAddress(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                  <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Contact Number</label>
                  <input type="text" placeholder="Enter contact number" value={orgContact} onChange={e => setOrgContact(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
                    <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Proof of Evidence (PDF/JPG)</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setOrgProof(e.target.files[0])} style={{width:'100%', marginBottom:'0.8rem'}} />
                </>
              )}
              <button className="mobile-auth-btn" type="submit" style={{width:'100%', background:'#22a6f5', color:'#fff', fontWeight:'bold', fontSize:'1.15rem', border:'none', borderRadius:'2rem', padding:'1rem 0', cursor:'pointer', textAlign:'center'}}>Create Account</button>
            </form>
            <div style={{marginTop:'1.2rem', textAlign:'center'}}>
              Already signed up?{' '}
              <span style={{color:'#2563eb', cursor:'pointer', textDecoration:'underline', fontWeight:'bold'}} onClick={()=>navigate('/login')}>
               Login 
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side: Info & Cards - occupies half the page */}
      <div className="mobile-auth-right" style={{flex:'1', minWidth:'50vw', maxWidth:'50vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'linear-gradient(135deg,#f6fcfd 60%,#eaf6ff 100%)', padding:'3rem 0'}}>
        <div style={{width:'100%', maxWidth:'520px', margin:'0 auto'}}>
          <div style={{fontSize:'1.15rem', color:'#222', marginBottom:'0.5rem', textAlign:'center'}}>Medical professionals</div>
          <h1 style={{fontWeight:'bold', fontSize:'2.3rem', color:'#222', textAlign:'center', marginBottom:'1rem'}}>Make a Difference Today</h1>
          <div style={{color:'#555', fontSize:'1.15rem', marginBottom:'2.2rem', textAlign:'center'}}>Your donation can save lives and bring hope to families in need. Join thousands of heroes making a real impact.</div>
          <div className="mobile-auth-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', justifyContent:'center'}}>
            <div style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(34,197,94,0.08)', padding:'1.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{marginBottom:'0.5rem'}}><circle cx="12" cy="8" r="4" stroke="#22c55e" strokeWidth="2"/><path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#22c55e" strokeWidth="2"/></svg>
              <div style={{fontWeight:'bold', fontSize:'1.15rem', color:'#222'}}>Donor</div>
              <div style={{color:'#555', fontSize:'1rem'}}>Register to donate blood or organs</div>
            </div>
            <div style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(37,99,235,0.08)', padding:'1.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{marginBottom:'0.5rem'}}><rect x="5" y="7" width="14" height="10" rx="2" stroke="#2563eb" strokeWidth="2"/><path d="M9 11h6" stroke="#2563eb" strokeWidth="2"/></svg>
              <div style={{fontWeight:'bold', fontSize:'1.15rem', color:'#222'}}>Hospital</div>
              <div style={{color:'#555', fontSize:'1rem'}}>Search and request donations</div>
            </div>
            <div style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px rgba(245,158,66,0.08)', padding:'1.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{marginBottom:'0.5rem'}}><rect x="4" y="8" width="16" height="8" rx="2" stroke="#f59e42" strokeWidth="2"/><path d="M8 12h8" stroke="#f59e42" strokeWidth="2"/></svg>
              <div style={{fontWeight:'bold', fontSize:'1.15rem', color:'#222'}}>Organization</div>
              <div style={{color:'#555', fontSize:'1rem'}}>Coordinate post-death donations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

