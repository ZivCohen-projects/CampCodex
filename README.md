# Fierce Conversation Coach

A guided difficult-conversation planner with optional AI coaching feedback.

## Run Locally

Create `.env`:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.4-mini
ALLOWED_ORIGIN=http://localhost:3000
```

Start the app:

```powershell
node server.js
```

Open `http://localhost:3000`.

## GitHub Pages

GitHub Pages can host the frontend, but it cannot run `server.js` or hide `OPENAI_API_KEY`.

To use AI feedback on GitHub Pages:

1. Deploy this repo's `server.js` to a backend host such as Render, Railway, Fly, or Vercel.
2. Set `OPENAI_API_KEY` on that host.
3. Set `ALLOWED_ORIGIN=https://zivcohen-projects.github.io` on that host.
4. Edit `config.js` in the GitHub Pages repo:

```js
window.CONVERSATION_COACH_API_URL = "https://your-backend.example.com/api/feedback";
```

The questionnaire and draft plan work without the backend. Live AI feedback appears once `config.js` points to a deployed backend.
