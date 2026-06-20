const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

loadEnvFile();

const PORT = Number(process.env.PORT || 3000);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const AI_PROVIDER = (process.env.AI_PROVIDER || (GEMINI_API_KEY ? "gemini" : "openai")).toLowerCase();
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
  if (AI_PROVIDER === "gemini" && !GEMINI_API_KEY) {
    sendJson(res, 500, {
      error: "Missing GEMINI_API_KEY on the server.",
    });
    return;
  }

  if (AI_PROVIDER === "openai" && !OPENAI_API_KEY) {
    sendJson(res, 500, {
      error: "Missing OPENAI_API_KEY on the server.",
    });
    return;
  }

  const body = await readJsonBody(req);
  const answers = Array.isArray(body.answers) ? body.answers : [];
  const plan = body.plan || {};

  const prompt = buildCoachPrompt(answers, plan);
  let feedback;
  try {
    feedback = AI_PROVIDER === "gemini" ? await callGemini(prompt) : await callOpenAi(prompt);
  } catch (error) {
    sendJson(res, 502, { error: error.message || "AI provider request failed." });
    return;
  }

  sendJson(res, 200, { feedback });
}

async function callOpenAi(prompt) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: prompt,
      max_output_tokens: 900,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI request failed.");
  }

  return extractOpenAiText(data);
}

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL,
  )}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 900,
      },
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini request failed.");
  }

  return extractGeminiText(data);
}

function buildCoachPrompt(answers, plan) {
  const formattedAnswers = answers
    .map((item) => {
      const answer = Array.isArray(item.answer) ? item.answer.join(", ") : item.answer;
      return `${item.category} - ${item.question}\nAnswer: ${answer || "(blank)"}`;
    })
    .join("\n\n");

  return `
You are a direct but caring conversation coach inspired by the principles of fierce conversations: be truthful, specific, accountable, and relationship-aware.

The user is preparing for a difficult conversation. Use their answers below to give real feedback, not generic encouragement.

Your job:
1. Name the strongest part of their plan.
2. Name the part they may be avoiding or softening.
3. Identify any risky assumptions, blame language, vague requests, bad timing, or missing evidence.
4. Rewrite their opening in a cleaner, more honest voice if needed.
5. Give 3 practical moves for the conversation.
6. End with one sentence they should keep in mind right before they start.

Tone: honest, grounded, concise, compassionate, and useful. Do not over-validate. Do not diagnose anyone. Do not invent facts beyond the answers.

Answers:
${formattedAnswers}

Draft plan:
${JSON.stringify(plan, null, 2)}
`.trim();
}

function extractOpenAiText(data) {
  if (data.output_text) return data.output_text;

  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) chunks.push(content.text);
      if (content.type === "text" && content.text) chunks.push(content.text);
    }
  }
  return chunks.join("\n\n").trim();
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
