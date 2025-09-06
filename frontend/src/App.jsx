import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import DonorHome from './pages/donor/DonorHome';
import DonorStatus from './pages/donor/DonorStatus';
import DonorProfile from './pages/donor/DonorProfile';
import DonorNotifications from './pages/donor/DonorNotifications';
import DonorSupport from './pages/donor/DonorSupport';
import HospitalHome from './pages/hospital/HospitalHome';
import HospitalLivingDonors from './pages/hospital/HospitalLivingDonors';
import AdminHome from './pages/admin/AdminHome';
import OrgHome from './pages/organization/OrgHome';
import OrgAfterDeathDonors from './pages/organization/OrgAfterDeathDonors';
import HospitalStatus from './pages/hospital/HospitalStatus';
import HospitalProfile from './pages/hospital/HospitalProfile';
import HospitalNotifications from './pages/hospital/HospitalNotifications';
import HospitalSupport from './pages/hospital/HospitalSupport';
import HospitalLogout from './pages/hospital/Logout';
import OrgStatus from './pages/organization/OrgStatus';
import OrgProfile from './pages/organization/OrgProfile';
import OrgNotifications from './pages/organization/OrgNotifications';
import OrgContact from './pages/organization/OrgContact';
import OrgLogout from './pages/organization/OrgLogout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donor" element={<DonorHome />} />
        <Route path="/donor/status" element={<DonorStatus />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/notifications" element={<DonorNotifications />} />
  <Route path="/hospital/home" element={<HospitalHome />} />
  <Route path="/hospital/requests-status" element={<HospitalStatus />} />
        <Route path="/donor/support" element={<DonorSupport />} />
                <Route path="/hospital" element={<HospitalHome />} />

        <Route path="/hospital/status" element={<HospitalStatus />} />
        <Route path="/hospital/profile" element={<HospitalProfile />} />
        <Route path="/hospital/notifications" element={<HospitalNotifications />} />
  <Route path="/hospital/support" element={<HospitalSupport />} />
  <Route path="/hospital/logout" element={<HospitalLogout />} />
  <Route path="/hospital/living-donors" element={<HospitalLivingDonors />} />
        <Route path="/admin/*" element={<AdminHome />} />
         <Route path="/organization/status" element={<OrgStatus />} />
        <Route path="/organization/profile" element={<OrgProfile />} />
        <Route path="/organization/notifications" element={<OrgNotifications />} />
  <Route path="/organization/support" element={<OrgContact />} />
  <Route path="/organization/contact" element={<OrgContact />} />
  <Route path="/organization/after-death-donors" element={<OrgAfterDeathDonors />} />
  <Route path="/organization" element={<OrgHome />} />
  <Route path="/organization/logout" element={<OrgLogout />} />
  
      </Routes>
    </Router>
  );
}

export default App;
