import React from 'react';
import './HospitalStatus.css';

const statusData = [
  { type: 'Requested A+ Blood', donor: 'Chitti', status: 'Pending' },
  { type: 'Requested Kidney', donor: 'Syamala', status: 'Approved' },
];

const HospitalStatus = () => (
  <div className="status-table-container">
    <h2>Request Status</h2>
    <table className="status-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Donor</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {statusData.map((row, idx) => (
          <tr key={idx}>
            <td>{row.type}</td>
            <td>{row.donor}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default HospitalStatus;
