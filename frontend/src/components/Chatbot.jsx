import React, { useState } from 'react';
import './Chatbot.css';
import robotImg from '../assets/robot.png';

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages([...messages, userMsg]);
    setLoading(true);
    setInput('');
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-robot-fixed">
        <img
          src={robotImg}
          alt="Chatbot"
          className="chatbot-robot-img"
          onClick={() => setShowChat(!showChat)}
          style={{ cursor: 'pointer', width: '56px', height: '56px', objectFit: 'contain', display: 'block' }}
        />
      </div>
      {showChat && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>AI Chatbot</span>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.sender}`}>{msg.text}</div>
            ))}
            {loading && <div className="chatbot-message bot">Thinking...</div>}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
