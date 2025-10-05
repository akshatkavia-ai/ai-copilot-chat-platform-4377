import React from 'react';

/**
 * ChatMessage renders a single message bubble.
 */
export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        margin: '8px 0',
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 14px',
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          background: isUser ? '#2563EB' : '#ffffff',
          color: isUser ? '#ffffff' : '#111827',
          whiteSpace: 'pre-wrap',
          lineHeight: 1.4,
        }}
      >
        {content}
      </div>
    </div>
  );
}
