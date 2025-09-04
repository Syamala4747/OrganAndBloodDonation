import React, { useState } from 'react';
import './HospitalSupport.css';

const HospitalSupport = () => {
  const [query, setQuery] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send query to backend/support email
    fetch('/api/support/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, to: 'syamala7072@gmail.com' })
    }).then(() => setSent(true)).catch(() => alert('Failed to send query.'));
  };

  return (
    <div className="support-form-container">
      <h2>Contact & Support</h2>
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
        Support emails: <br />
        <a href="mailto:teressaborra@gmail.com">teressaborra@gmail.com</a>, <a href="mailto:syamala4747@gmail.com">syamala4747@gmail.com</a>
      </div>
      {sent && <div className="support-success">Your query has been sent!</div>}
    </div>
  );
};

export default HospitalSupport;
