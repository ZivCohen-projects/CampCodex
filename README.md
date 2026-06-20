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

Current GitHub Pages frontend:

https://zivcohen-projects.github.io/CampCodex/

To use AI feedback on GitHub Pages with Render:

1. Go to https://dashboard.render.com/blueprints.
2. Click "New Blueprint Instance".
3. Connect `ZivCohen-projects/CampCodex`.
4. When Render asks for environment variables, set `OPENAI_API_KEY`.
5. Deploy the service.
6. Copy the Render service URL and edit `config.js`:

```js
window.CONVERSATION_COACH_API_URL = "https://your-render-service.onrender.com/api/feedback";
```

The questionnaire and draft plan work without the backend. Live AI feedback appears once `config.js` points to a deployed backend.
