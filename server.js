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

    if (req.method === "POST" && req.url === "/api/adaptive-question") {
      await handleAdaptiveQuestion(req, res);
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
    feedback = AI_PROVIDER === "gemini" ? await callGemini(prompt, 2600) : await callOpenAi(prompt, 2600);
  } catch (error) {
    sendJson(res, 502, { error: error.message || "AI provider request failed." });
    return;
  }

  sendJson(res, 200, { feedback });
}

async function handleAdaptiveQuestion(req, res) {
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
  const baseQuestion = body.baseQuestion || {};
  const answers = Array.isArray(body.answers) ? body.answers : [];

  if (!baseQuestion.id || !baseQuestion.type || !baseQuestion.question) {
    sendJson(res, 400, { error: "Missing base question." });
    return;
  }

  const prompt = buildAdaptiveQuestionPrompt(baseQuestion, answers);
  let raw;
  try {
    raw = AI_PROVIDER === "gemini" ? await callGemini(prompt, 700) : await callOpenAi(prompt, 700);
  } catch (error) {
    sendJson(res, 502, { error: error.message || "AI provider request failed." });
    return;
  }

  const parsed = parseJsonFromText(raw);
  const question = normalizeAdaptiveQuestion(baseQuestion, parsed.question || parsed);
  if (!question) {
    sendJson(res, 502, { error: "AI returned an invalid adaptive question." });
    return;
  }

  sendJson(res, 200, { question });
}

async function callOpenAi(prompt, maxOutputTokens = 900) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: prompt,
      max_output_tokens: maxOutputTokens,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI request failed.");
  }

  return extractOpenAiText(data);
}

async function callGemini(prompt, maxOutputTokens = 900) {
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
        maxOutputTokens,
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

function buildAdaptiveQuestionPrompt(baseQuestion, answers) {
  const formattedAnswers = answers
    .map((item) => {
      const answer = item.answerDisplay || (Array.isArray(item.answer) ? item.answer.join(", ") : item.answer);
      return `${item.category} - ${item.question}\nAnswer: ${answer || "(blank)"}`;
    })
    .join("\n\n");

  const optionInstructions =
    baseQuestion.type === "choice" || baseQuestion.type === "multi"
      ? "Return 4 to 6 options. Each option must have a short label and one sentence detail."
      : "Do not return options.";

  return `
You create unusually useful, personalized questions for a difficult-conversation coaching app.

The app is inspired by fierce conversations: direct truth, care for the relationship, accountability, specificity, and curiosity.

Rewrite the next base question so it fits this user's situation. Keep the same input type: ${baseQuestion.type}.
The rewritten question must be meaningfully different from the base question. Do not return the same wording with tiny edits.

Make the question sharper than generic advice. It should surface something the user might not think to examine, such as hidden stakes, role confusion, self-protection, assumed intent, cost of silence, concrete repair, or a boundary they are avoiding.

Do not diagnose anyone. Do not invent facts. Do not make the wording therapy-ish or corporate.

Base question:
${JSON.stringify(baseQuestion, null, 2)}

User answers so far:
${formattedAnswers || "(No answers yet.)"}

${optionInstructions}

Return only valid JSON in this exact shape:
{
  "question": {
    "category": "short category",
    "kicker": "two to four words",
    "question": "one clear personalized question",
    "help": "one helpful sentence",
    "label": "short label for text answers, if relevant",
    "placeholder": "short example answer, if relevant",
    "options": [
      { "label": "Option label", "detail": "Option detail." }
    ]
  }
}
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

function parseJsonFromText(text) {
  const raw = String(text || "").trim();
  try {
    return JSON.parse(raw);
  } catch (error) {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return {};
    try {
      return JSON.parse(match[0]);
    } catch (innerError) {
      return {};
    }
  }
}

function normalizeAdaptiveQuestion(baseQuestion, adapted) {
  if (!adapted || typeof adapted !== "object") return null;

  const question = {
    category: cleanText(adapted.category) || baseQuestion.category,
    kicker: cleanText(adapted.kicker) || baseQuestion.kicker,
    question: cleanText(adapted.question) || baseQuestion.question,
    help: cleanText(adapted.help) || baseQuestion.help,
    label: cleanText(adapted.label) || baseQuestion.label,
    placeholder: cleanText(adapted.placeholder) || baseQuestion.placeholder,
  };

  if (baseQuestion.type === "choice" || baseQuestion.type === "multi") {
    const options = Array.isArray(adapted.options)
      ? adapted.options
          .map((option) => ({
            label: cleanText(option.label),
            detail: cleanText(option.detail),
          }))
          .filter((option) => option.label && option.detail)
          .slice(0, 6)
      : [];

    if (options.length < 3) return null;
    question.options = options;
  }

  return question;
}

function cleanText(value) {
  return typeof value === "string" ? value.trim().slice(0, 280) : "";
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
