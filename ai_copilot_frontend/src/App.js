import React, { useState } from 'react';
import './App.css';
import { sendChatMessage } from './api/client';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

// PUBLIC_INTERFACE
function App() {
  /** Root application with chat state and handlers. */
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  const handleSend = async (text) => {
    setError('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await sendChatMessage(text, next);
      const reply = res.reply || res.message || '';
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e?.response?.data?.detail || e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-accent" /> AI Copilot
          </div>
          <div style={{ color: '#6b7280' }}>Ocean Professional</div>
        </div>
      </header>
      <main className="container">
        <ChatWindow messages={messages} loading={loading} error={error} />
      </main>
      <footer className="footer">
        <ChatInput onSend={handleSend} disabled={loading} />
      </footer>
    </div>
  );
}

export default App;
