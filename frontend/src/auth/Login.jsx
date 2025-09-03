import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

const Login = () => {
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
    }
  `;
  const location = useLocation();
  const [tab, setTab] = useState('login');
  // Show Register tab if navigation state or query indicates 'Become Donor'
  useEffect(() => {
    if (location.state?.becomeDonor || location.search.includes('becomeDonor')) {
      setTab('register');
    }
  }, [location]);
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const navigate = useNavigate();

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const user = res.data.user;
      const token = res.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      // Redirect based on user role
      if (user.category === 'Donor') {
        navigate('/donor');
      } else if (user.category === 'Hospital') {
        navigate('/hospital');
      } else if (user.category === 'Organization') {
        navigate('/organization');
      } else if (user.category === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Forgot password handler
  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotSuccess('');
    setError('');
    try {
      await axios.post('/api/auth/forgot-password', { email: forgotEmail });
      setForgotSuccess('Password reset link sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="mobile-auth-bg" style={{display:'flex', minHeight:'100vh', background:'#f6fcfd', boxSizing:'border-box', padding:'0', alignItems:'center', justifyContent:'center'}}>
      <style>{mobileStyles}</style>
      {/* Left Side: Login/Register Form - occupies half the page */}
      <div className="mobile-auth-left" style={{flex:'1', minWidth:'50vw', maxWidth:'50vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'#f6fcfd', padding:'3rem 0', minHeight:'100vh'}}>
        <div className="mobile-auth-card" style={{width:'100%', maxWidth:'340px', marginBottom:'1.2rem'}}>
          <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.3rem'}}>
            <span style={{color:'#ef4444', fontSize:'2.2rem', fontWeight:'bold'}}>❤</span>
            <span className="mobile-auth-title" style={{fontWeight:'bold', fontSize:'2rem', color:'#0f172a', letterSpacing:'1px'}}>LifeShare</span>
          </div>
          <div style={{fontSize:'1rem', color:'#334155', marginBottom:'1rem'}}>Join our life-saving community</div>
          <div style={{background:'#fff', borderRadius:'1rem', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', padding:'1.2rem 1rem', width:'100%', margin:'0 auto'}}>
            <h2 style={{fontWeight:'bold', fontSize:'1.3rem', marginBottom:'0.3rem', color:'#222'}}>Welcome Back</h2>
            <div style={{color:'#555', fontSize:'0.95rem', marginBottom:'1rem'}}>Sign in to your account</div>
            {error && <div style={{color:'red', marginBottom:'0.7rem', fontSize:'0.95rem'}}>{error}</div>}
            <form className="mobile-auth-form" onSubmit={handleLogin}>
              <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Email</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.8rem', boxSizing:'border-box'}} />
              <label className="mobile-auth-label" style={{fontWeight:'500', fontSize:'0.85rem', marginBottom:'0.45rem', display:'block'}}>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', padding:'0.8rem 1.2rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'0.5rem', boxSizing:'border-box'}} />
              <div style={{textAlign:'right', marginBottom:'0.7rem'}}>
                <button type="button" style={{background:'none', border:'none', color:'#2563eb', fontSize:'0.95rem', textDecoration:'underline', fontWeight:'500', cursor:'pointer'}} onClick={()=>setShowForgot(true)}>Forgot Password?</button>
              </div>
              {showForgot && (
                <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.15)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
                  <div style={{background:'#fff', borderRadius:'1rem', boxShadow:'0 2px 12px rgba(0,0,0,0.12)', padding:'2rem 2.5rem', minWidth:'320px', maxWidth:'90vw', textAlign:'center'}}>
                    <h3 style={{fontWeight:'bold', fontSize:'1.2rem', marginBottom:'1rem'}}>Forgot Password</h3>
                    <form onSubmit={handleForgot}>
                      <input type="email" placeholder="Enter your email" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} required style={{width:'100%', padding:'0.7rem 1rem', borderRadius:'1.2rem', border:'1px solid #e5e7eb', background:'#f3f4f6', fontSize:'1rem', marginBottom:'1rem'}} />
                      <button type="submit" style={{width:'100%', background:'#22a6f5', color:'#fff', fontWeight:'bold', fontSize:'1rem', border:'none', borderRadius:'1.2rem', padding:'0.7rem 0', cursor:'pointer', marginBottom:'0.7rem'}}>Send Reset Link</button>
                    </form>
                    {forgotSuccess && <div style={{color:'green', marginBottom:'0.7rem'}}>{forgotSuccess}</div>}
                    {error && <div style={{color:'red', marginBottom:'0.7rem'}}>{error}</div>}
                    <button type="button" style={{background:'#e5e7eb', border:'none', borderRadius:'1.2rem', padding:'0.5rem 1.2rem', fontWeight:'bold', cursor:'pointer'}} onClick={()=>setShowForgot(false)}>Close</button>
                  </div>
                </div>
              )}
              <button className="mobile-auth-btn" type="submit" style={{width:'100%', background:'#22a6f5', color:'#fff', fontWeight:'bold', fontSize:'1rem', border:'none', borderRadius:'1.2rem', padding:'0.7rem 0', cursor:'pointer'}}>Sign In</button>
            </form>
            <div style={{marginTop:'1.2rem', textAlign:'center'}}>
              New user?{' '}
              <span style={{color:'#2563eb', cursor:'pointer', textDecoration:'underline', fontWeight:'bold'}} onClick={()=>navigate('/signup')}>
              Signup
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
export default Login;