import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import Chatbot from '../../components/Chatbot';
import './DonorHome.css';

const DonorHome = () => {
  // Registration status state
  const [isRegistered, setIsRegistered] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  // Modal state and handlers
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    age: '',
    gender: '',
    bloodType: '',
    email: '',
    city: '',
    photo: '',
    pledge: [],
    phone: '',
    donationType: 'Before Death',
    nomineeName1: '',
    nomineePhone1: '',
    nomineeEmail1: '',
    nomineeName2: '',
    nomineePhone2: '',
    nomineeEmail2: '',
    nomineeName3: '',
    nomineePhone3: '',
    nomineeEmail3: '',
    medicalCertificate: null
  });
  const [status, setStatus] = React.useState('');
  const [showToast, setShowToast] = useState(false);
  const photoInputRef = React.useRef();
  const medicalInputRef = React.useRef();
  const inputStyle = {width:'100%', padding:'0.7rem 1rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'};
  const donationTypeLabel = active => ({flex:1, background:active?'#e0f7fa':'#f3f4f6', borderRadius:'1rem', padding:'0.7rem 1rem', cursor:'pointer', border:active?'2px solid #22c55e':'2px solid transparent'});
  useEffect(() => {
    // Get logged-in user's email from localStorage, context, or window.user
    const userEmail = (window.user && window.user.email) || localStorage.getItem('userEmail');
    async function checkRegistration() {
      try {
        if (!userEmail) {
          setIsRegistered(false);
          setLoadingStatus(false);
          return;
        }
        try {
          const res = await axios.get(`/api/organ-donation/status?email=${encodeURIComponent(userEmail)}`);
          if (res.data && res.data.isRegistered) {
            setIsRegistered(true);
            setShowModal(false); // force close modal if already registered
          } else {
            setIsRegistered(false);
          }
        } catch (err) {
          // If 404, treat as not registered
          if (err.response && err.response.status === 404) {
            setIsRegistered(false);
          } else {
            setIsRegistered(false);
          }
        }
      } catch (err) {
        setIsRegistered(false);
      } finally {
        setLoadingStatus(false);
      }
    }
    checkRegistration();
  }, []);

  function handlePledgeChange(org, checked) {
    setForm(f=>({ ...f, pledge: checked ? [...f.pledge, org] : f.pledge.filter(x=>x!==org) }));
  }
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, photo: file, photoPreview: URL.createObjectURL(file) }));
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key] !== undefined && form[key] !== null) {
          if (key === 'pledge') {
            form[key].forEach((org, idx) => formData.append(`pledge[${idx}]`, org));
          } else if (key === 'medicalCertificate' && form.medicalCertificate) {
            formData.append('medicalCertificate', form.medicalCertificate);
          } else if (key === 'photo' && form.photo) {
            formData.append('photo', form.photo);
          } else if (key === 'location') {
            // skip 'location', do not send
          } else {
            formData.append(key, form[key]);
          }
        }
      }
  const response = await axios.post('/api/organ-donation/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Successfully registered for organ donation. Thank you!');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setStatus('');
      }, 3000);
      setForm({
        name: '',
        age: '',
        gender: '',
        bloodType: '',
        email: '',
        city: '',
        photo: '',
        pledge: [],
        phone: '',
        donationType: 'Before Death',
        nomineeName1: '',
        nomineePhone1: '',
        nomineeName2: '',
        nomineePhone2: '',
        nomineeName3: '',
        nomineePhone3: '',
        medicalCertificate: null
      });
      setShowModal(false);
    } catch (err) {
      let errorMsg = 'Failed to register. Please try again.';
      if (err.response) {
        errorMsg = `Error ${err.response.status}: ${err.response.statusText}`;
        if (err.response.data && typeof err.response.data === 'object') {
          if (err.response.data.error) {
            errorMsg += `\n${err.response.data.error}`;
          } else if (err.response.data.message) {
            errorMsg += `\n${err.response.data.message}`;
          } else {
            errorMsg += `\n${JSON.stringify(err.response.data)}`;
          }
        } else if (typeof err.response.data === 'string') {
          errorMsg += `\n${err.response.data}`;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      setStatus(errorMsg);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setStatus('');
      }, 3500);
    }
  }
  return (
    <div className="dashboard-container">
      <DonorSidebar active="home" />
      <div className="dashboard-main">
        <nav className="dashboard-navbar">
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile">👤</div>
          </div>
        </nav>
        <div className="dashboard-content">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h1 style={{margin:0}}>Welcome, Donor!</h1>
            {loadingStatus ? (
              <button style={{background:'#e5e7eb', color:'#888', fontWeight:'bold', fontSize:'1.1rem', border:'none', borderRadius:'1.2rem', padding:'0.7rem 1.5rem', cursor:'not-allowed'}} disabled>Checking status...</button>
            ) : isRegistered ? (
              <button style={{background:'#e5e7eb', color:'#888', fontWeight:'bold', fontSize:'1.1rem', border:'none', borderRadius:'1.2rem', padding:'0.7rem 1.5rem', cursor:'not-allowed'}} disabled>Already Registered</button>
            ) : (
              <button
                style={{background:'#22a6f5', color:'#fff', fontWeight:'bold', fontSize:'1.1rem', border:'none', borderRadius:'1.2rem', padding:'0.7rem 1.5rem', cursor:'pointer'}}
                onClick={() => setShowModal(true)}
              >Donate Organ</button>
            )}
          </div>
          {isRegistered && !loadingStatus && (
            <div style={{background:'#e0f7fa', color:'#2563eb', fontWeight:'500', borderRadius:'1rem', padding:'1rem', marginBottom:'1.2rem', textAlign:'center'}}>
              Thank you for registering as an organ donor! Your commitment is appreciated and you are already part of our life-saving community.
            </div>
          )}
          {!isRegistered && showModal && (
            <div className="donor-modal-bg" style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.18)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, overflow:'visible'}}>
              <div className="donor-modal-form" style={{background:'#fff', borderRadius:'1.3rem', padding:'1.7rem 2.2rem', minWidth:'320px', maxWidth:'520px', maxHeight:'88vh', overflowY:'auto', boxShadow:'0 3px 16px rgba(0,0,0,0.12)', animation:'fadeIn 0.7s'}}>
                <h2 style={{fontWeight:'bold', fontSize:'1.3rem', marginBottom:'1.2rem', textAlign:'center'}}>Organ Donation Registration</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{display:'flex', gap:'1rem', marginBottom:'1rem'}}>
                    <div style={{flex:1}}>
                      <label style={{fontWeight:'500'}}>Full Name</label>
                      <label htmlFor="donor-name">Full Name</label>
                      <input id="donor-name" type="text" value={form.name || ''} onChange={e=>setForm({...form, name:e.target.value})} required placeholder="Enter your full name" style={inputStyle} />
                    </div>
                    <div style={{width:'90px'}}>
                      <label style={{fontWeight:'500'}}>Age</label>
                      <label htmlFor="donor-age">Age</label>
                      <input id="donor-age" type="number" value={form.age || ''} onChange={e=>setForm({...form, age:e.target.value})} required min={0} max={120} placeholder="0" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={{fontWeight:'500'}}>Phone Number</label>
                    <label htmlFor="donor-phone">Phone</label>
                    <input id="donor-phone" type="tel" value={form.phone || ''} onChange={e=>setForm({...form, phone:e.target.value})} required placeholder="Enter your phone number" style={inputStyle} />
                  </div>
                  <div style={{display:'flex', gap:'1rem', marginBottom:'1rem'}}>
                    <div style={{flex:1}}>
                      <label style={{fontWeight:'500'}}>Gender</label>
                      <label htmlFor="donor-gender">Gender</label>
                      <select id="donor-gender" value={form.gender || ''} onChange={e=>setForm({...form, gender:e.target.value})} required style={inputStyle} aria-label="Gender">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div style={{flex:1}}>
                      <label style={{fontWeight:'500'}}>Blood Type</label>
                      <label htmlFor="donor-bloodType">Blood Type</label>
                      <select id="donor-bloodType" value={form.bloodType || ''} onChange={e=>setForm({...form, bloodType:e.target.value})} required style={inputStyle} aria-label="Blood Type">
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                  <label style={{fontWeight:'500'}}>Email</label>
                  <label htmlFor="donor-email">Email</label>
                  <input id="donor-email" type="email" value={form.email || ''} onChange={e=>setForm({...form, email:e.target.value})} required placeholder="your.email@example.com" style={inputStyle} />
                  <label style={{fontWeight:'500'}}>Location</label>
                  <label htmlFor="donor-city">City</label>
                  <input id="donor-city" type="text" value={form.city || ''} onChange={e=>setForm({...form, city:e.target.value})} required placeholder="Enter your city" style={inputStyle} />
                  <label style={{fontWeight:'500'}}>Profile Photo</label>
                  <div style={{border:'1.5px dashed #cbd5e1', borderRadius:'1.2rem', padding:'1.2rem', textAlign:'center', marginBottom:'1rem', cursor:'pointer'}} onClick={()=>photoInputRef.current.click()}>
                    {form.photoPreview ? <img src={form.photoPreview} alt="Profile" style={{width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover'}} /> : <span style={{color:'#94a3b8', fontSize:'2.2rem'}}>Click to upload photo</span>}
                    <input type="file" accept="image/*" ref={photoInputRef} style={{display:'none'}} onChange={handlePhotoUpload} />
                  </div>
                  <label style={{fontWeight:'500'}}>Medical Certificate (Optional)</label>
                  <div style={{border:'1.5px dashed #cbd5e1', borderRadius:'1.2rem', padding:'1.2rem', textAlign:'center', marginBottom:'1rem', cursor:'pointer'}} onClick={()=>medicalInputRef.current.click()}>
                    {form.medicalCertificate ? <span style={{color:'#22c55e'}}>Uploaded: {form.medicalCertificate.name}</span> : <span style={{color:'#94a3b8'}}>Upload medical certificate (PDF, JPG, PNG)</span>}
                    <input type="file" accept=".pdf,image/*" ref={medicalInputRef} style={{display:'none'}} onChange={e=>setForm({...form, medicalCertificate:e.target.files[0]})} />
                  </div>
                  <label style={{fontWeight:'500'}}>Organ Pledge</label>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.7rem', marginBottom:'1rem'}}>
                    {['Kidney','Heart','Liver','Lungs','Corneas','Pancreas','Blood'].map(org=>(
                      <label key={org} style={{display:'flex', alignItems:'center', gap:'0.5rem', background:'#f3f4f6', borderRadius:'1rem', padding:'0.5rem 1rem', cursor:'pointer'}}>
                        <input type="checkbox" checked={form.pledge.includes(org)} onChange={e=>handlePledgeChange(org,e.target.checked)} /> {org}
                      </label>
                    ))}
                  </div>
                  <label style={{fontWeight:'500'}}>Donation Type</label>
                  <div style={{display:'flex', gap:'1rem', marginBottom:'1rem'}}>
                    <label style={donationTypeLabel(form.donationType==='Before Death')}>
                      <input type="radio" name="donationType" checked={form.donationType==='Before Death'} onChange={()=>setForm({...form, donationType:'Before Death'})} required />
                      <span style={{marginLeft:'0.5rem'}}>Before Death (Living Donation)</span>
                      <div style={{fontSize:'0.95rem', color:'#64748b'}}>Donate organs like kidney, partial liver while alive</div>
                    </label>
                    <label style={donationTypeLabel(form.donationType==='Order Pledge')}>
                      <input type="radio" name="donationType" checked={form.donationType==='Order Pledge'} onChange={()=>setForm({...form, donationType:'Order Pledge'})} required />
                      <span style={{marginLeft:'0.5rem'}}>Order Pledge (Deceased Donation)</span>
                      <div style={{fontSize:'0.95rem', color:'#64748b'}}>Donate all selected organs after death</div>
                    </label>
                    <label style={donationTypeLabel(form.donationType==='Both')}>
                      <input type="radio" name="donationType" checked={form.donationType==='Both'} onChange={()=>setForm({...form, donationType:'Both'})} required />
                      <span style={{marginLeft:'0.5rem'}}>Both</span>
                      <div style={{fontSize:'0.95rem', color:'#64748b'}}>Pledge for both living and deceased donation</div>
                    </label>
                  </div>
                  <div style={{marginBottom:'1rem'}}>
                    <div style={{display:'flex', gap:'1rem', marginBottom:'0.7rem'}}>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 1 Name</label>
                        <input type="text" value={form.nomineeName1 || ''} onChange={e=>setForm({...form, nomineeName1:e.target.value})} required placeholder="Emergency contact name" style={inputStyle} />
                      </div>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 1 Phone</label>
                        <input type="tel" value={form.nomineePhone1 || ''} onChange={e=>setForm({...form, nomineePhone1:e.target.value})} required placeholder="+1 (555) 123-4567" style={inputStyle} />
                      </div>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 1 Email</label>
                        <input type="email" value={form.nomineeEmail1 || ''} onChange={e=>setForm({...form, nomineeEmail1:e.target.value})} required placeholder="nominee1@email.com" style={inputStyle} />
                      </div>
                    </div>
                    <div style={{display:'flex', gap:'1rem', marginBottom:'0.7rem'}}>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 2 Name</label>
                        <input type="text" value={form.nomineeName2 || ''} onChange={e=>setForm({...form, nomineeName2:e.target.value})} required placeholder="Emergency contact name" style={inputStyle} />
                      </div>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 2 Phone</label>
                        <input type="tel" value={form.nomineePhone2 || ''} onChange={e=>setForm({...form, nomineePhone2:e.target.value})} required placeholder="+1 (555) 123-4567" style={inputStyle} />
                      </div>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 2 Email</label>
                        <input type="email" value={form.nomineeEmail2 || ''} onChange={e=>setForm({...form, nomineeEmail2:e.target.value})} required placeholder="nominee2@email.com" style={inputStyle} />
                      </div>
                    </div>
                    <div style={{display:'flex', gap:'1rem', marginBottom:'0.7rem'}}>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 3 Name</label>
                        <input type="text" value={form.nomineeName3 || ''} onChange={e=>setForm({...form, nomineeName3:e.target.value})} required placeholder="Emergency contact name" style={inputStyle} />
                      </div>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 3 Phone</label>
                        <input type="tel" value={form.nomineePhone3 || ''} onChange={e=>setForm({...form, nomineePhone3:e.target.value})} required placeholder="+1 (555) 123-4567" style={inputStyle} />
                      </div>
                      <div style={{flex:1}}>
                        <label style={{fontWeight:'500'}}>Nominee 3 Email</label>
                        <input type="email" value={form.nomineeEmail3 || ''} onChange={e=>setForm({...form, nomineeEmail3:e.target.value})} required placeholder="nominee3@email.com" style={inputStyle} />
                      </div>
                    </div>
                  </div>
                  <button type="submit" style={{width:'100%', background:'#22c55e', color:'#fff', fontWeight:'bold', fontSize:'1.1rem', border:'none', borderRadius:'1.2rem', padding:'0.8rem 0', marginTop:'1.2rem', cursor:'pointer'}}>Submit Registration</button>
                  <button type="button" style={{width:'100%', background:'#e5e7eb', color:'#222', fontWeight:'bold', fontSize:'1rem', border:'none', borderRadius:'1.2rem', padding:'0.7rem 0', marginTop:'0.7rem', cursor:'pointer'}} onClick={()=>setShowModal(false)}>Cancel</button>
                  {status && <div style={{marginTop:'1rem', textAlign:'center', color:'#2563eb', fontWeight:'500'}}>{status}</div>}
                </form>
              </div>
            </div>
          )}
          {showToast && (
            <div style={{position:'fixed',top:'2rem',right:'2rem',background:'#22c55e',color:'#fff',padding:'1rem 2rem',borderRadius:'1rem',boxShadow:'0 2px 8px rgba(0,0,0,0.12)',zIndex:1000,fontWeight:'600',fontSize:'1.1rem'}}>
              Successfully registered for organ donation. Thank you!
            </div>
          )}
          <div className="donor-guide-animated" style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', marginBottom:'1.5rem', animation:'fadeIn 1.2s'}}>
            <h2 style={{fontSize:'1.3rem', fontWeight:'bold', marginBottom:'0.7rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
              <span role="img" aria-label="life">💖</span> Guide to Organ Donation
            </h2>
            <ul style={{fontSize:'1.05rem', color:'#334155', lineHeight:'1.8', marginBottom:'1.2rem'}}>
              <li style={{display:'flex', alignItems:'center', gap:'0.5rem', animation:'fadeInUp 0.7s'}}> <span role="img" aria-label="save">🫀</span> Organ donation is a selfless act that can save up to 8 lives.</li>
              <li style={{display:'flex', alignItems:'center', gap:'0.5rem', animation:'fadeInUp 0.9s'}}> <span role="img" aria-label="register">📝</span> Anyone can register as a donor, regardless of age or medical history.</li>
              <li style={{display:'flex', alignItems:'center', gap:'0.5rem', animation:'fadeInUp 1.1s'}}> <span role="img" aria-label="organs">🫁</span> Organs that can be donated: heart, kidneys, liver, lungs, pancreas, intestines, and tissues.</li>
              <li style={{display:'flex', alignItems:'center', gap:'0.5rem', animation:'fadeInUp 1.3s'}}> <span role="img" aria-label="family">👨‍👩‍👧‍👦</span> Inform your family about your decision to donate and inspire others.</li>
              <li style={{display:'flex', alignItems:'center', gap:'0.5rem', animation:'fadeInUp 1.5s'}}> <span role="img" aria-label="ethics">⚖️</span> All donations are handled ethically and legally by certified professionals.</li>
              <li style={{display:'flex', alignItems:'center', gap:'0.5rem', animation:'fadeInUp 1.7s'}}> <span role="img" aria-label="info">📚</span> Learn more from your local hospital or organ donation organization.</li>
            </ul>
            <div style={{display:'flex', gap:'1.5rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'1.2rem'}}>
              <div style={{background:'#fff', borderRadius:'1rem', boxShadow:'0 2px 8px rgba(34,197,94,0.08)', padding:'1rem 1.5rem', minWidth:'180px', textAlign:'center', animation:'fadeInUp 2s'}}>
                <span style={{fontSize:'2.2rem'}}>🌱</span>
                <div style={{fontWeight:'bold', marginTop:'0.5rem'}}>Give the Gift of Life</div>
                <div style={{fontSize:'0.98rem', color:'#555'}}>One donor can save up to 8 lives and heal many more.</div>
              </div>
              <div style={{background:'#fff', borderRadius:'1rem', boxShadow:'0 2px 8px rgba(37,99,235,0.08)', padding:'1rem 1.5rem', minWidth:'180px', textAlign:'center', animation:'fadeInUp 2.2s'}}>
                <span style={{fontSize:'2.2rem'}}>🤝</span>
                <div style={{fontWeight:'bold', marginTop:'0.5rem'}}>Support & Community</div>
                <div style={{fontSize:'0.98rem', color:'#555'}}>Join a network of donors and advocates making a difference.</div>
              </div>
              <div style={{background:'#fff', borderRadius:'1rem', boxShadow:'0 2px 8px rgba(245,158,66,0.08)', padding:'1rem 1.5rem', minWidth:'180px', textAlign:'center', animation:'fadeInUp 2.4s'}}>
                <span style={{fontSize:'2.2rem'}}>🔬</span>
                <div style={{fontWeight:'bold', marginTop:'0.5rem'}}>Medical Safety</div>
                <div style={{fontSize:'0.98rem', color:'#555'}}>All procedures are safe, ethical, and regulated.</div>
              </div>
            </div>
            <div style={{background:'#e0f7fa', borderRadius:'1rem', padding:'1.2rem', margin:'1.2rem 0', animation:'fadeInUp 2.8s'}}>
              <h3 style={{fontWeight:'bold', fontSize:'1.1rem', color:'#00796b', marginBottom:'0.7rem', display:'flex', alignItems:'center', gap:'0.5rem'}}><span role="img" aria-label="facts">📊</span> Did You Know?</h3>
              <ul style={{fontSize:'1rem', color:'#334155', lineHeight:'1.7', marginBottom:'0.5rem'}}>
                <li style={{animation:'fadeInUp 3s'}}>Every 10 minutes, someone is added to the organ transplant waiting list.</li>
                <li style={{animation:'fadeInUp 3.2s'}}>Over 100,000 people are waiting for a life-saving organ transplant right now.</li>
                <li style={{animation:'fadeInUp 3.4s'}}>Just one organ donor can save up to 8 lives and improve the quality of life for many more.</li>
                <li style={{animation:'fadeInUp 3.6s'}}>You can choose which organs and tissues you want to donate.</li>
                <li style={{animation:'fadeInUp 3.8s'}}>Living donation is possible for kidneys and part of the liver.</li>
              </ul>
              <p style={{color:'#00796b', fontWeight:'500', marginTop:'0.7rem', animation:'fadeInUp 4s'}}>Your decision to donate can change the world for someone in need.</p>
            </div>
            <div style={{background:'#fff8e1', borderRadius:'1rem', padding:'1.2rem', margin:'1.2rem 0', animation:'fadeInUp 4.2s'}}>
              <h3 style={{fontWeight:'bold', fontSize:'1.1rem', color:'#f57c00', marginBottom:'0.7rem', display:'flex', alignItems:'center', gap:'0.5rem'}}><span role="img" aria-label="steps">🪜</span> Steps to Become an Organ Donor</h3>
              <ol style={{fontSize:'1rem', color:'#334155', lineHeight:'1.7', marginBottom:'0.5rem'}}>
                <li style={{animation:'fadeInUp 4.4s'}}>Register online or at your local hospital.</li>
                <li style={{animation:'fadeInUp 4.6s'}}>Inform your family and loved ones about your decision.</li>
                <li style={{animation:'fadeInUp 4.8s'}}>Keep your donor card or registration details accessible.</li>
                <li style={{animation:'fadeInUp 5s'}}>Stay informed about organ donation and encourage others to join.</li>
              </ol>
              <p style={{color:'#f57c00', fontWeight:'500', marginTop:'0.7rem', animation:'fadeInUp 5.2s'}}>Becoming a donor is simple, impactful, and heroic!</p>
            </div>
            <p style={{marginTop:'1rem', color:'#2563eb', fontWeight:'500', fontSize:'1.08rem', animation:'fadeIn 5.4s'}}>Ready to make a difference? <span style={{fontWeight:'bold'}}>Click "Donate Organ"</span> to start your journey and become a hero!</p>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
          </div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default DonorHome;
