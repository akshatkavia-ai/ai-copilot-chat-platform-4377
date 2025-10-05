import axios from 'axios';

/**
 * Axios instance configured with base URL from environment.
 * Uses REACT_APP_API_BASE_URL, defaulting to http://localhost:3001.
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// PUBLIC_INTERFACE
export async function sendChatMessage(message, history = []) {
  /** Send a chat message to the backend /chat endpoint with optional history. */
  const payload = { message, history };
  const { data } = await api.post('/chat', payload);
  return data;
}

export default api;
