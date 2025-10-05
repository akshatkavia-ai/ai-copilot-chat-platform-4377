import axios from 'axios';

/**
 * Axios instance configured with base URL from environment.
 * Uses REACT_APP_API_BASE_URL, defaulting to http://localhost:3001.
 */
const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Warn if the environment variable is not defined
if (!process.env.REACT_APP_API_BASE_URL) {
  console.warn(
    'REACT_APP_API_BASE_URL is not defined in .env. Using default:',
    baseURL
  );
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// PUBLIC_INTERFACE
export async function sendChatMessage(message, history = []) {
  /** Send a chat message to the backend /chat endpoint with optional history. */
  const payload = { message, history };
  const { data } = await api.post('/chat', payload);
  return data; // expects shape: { reply: string }
}

// PUBLIC_INTERFACE
export async function sendChatAndGetReply(message, history = []) {
  /** Convenience helper to return only the reply string from the backend response. */
  const data = await sendChatMessage(message, history);
  return data?.reply ?? '';
}

export default api;
