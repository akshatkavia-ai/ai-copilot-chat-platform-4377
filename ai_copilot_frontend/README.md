# AI Copilot Frontend (React)

A lightweight React app to chat with the AI Copilot backend.

## Quickstart

1) Install dependencies
   - npm install

2) Environment variables
   - Copy .env.example to .env
     - cp .env.example .env
   - Set REACT_APP_API_BASE_URL to your backend URL:
     - For local dev (default): http://localhost:3001
     - Example: REACT_APP_API_BASE_URL=http://localhost:3001

3) Run the app
   - npm start
   - Open http://localhost:3000

## API Base URL

The frontend reads the API base URL from REACT_APP_API_BASE_URL and calls the backend /chat endpoint via Axios.

- Source: src/api/client.js
- Default: http://localhost:3001
- Response shape expected: { "reply": string }

## Additional scripts

- npm test
- npm run build

For React docs and advanced topics, see the official documentation: https://reactjs.org/
