# Claude Code SDK Backend Service

This backend service enables the web application to use the Claude Code SDK, which requires Node.js and the Claude CLI.

## Prerequisites

1. Install Claude CLI globally:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. Authenticate with Claude:
   ```bash
   claude login
   ```

## Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Configuration

The server runs on port 3001 by default. You can change this by setting the `PORT` environment variable.

In your main app's `.env` file, configure:
```
VITE_LLM_PROVIDER=claude
VITE_USE_CLAUDE_CODE_SDK=true
VITE_CLAUDE_BACKEND_URL=http://localhost:3001
```

## API Endpoints

- `POST /api/claude` - General Claude query endpoint
- `POST /api/claude/analyze-document` - Document analysis
- `POST /api/claude/improve-page` - Page layout improvement

## Security Notes

- This service should run in a secure environment
- In production, implement proper authentication between frontend and backend
- Never expose this service directly to the internet without proper security measures