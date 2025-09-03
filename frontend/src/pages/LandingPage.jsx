import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import heartImg from '../assets/image.png';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <header style={{width:'100%', background:'#fff', borderBottom:'1px solid #f0f6fa', padding:'0.5rem 0', marginBottom:'0', position:'relative', zIndex:2, display:'flex', justifyContent:'center'}}>
        <div style={{width:'100%', maxWidth:'1400px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.5rem 2rem'}}>
          <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
            <span style={{color:'#ef4444', fontSize:'1.7rem', fontWeight:'bold'}}>❤</span>
            <span style={{fontWeight:'bold', fontSize:'1.15rem', color:'#0f172a'}}>LifeShare</span>
          </div>
          <button style={{background:'#2563eb', color:'#fff', border:'none', borderRadius:'1.2rem', padding:'0.5rem 1.5rem', fontWeight:'bold', fontSize:'1rem', boxShadow:'0 2px 8px rgba(37,99,235,0.10)', cursor:'pointer'}} onClick={() => navigate('/signup')}>Get Started</button>
        </div>
      </header>
    <div className="landing-main" style={{minHeight:'100vh', width:'100vw', background:'#f6fcfd', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'3rem 0', boxSizing:'border-box'}}>
        {/* Hero Section and Image Side-by-Side */}
  <div className="landing-hero-row" style={{width:'100%', maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center', gap:'3.5rem', padding:'3.5rem 4rem', background:'#fff', borderRadius:'2rem', boxShadow:'0 8px 32px rgba(34,197,94,0.08)', boxSizing:'border-box'}}>
        <div className="landing-left" style={{flex:'1', maxWidth:'600px'}}>
          <h1 className="landing-title" style={{fontSize:'2.7rem', fontWeight:'bold', marginBottom:'1.2rem'}}>
            Save Lives Through <span className="landing-organ" style={{color:'#22c55e'}}>Organ</span> & <span className="landing-blood" style={{color:'#ef4444'}}>Blood</span> Donation
          </h1>
          <p className="landing-desc" style={{fontSize:'1.15rem', color:'#334155', marginBottom:'2.2rem'}}>
            Join our community of heroes who make the ultimate gift of life possible. Every donation can save up to 8 lives and enhance the lives of countless others.
          </p>
          <div className="landing-buttons" style={{display:'flex', gap:'1.5rem'}}>
            <button className="donor-btn" style={{fontSize:'1.15rem', padding:'1rem 2.2rem', borderRadius:'1.2rem', background:'#22c55e', color:'#fff', fontWeight:'bold', border:'none', boxShadow:'0 4px 16px rgba(34,197,94,0.12)'}} onClick={() => navigate('/signup')}>
              <span className="btn-icon" style={{fontSize:'1.2rem', marginRight:'0.7rem'}}>&#9829;</span> Become a Donor
            </button>
            <button className="learn-btn" style={{fontSize:'1.15rem', padding:'1rem 2.2rem', borderRadius:'1.2rem', background:'#fff', color:'#1e293b', fontWeight:'bold', border:'1.5px solid #e5e7eb', boxShadow:'0 4px 16px rgba(34,197,94,0.08)'}} onClick={() => navigate('/login')}>Learn More</button>
          </div>
        </div>
        <div className="landing-right" style={{flex:'1', display:'flex', justifyContent:'center'}}>
          <div className="image-card" style={{position:'relative', background:'#fff', borderRadius:'1.2rem', boxShadow:'0 8px 32px rgba(34,197,94,0.10)', padding:'1.5rem', width:'fit-content'}}>
            <img src={heartImg} alt="Organ" className="organ-img" style={{width:'420px', height:'320px', objectFit:'cover', borderRadius:'1.2rem'}} />
            <div className="lives-saved-card" style={{position:'absolute', left:'1.2rem', bottom:'-2.2rem', boxShadow:'0 4px 16px rgba(34,197,94,0.12)', background:'#fff', borderRadius:'1rem', padding:'0.7rem 1.2rem', display:'flex', alignItems:'center', gap:'0.7rem'}}>
              <span className="lives-icon" style={{fontSize:'1.5rem', color:'#22c55e'}}>&#128100;</span>
              <span style={{display:'flex', flexDirection:'column'}}>
                <span className="lives-count" style={{fontWeight:'bold', fontSize:'1.15rem', color:'#1e293b'}}>50,000+</span>
                <span className="lives-label" style={{color:'#64748b', fontSize:'0.95rem'}}>Lives Saved</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Donation Matters Section Below Hero */}
  <section className="donation-matters-section" style={{width:'100%', maxWidth:'1200px', margin:'2.5rem auto 0 auto', padding:'2rem 0', background:'#fff', borderRadius:'2rem', boxShadow:'0 8px 32px rgba(34,197,94,0.08)', boxSizing:'border-box'}}>
        <h2 className="donation-matters-title" style={{textAlign:'center', fontSize:'2.2rem', fontWeight:'bold', marginBottom:'1.2rem', color:'black'}}>Why Your Donation Matters</h2>
        <p className="donation-matters-desc" style={{textAlign:'center', fontSize:'1.15rem', color:'#334155', marginBottom:'2.2rem'}}>
          Every day, thousands of people wait for life-saving organ transplants and blood transfusions. Your generous donation can be the miracle they're hoping for.
        </p>
        <div className="donation-matters-cards" style={{display:'flex', gap:'2rem', justifyContent:'center', marginBottom:'2.5rem'}}>
          <div className="donation-card blood" style={{background:'#fff5f5', borderRadius:'1.5rem', boxShadow:'0 4px 16px rgba(239,68,68,0.08)', flex:'1', minWidth:'220px', padding:'2rem 1.2rem', textAlign:'center'}}>
            <div className="donation-card-icon-bg" style={{marginBottom:'1rem'}}>
              <span className="donation-card-icon" style={{color:'#ef4444', fontSize:'2.2rem'}}>&#9825;</span>
            </div>
            <h3 style={{fontWeight:'bold', fontSize:'1.2rem', marginBottom:'0.7rem', color:'#1e293b'}}>Blood Donation</h3>
            <p style={{color:'#334155', marginBottom:'0.7rem'}}>One blood donation can save up to 3 lives. Help patients with cancer, blood disorders, and those undergoing surgery.</p>
            <div className="donation-card-highlight blood" style={{color:'#ef4444', fontWeight:'bold'}}>Every 2 seconds, someone needs blood</div>
          </div>
          <div className="donation-card organ" style={{background:'#f0fff4', borderRadius:'1.5rem', boxShadow:'0 4px 16px rgba(34,197,94,0.08)', flex:'1', minWidth:'220px', padding:'2rem 1.2rem', textAlign:'center'}}>
            <div className="donation-card-icon-bg" style={{marginBottom:'1rem'}}>
              <span className="donation-card-icon" style={{color:'#22c55e', fontSize:'2.2rem'}}>&#9825;</span>
            </div>
            <h3 style={{fontWeight:'bold', fontSize:'1.2rem', marginBottom:'0.7rem', color:'#1e293b'}}>Organ Donation</h3>
            <p style={{color:'#334155', marginBottom:'0.7rem'}}>One organ donor can save 8 lives and enhance the lives of 75 others through tissue and cornea donation.</p>
            <div className="donation-card-highlight organ" style={{color:'#22c55e', fontWeight:'bold'}}>100,000+ people need organs</div>
          </div>
          <div className="donation-card medical" style={{background:'#f0f6ff', borderRadius:'1.5rem', boxShadow:'0 4px 16px rgba(37,99,235,0.08)', flex:'1', minWidth:'220px', padding:'2rem 1.2rem', textAlign:'center'}}>
            <div className="donation-card-icon-bg" style={{marginBottom:'1rem'}}>
              <span className="donation-card-icon" style={{color:'#2563eb', fontSize:'2.2rem'}}>&#128203;</span>
            </div>
            <h3 style={{fontWeight:'bold', fontSize:'1.2rem', marginBottom:'0.7rem', color:'#1e293b'}}>Medical Partnership</h3>
            <p style={{color:'#334155', marginBottom:'0.7rem'}}>We work with hospitals and medical organizations to ensure safe, ethical donation processes.</p>
            <div className="donation-card-highlight medical" style={{color:'#2563eb', fontWeight:'bold'}}>500+ Partner Hospitals</div>
          </div>
          <div className="donation-card volunteer" style={{background:'#f9f7ff', borderRadius:'1.5rem', boxShadow:'0 4px 16px rgba(139,92,246,0.08)', flex:'1', minWidth:'220px', padding:'2rem 1.2rem', textAlign:'center'}}>
            <div className="donation-card-icon-bg" style={{marginBottom:'1rem'}}>
              <span className="donation-card-icon" style={{color:'#8b5cf6', fontSize:'2.2rem'}}>&#128106;</span>
            </div>
            <h3 style={{fontWeight:'bold', fontSize:'1.2rem', marginBottom:'0.7rem', color:'#1e293b'}}>Volunteers</h3>
            <p style={{color:'#334155', marginBottom:'0.7rem'}}>Support our mission by volunteering for awareness drives, events, and donor support programs.</p>
            <div className="donation-card-highlight volunteer" style={{color:'#8b5cf6', fontWeight:'bold'}}>Join 2,000+ Volunteers</div>
          </div>
        </div>
        <div className="donation-matters-cta" style={{display:'flex', justifyContent:'center'}}>
          <button className="donation-cta-btn" style={{fontSize:'1.15rem', padding:'1rem 2.5rem', borderRadius:'1.2rem', background:'linear-gradient(90deg,#22c55e 60%,#2563eb 100%)', color:'#fff', fontWeight:'bold', border:'none', boxShadow:'0 4px 16px rgba(34,197,94,0.12)'}} onClick={() => navigate('/signup')}>
            <span className="donation-cta-icon" style={{fontSize:'1.2rem', marginRight:'0.7rem'}}>🔗</span> Join Our Mission Today
          </button>
        </div>
      </section>
    </div>
      <style>{`
        @media (max-width: 768px) {
          .landing-header {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem;
            padding: 1rem 0.5rem;
          }
          .landing-main {
            padding: 1rem 0 !important;
            min-width: 100vw !important;
          }
          .landing-hero-row {
            flex-direction: column !important;
            padding: 1.5rem 0.5rem !important;
            gap: 1.5rem !important;
            max-width: 100vw !important;
          }
          .landing-left {
            max-width: 100vw !important;
            text-align: center !important;
          }
          .landing-right {
            max-width: 100vw !important;
            justify-content: center !important;
          }
          .image-card {
            width: 100% !important;
            padding: 0.5rem !important;
            margin: 0 auto !important;
            max-width: 320px !important;
          }
          .organ-img {
            width: 100% !important;
            height: auto !important;
            max-width: 320px !important;
          }
          .donation-matters-section {
            padding: 1rem 0.5rem !important;
            max-width: 100vw !important;
          }
          .donation-matters-cards {
            flex-direction: column !important;
            gap: 1rem !important;
            width: 100vw !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .donation-card {
            min-width: unset !important;
            width: 100% !important;
            margin-bottom: 1rem !important;
            padding: 1rem 0.5rem !important;
            border-radius: 20px !important;
          }
          .donation-matters-cta {
            flex-direction: column !important;
            align-items: center !important;
            width: 100vw !important;
            padding: 0.5rem 0 !important;
          }
        }
      `}</style>
      </>
    );
}
export default LandingPage;

