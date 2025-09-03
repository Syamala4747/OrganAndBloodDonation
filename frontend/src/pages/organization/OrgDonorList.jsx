import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrgDonorList.css';

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
    <div className="org-donor-list-container">
      <h2>Registered Donors (After-Death Pledge)</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <table className="org-donor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Blood Type</th>
              <th>Organs Pledged</th>
              <th>Nominee Contact</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, idx) => (
              <tr key={idx}>
                <td>{donor.name}</td>
                <td>{donor.age}</td>
                <td>{donor.bloodType}</td>
                <td>{donor.organsPledged?.map(org => <span key={org} className="org-tag">{org}</span>)}</td>
                <td>{donor.nomineeName}<br />{donor.nomineePhone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrgDonorList;
