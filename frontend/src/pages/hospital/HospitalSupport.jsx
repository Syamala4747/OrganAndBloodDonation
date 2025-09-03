import React, { useState } from 'react';
import './HospitalSupport.css';

const HospitalSupport = () => {
  const [query, setQuery] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send query to backend/support email
    setSent(true);
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
