# Frontend Environment Setup

## Required Environment Variables

Create a `.env` file in the frontend root with:

```env
REACT_APP_API_BASE_URL=http://127.0.0.1:3001
```

### Local Development
- Use `http://localhost:3001` or `http://127.0.0.1:3001` for local backend

### Preview/Cloud Development
- Replace with the actual backend preview URL
- Example: `https://vscode-internal-37086-beta.beta01.cloud.kavia.ai:3001`

## Restart After Changes

**Critical:** React only reads `.env` variables at startup.

After modifying `.env`:
1. Stop the dev server (Ctrl+C in terminal)
2. Run `npm start` again
3. Check browser console - you should see a warning if `REACT_APP_API_BASE_URL` is undefined

## Verifying Connection

1. Open browser DevTools (F12)
2. Go to Network tab
3. Send a chat message
4. Check the request URL - it should match your `REACT_APP_API_BASE_URL`
5. If you see `ERR_CONNECTION_REFUSED`, verify:
   - Backend is running: `curl http://127.0.0.1:3001/health`
   - REACT_APP_API_BASE_URL matches the backend URL
   - You restarted the frontend after changing .env

## Common Issues

### ERR_CONNECTION_REFUSED
- Backend not running or not bound to 0.0.0.0
- Wrong URL in REACT_APP_API_BASE_URL
- Firewall blocking the connection

### CORS Errors
- Backend ALLOWED_ORIGINS doesn't include frontend URL
- Restart backend after updating .env
