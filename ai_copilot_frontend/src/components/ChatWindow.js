import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

/**
 * ChatWindow renders the scrollable list of chat messages.
 */
export default function ChatWindow({ messages, loading, error }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: 16,
        background: 'linear-gradient(to bottom right, rgba(37,99,235,0.08), #f9fafb)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {messages.map((m, idx) => (
          <ChatMessage key={idx} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div style={{ color: '#6b7280', padding: '8px 0' }}>Thinking...</div>
        )}
        {error && (
          <div
            style={{
              background: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FDE68A',
              padding: 8,
              borderRadius: 8,
            }}
          >
            Error: {error}
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
