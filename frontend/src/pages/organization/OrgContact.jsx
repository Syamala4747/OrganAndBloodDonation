import React, { useState } from 'react';
import axios from 'axios';
import './OrgContact.css';

const OrgContact = () => {
  const [query, setQuery] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual token logic if needed
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/organization/contact',
        { query },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSent(true);
    } catch (err) {
      alert('Failed to send query.');
    }
  };

  return (
    <div className="support-form-container">
      <h2>Contact</h2>
      <form className="support-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Your query..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
        />
        <button type="submit" className="support-btn">Send</button>
      </form>
      <div className="support-emails">
        Organization details: <br />
        <a href="mailto:teressaborra@gmail.com">teressaborra@gmail.com</a>, <a href="mailto:syamala4747@gmail.com">syamala4747@gmail.com</a>
      </div>
      {sent && <div className="support-success">Your query has been sent!</div>}
    </div>
  );
};

export default OrgContact;
