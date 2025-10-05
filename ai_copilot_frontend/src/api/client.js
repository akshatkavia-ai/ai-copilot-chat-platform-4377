import axios from 'axios';

/**
 * Axios instance configured with base URL from environment.
 * Uses REACT_APP_API_BASE_URL, defaulting to http://127.0.0.1:3001 for local dev.
 * Provides better diagnostics for common Network/CORS errors.
 */
const envBase = process.env.REACT_APP_API_BASE_URL;
const defaultLocal = 'http://127.0.0.1:3001';
const fallbackLocalhost = 'http://localhost:3001';
const baseURL = envBase || defaultLocal;

// Development-time diagnostics
if (!envBase) {
  // eslint-disable-next-line no-console
  console.warn(
    '[ai-copilot] REACT_APP_API_BASE_URL not defined in .env. Using default:',
    baseURL
  );
} else {
  // eslint-disable-next-line no-console
  console.info('[ai-copilot] Using API base URL from env:', envBase);
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  // Give a reasonable timeout for dev; prevents hanging forever on unreachable hosts
  timeout: 20000,
});

// Normalize errors to improve user-facing messages
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.code === 'ECONNABORTED') {
      error.message = 'Request timed out while contacting the backend.';
    } else if (error?.message === 'Network Error' && !error.response) {
      error.message =
        'Network Error: Could not reach the backend. Verify API base URL and that the backend is running.';
    }
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
export async function sendChatMessage(message, history = []) {
  /** Send a chat message to the backend /chat endpoint with optional history. */
  const payload = { message, history };
  try {
    const { data } = await api.post('/chat', payload);
    return data; // expects shape: { reply: string }
  } catch (err) {
    // If env not set and default 127.0.0.1 failed, try localhost as a fallback (dev convenience)
    if (!envBase && (!err?.response || err?.message?.includes('Network Error'))) {
      try {
        const alt = axios.create({
          baseURL: fallbackLocalhost,
          headers: { 'Content-Type': 'application/json' },
          timeout: 20000,
        });
        const { data } = await alt.post('/chat', payload);
        // eslint-disable-next-line no-console
        console.info('[ai-copilot] Fallback to localhost:3001 succeeded.');
        return data;
      } catch (e2) {
        // Attach more context
        e2.message =
          (e2.message || 'Network Error') +
          ` (Tried ${baseURL} and fallback ${fallbackLocalhost})`;
        throw e2;
      }
    }
    throw err;
  }
}

// PUBLIC_INTERFACE
export async function sendChatAndGetReply(message, history = []) {
  /** Convenience helper to return only the reply string from the backend response. */
  const data = await sendChatMessage(message, history);
  return data?.reply ?? '';
}

// PUBLIC_INTERFACE
export async function checkHealth() {
  /** Quick health check to verify connectivity to the backend API. */
  try {
    const { data } = await api.get('/health', { timeout: 8000 });
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error:
        err?.response?.data?.detail ||
        err?.message ||
        'Failed to reach backend health endpoint',
    };
  }
}

export default api;
