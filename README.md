# Fierce Conversation Coach

A guided difficult-conversation planner with optional AI coaching feedback.

The frontend uses the AI backend in two places:

- `/api/adaptive-question` can personalize selected later prompts as the user answers.
- `/api/feedback` generates the final coaching notes.

## Run Locally

Create `.env`:

```env
AI_PROVIDER_ORDER=gemini,groq
GEMINI_API_KEYS=your_first_gemini_key_here,your_second_gemini_key_here
GEMINI_MODEL=gemini-3.5-flash
GROQ_API_KEYS=your_first_groq_key_here,your_second_groq_key_here
GROQ_MODEL=llama-3.3-70b-versatile
USE_AI_ADAPTIVE_QUESTIONS=false
ALLOWED_ORIGIN=http://localhost:3000
```

Start the app:

```powershell
node server.js
```

Open `http://localhost:3000`.

## GitHub Pages

GitHub Pages can host the frontend, but it cannot run `server.js` or hide provider API keys.

Current GitHub Pages frontend:

https://zivcohen-projects.github.io/CampCodex/

To use AI feedback on GitHub Pages with Render:

1. Go to https://dashboard.render.com/blueprints.
2. Click "New Blueprint Instance".
3. Connect `ZivCohen-projects/CampCodex`.
4. When Render asks for environment variables, set at least one provider key.
5. Deploy the service.
6. Copy the Render service URL and edit `config.js`:

```js
window.CONVERSATION_COACH_API_URL = "https://your-render-service.onrender.com/api/feedback";
```

The questionnaire and draft plan work without the backend. Live AI feedback appears once `config.js` points to a deployed backend.
Adaptive questions use local personalization by default to save API calls. Set `USE_AI_ADAPTIVE_QUESTIONS=true` if you want the backend to spend model calls on question rewrites too.

## Recommended API Keys

Use both free-key providers so a quota/rate-limit error does not break the final plan:

1. Gemini: create one or more keys at https://aistudio.google.com/apikey and paste them into `GEMINI_API_KEYS`, separated by commas.
2. Groq: create one or more keys at https://console.groq.com/keys and paste them into `GROQ_API_KEYS`, separated by commas.

Example Render values:

```env
AI_PROVIDER_ORDER=gemini,groq
GEMINI_API_KEYS=gemini_key_1,gemini_key_2
GROQ_API_KEYS=groq_key_1,groq_key_2
USE_AI_ADAPTIVE_QUESTIONS=false
```

The backend tries every key in provider order. If one key/provider returns auth, quota, rate-limit, or temporary server errors, it tries the next configured key/provider.
