const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const GEMINI_API_KEYS = readList(process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY);
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GROQ_API_KEYS = readList(process.env.GROQ_API_KEYS || process.env.GROQ_API_KEY);
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const AI_PROVIDER_ORDER = readList(
  process.env.AI_PROVIDER_ORDER || process.env.AI_PROVIDER || "gemini,groq",
).map((provider) => provider.toLowerCase());
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (req, res) => {
  try {
    setCorsHeaders(res);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === "POST" && req.url === "/api/feedback") {
      await handleFeedback(req, res);
      return;
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      sendJson(res, 405, { error: "Method not allowed." });
      return;
    }

    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: "Something went wrong on the server." });
  }
});

server.listen(PORT, () => {
  console.log(`Fierce Conversation Coach running at http://localhost:${PORT}`);
});

async function handleFeedback(req, res) {
  const body = await readJsonBody(req);
  const answers = Array.isArray(body.answers) ? body.answers : [];
  const plan = body.plan || {};

  const prompt = buildCoachPrompt(answers, plan);
  let feedback;
  try {
    feedback = await callAiWithFallback(prompt, 2600);
  } catch (error) {
    sendJson(res, 502, { error: error.message || "AI provider request failed." });
    return;
  }

  sendJson(res, 200, { feedback });
}

async function callAiWithFallback(prompt, maxOutputTokens = 900) {
  const attempts = buildProviderAttempts();
  if (!attempts.length) {
    throw new Error("No AI provider keys are configured. Add GEMINI_API_KEYS or GROQ_API_KEYS.");
  }

  const errors = [];
  for (const attempt of attempts) {
    try {
      if (attempt.provider === "gemini") return await callGemini(prompt, maxOutputTokens, attempt.key);
      if (attempt.provider === "groq") return await callGroq(prompt, maxOutputTokens, attempt.key);
    } catch (error) {
      errors.push(`${attempt.provider}: ${error.message}`);
      if (!shouldTryNextProvider(error)) throw error;
    }
  }

  throw new Error(`All configured AI providers failed. ${errors.join(" | ")}`);
}

function buildProviderAttempts() {
  const keyMap = {
    gemini: GEMINI_API_KEYS,
    groq: GROQ_API_KEYS,
  };

  return AI_PROVIDER_ORDER.flatMap((provider) =>
    (keyMap[provider] || []).map((key, index) => ({
      provider,
      key,
      index,
    })),
  );
}

function shouldTryNextProvider(error) {
  return [401, 403, 429, 500, 502, 503, 504].includes(error.status);
}

async function callGemini(prompt, maxOutputTokens = 900, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL,
  )}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens,
      },
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw providerError(response.status, data.error?.message || "Gemini request failed.");
  }

  return extractGeminiText(data);
}

async function callGroq(prompt, maxOutputTokens = 900, apiKey) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_completion_tokens: maxOutputTokens,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw providerError(response.status, data.error?.message || "Groq request failed.");
  }

  return extractGroqText(data);
}

function buildCoachPrompt(answers, plan) {
  const formattedAnswers = answers
    .map((item) => {
      const answer = item.answerDisplay || (Array.isArray(item.answer) ? item.answer.join(", ") : item.answer);
      return `${item.category} - ${item.question}\nAnswer: ${answer || "(blank)"}`;
    })
    .join("\n\n");

  return `
You are a direct but caring conversation coach inspired by the principles of fierce conversations: be truthful, specific, accountable, and relationship-aware.

The user is preparing for a difficult conversation. Use their answers below to give real feedback, not generic encouragement.

Your job:
Write a complete, usable conversation plan. Finish every section.

Use these sections exactly:

1. Strongest part
Name what is already solid in their plan.

2. What they may be avoiding
Name the likely soft spot, evasion, vague request, risky assumption, or missing boundary.

3. Step-by-step conversation guide
Give 5 to 7 numbered steps they can follow in the actual conversation. Each step should include what to say or do.

4. Cleaner opening
Rewrite the opening in a direct, human voice.

5. Watch-outs
Name the biggest tone, timing, or evidence risks.

6. Final reminder
End with one sentence they should remember right before starting.

Tone: honest, grounded, concise, compassionate, and useful. Do not over-validate. Do not diagnose anyone. Do not invent facts beyond the answers.
Do not stop after section 1 or 2. Keep going until the final reminder is complete.
Write enough substance that the user could follow the plan without guessing what to do next.
Do not use Markdown heading markers like #, ##, or ###. Use plain section titles.
The readiness answer is on a 1-5 scale only. Never call it a score out of 10.

Answers:
${formattedAnswers}

Draft plan:
${JSON.stringify(plan, null, 2)}
`.trim();
}

function extractGeminiText(data) {
  const chunks = [];
  for (const candidate of data.candidates || []) {
    for (const part of candidate.content?.parts || []) {
      if (part.text) chunks.push(part.text);
    }
  }
  return chunks.join("\n\n").trim();
}

function extractGroqText(data) {
  return (data.choices || [])
    .map((choice) => choice.message?.content || "")
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function providerError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendText(res, 404, "Not found");
      return;
    }

    const type = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    if (req.method === "HEAD") res.end();
    else res.end(content);
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
