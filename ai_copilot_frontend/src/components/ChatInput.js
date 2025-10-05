import React, { useState } from 'react';

/**
 * ChatInput provides the multi-line input and send button.
 */
export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue('');
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        padding: 12,
        borderTop: '1px solid #e5e7eb',
        background: '#fff',
        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
        rows={2}
        style={{
          flex: 1,
          resize: 'none',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 10,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
        }}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        style={{
          background: '#2563EB',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: 8,
          cursor: 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        Send
      </button>
    </div>
  );
}
