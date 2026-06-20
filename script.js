const questions = [
  {
    id: "issue",
    category: "The issue",
    kicker: "Start here",
    type: "text",
    question: "What is the real conversation you have been avoiding?",
    help: "Name the behavior, pattern, or decision without making a case yet. Short and honest is better than polished.",
    label: "The thing that needs to be said",
    placeholder: "Example: My teammate keeps missing handoffs, and I am quietly getting resentful.",
    scores: { truth: 2, clarity: 1 },
  },
  {
    id: "relationship",
    category: "The person",
    kicker: "Map the relationship",
    type: "choice",
    question: "Who are you talking to?",
    help: "The power dynamic changes the amount of context, permission, and directness you will need.",
    options: [
      { label: "Friend", detail: "Personal bond, shared history, feelings matter." },
      { label: "Coworker", detail: "Shared work, mutual accountability, ongoing contact." },
      { label: "Boss", detail: "Power difference, career stakes, careful framing." },
      { label: "Direct report", detail: "You hold authority and owe extra clarity." },
      { label: "Partner or family", detail: "High emotion, long memory, deep patterns." },
      { label: "Client or customer", detail: "Service relationship, reputation, boundaries." },
    ],
    scores: { clarity: 1 },
  },
  {
    id: "pattern",
    category: "The pattern",
    kicker: "Separate event from trend",
    type: "choice",
    question: "Is this a one-time incident or a pattern?",
    help: "A single event needs curiosity. A pattern needs a firmer boundary.",
    options: [
      { label: "One clear incident", detail: "Something happened and needs repair." },
      { label: "A repeating pattern", detail: "You have seen enough to name it." },
      { label: "A slow drift", detail: "The relationship or standard has changed over time." },
      { label: "I am not sure", detail: "You need discovery before conclusions." },
    ],
    scores: { truth: 1, clarity: 1 },
  },
  {
    id: "stakes",
    category: "The stakes",
    kicker: "Why now",
    type: "text",
    question: "What is at risk if you do not talk about it?",
    help: "Think trust, quality, workload, safety, intimacy, money, morale, or your own self-respect.",
    label: "What avoidance costs",
    placeholder: "Example: I will stop trusting their commitments and start working around them.",
    scores: { truth: 1, clarity: 2 },
  },
  {
    id: "evidence",
    category: "The facts",
    kicker: "Anchor it",
    type: "text",
    question: "What are two concrete examples you can say out loud?",
    help: "Use observable facts. Avoid mind-reading, diagnoses, or courtroom adjectives.",
    label: "Specific moments",
    placeholder: "Example: Tuesday's launch notes were 2 days late; last Friday the client update had missing numbers.",
    scores: { clarity: 2 },
  },
  {
    id: "yourPart",
    category: "Your part",
    kicker: "Own the shadow",
    type: "text",
    question: "What part of this might belong to you?",
    help: "This does not mean taking blame. It means entering the conversation with clean hands.",
    label: "Your possible contribution",
    placeholder: "Example: I waited too long, then got chilly instead of naming it.",
    scores: { care: 1, truth: 1 },
  },
  {
    id: "emotion",
    category: "Your state",
    kicker: "Check the weather",
    type: "choice",
    question: "What emotion is loudest in you right now?",
    help: "Tone follows emotion. Naming it helps you choose the moment instead of leaking it.",
    options: [
      { label: "Frustration", detail: "Energy is high; keep the opening clean." },
      { label: "Hurt", detail: "Ask for impact to be heard, not prosecuted." },
      { label: "Anxiety", detail: "Plan the first sentence and the boundary." },
      { label: "Disappointment", detail: "Name the gap between expectation and reality." },
      { label: "Anger", detail: "Wait until you can be direct without punishing." },
      { label: "Sadness", detail: "Keep the request specific and grounded." },
    ],
    scores: { care: 1 },
  },
  {
    id: "readiness",
    category: "Timing",
    kicker: "Choose the moment",
    type: "scale",
    question: "How ready are you to be direct and respectful today?",
    help: "Low readiness does not mean avoid forever. It means prep, regulate, or schedule.",
    labels: ["Raw", "Shaky", "Steady", "Ready", "Clear"],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "personStyle",
    category: "Their style",
    kicker: "Predict the room",
    type: "multi",
    question: "What tends to be true about this person in hard conversations?",
    help: "Pick anything that helps you plan the tone and structure.",
    options: [
      { label: "Gets defensive", detail: "May need more facts and less heat." },
      { label: "Avoids conflict", detail: "May need a clear reason this matters." },
      { label: "Over-explains", detail: "May need time boxes and summarizing." },
      { label: "Shuts down", detail: "May need slower pacing and one question at a time." },
      { label: "Gets intense", detail: "May need boundaries around volume and respect." },
      { label: "Usually receptive", detail: "You can be simple and direct." },
    ],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "desiredOutcome",
    category: "The ask",
    kicker: "Know the target",
    type: "choice",
    question: "What do you most want from the conversation?",
    help: "One primary aim keeps the talk from becoming a greatest-hits album of old injuries.",
    options: [
      { label: "A behavior change", detail: "Something specific should happen differently." },
      { label: "A decision", detail: "You need alignment or a choice." },
      { label: "Repair", detail: "Trust or closeness needs attention." },
      { label: "A boundary", detail: "You need to define what is acceptable." },
      { label: "Understanding", detail: "You need their perspective before action." },
      { label: "Accountability", detail: "You need ownership and follow-through." },
    ],
    scores: { truth: 1, clarity: 2 },
  },
  {
    id: "request",
    category: "The ask",
    kicker: "Make it actionable",
    type: "text",
    question: "What specific request or boundary would make this better?",
    help: "If they said yes, what would change in the next day, week, or month?",
    label: "Your clean request",
    placeholder: "Example: I need handoff notes by 3pm on Thursdays, or a heads-up by noon if that is impossible.",
    scores: { clarity: 2 },
  },
  {
    id: "tone",
    category: "Tone",
    kicker: "Pick your posture",
    type: "choice",
    question: "What tone will serve the relationship and the truth?",
    help: "Tone is not softness. It is the delivery system for reality.",
    options: [
      { label: "Warm and direct", detail: "Best default for most honest conversations." },
      { label: "Calm and firm", detail: "Useful when a boundary has been crossed." },
      { label: "Curious and careful", detail: "Useful when you may be missing context." },
      { label: "Brief and factual", detail: "Useful for work, power dynamics, or high emotion." },
    ],
    scores: { care: 2, clarity: 1 },
  },
  {
    id: "venue",
    category: "Logistics",
    kicker: "Set the container",
    type: "choice",
    question: "Where should this conversation happen?",
    help: "Pick the place that gives both privacy and enough emotional bandwidth.",
    options: [
      { label: "In person", detail: "Best for nuance and repair." },
      { label: "Video call", detail: "Good for remote nuance and focus." },
      { label: "Phone call", detail: "Good when faces add pressure." },
      { label: "Written first", detail: "Good for scheduling or naming the topic, not litigating it." },
    ],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "opening",
    category: "First sentence",
    kicker: "Doorway",
    type: "text",
    question: "Draft the first sentence in your own voice.",
    help: "Try: \"I want to talk about something that matters to me, and I want to do it in a way that keeps us working well.\"",
    label: "Your opener",
    placeholder: "Write the sentence you can actually imagine saying.",
    scores: { truth: 1, care: 1, clarity: 1 },
  },
  {
    id: "curiosity",
    category: "Listening",
    kicker: "Leave room",
    type: "text",
    question: "What question will you ask before you make a final judgment?",
    help: "A fierce conversation is not a monologue. Make room for information that could change you.",
    label: "Your curiosity question",
    placeholder: "Example: How are you seeing this? Is there context I am missing?",
    scores: { care: 2 },
  },
  {
    id: "success",
    category: "Success",
    kicker: "Afterward",
    type: "text",
    question: "How will you know the conversation worked?",
    help: "Define a visible sign, not just a feeling.",
    label: "A signal of progress",
    placeholder: "Example: We agree on next steps, and I no longer feel like I have to monitor everything silently.",
    scores: { clarity: 2 },
  },
];

const state = {
  index: 0,
  answers: {},
  adaptedQuestions: {},
  pendingAdaptations: {},
};

const apiEndpoint = getApiEndpoint();
const adaptiveEndpoint = getAdaptiveEndpoint();
const adaptiveQuestionIds = new Set(["emotion", "personStyle", "request", "opening", "curiosity", "success"]);

const els = {
  stepLabel: document.querySelector("#stepLabel"),
  progressPercent: document.querySelector("#progressPercent"),
  progressBar: document.querySelector("#progressBar"),
  truthScore: document.querySelector("#truthScore"),
  careScore: document.querySelector("#careScore"),
  clarityScore: document.querySelector("#clarityScore"),
  answerTrail: document.querySelector("#answerTrail"),
  categoryLabel: document.querySelector("#categoryLabel"),
  promptKicker: document.querySelector("#promptKicker"),
  questionText: document.querySelector("#questionText"),
  questionHelp: document.querySelector("#questionHelp"),
  optionsPanel: document.querySelector("#optionsPanel"),
  textPanel: document.querySelector("#textPanel"),
  textLabel: document.querySelector("#textLabel"),
  textAnswer: document.querySelector("#textAnswer"),
  scalePanel: document.querySelector("#scalePanel"),
  multiPanel: document.querySelector("#multiPanel"),
  backButton: document.querySelector("#backButton"),
  nextButton: document.querySelector("#nextButton"),
  restartButton: document.querySelector("#restartButton"),
  questionCard: document.querySelector("#questionCard"),
  resultPanel: document.querySelector("#resultPanel"),
  briefGrid: document.querySelector("#briefGrid"),
  openingScript: document.querySelector("#openingScript"),
  aiFeedbackContent: document.querySelector("#aiFeedbackContent"),
  copyButton: document.querySelector("#copyButton"),
  refineButton: document.querySelector("#refineButton"),
};

function render() {
  const question = getCurrentQuestion();
  const completed = Object.keys(state.answers).length;
  const percent = Math.round((completed / questions.length) * 100);

  els.questionCard.hidden = false;
  els.resultPanel.hidden = true;
  els.stepLabel.textContent = `Question ${state.index + 1} of ${questions.length}`;
  els.progressPercent.textContent = `${percent}%`;
  els.progressBar.style.width = `${percent}%`;
  els.categoryLabel.textContent = question.category;
  els.promptKicker.textContent = question.kicker;
  els.questionText.textContent = question.question;
  els.questionHelp.textContent = question.help;
  els.backButton.disabled = state.index === 0;
  els.nextButton.textContent = state.index === questions.length - 1 ? "Build plan" : "Next";

  hideInputs();
  renderTrail();
  renderScores();

  if (question.type === "choice") renderChoices(question);
  if (question.type === "text") renderText(question);
  if (question.type === "scale") renderScale(question);
  if (question.type === "multi") renderMulti(question);

  updateNextState();
  requestAdaptiveQuestion();
}

function hideInputs() {
  els.optionsPanel.hidden = true;
  els.textPanel.hidden = true;
  els.scalePanel.hidden = true;
  els.multiPanel.hidden = true;
  els.optionsPanel.innerHTML = "";
  els.scalePanel.innerHTML = "";
  els.multiPanel.innerHTML = "";
}

function renderChoices(question) {
  els.optionsPanel.hidden = false;
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.innerHTML = `<strong>${option.label}</strong><span>${option.detail}</span>`;
    button.classList.toggle("is-selected", state.answers[question.id] === option.label);
    button.addEventListener("click", () => {
      state.answers[question.id] = option.label;
      render();
    });
    els.optionsPanel.append(button);
  });
}

function renderText(question) {
  els.textPanel.hidden = false;
  els.textLabel.textContent = question.label;
  els.textAnswer.placeholder = question.placeholder;
  els.textAnswer.value = state.answers[question.id] || "";
  els.textAnswer.focus();
}

function renderScale(question) {
  els.scalePanel.hidden = false;
  question.labels.forEach((label, index) => {
    const value = index + 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scale-button";
    button.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    button.classList.toggle("is-selected", state.answers[question.id] === value);
    button.addEventListener("click", () => {
      state.answers[question.id] = value;
      render();
    });
    els.scalePanel.append(button);
  });
}

function renderMulti(question) {
  els.multiPanel.hidden = false;
  const selected = state.answers[question.id] || [];
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "multi-button";
    button.innerHTML = `<strong>${option.label}</strong><span>${option.detail}</span>`;
    button.classList.toggle("is-selected", selected.includes(option.label));
    button.addEventListener("click", () => {
      const next = new Set(state.answers[question.id] || []);
      if (next.has(option.label)) next.delete(option.label);
      else next.add(option.label);
      state.answers[question.id] = [...next];
      render();
    });
    els.multiPanel.append(button);
  });
}

function updateNextState() {
  const question = getCurrentQuestion();
  const answer = state.answers[question.id];
  const hasAnswer = Array.isArray(answer) ? answer.length > 0 : Boolean(String(answer || "").trim());
  els.nextButton.disabled = !hasAnswer;
}

function commitTextAnswer() {
  const question = getCurrentQuestion();
  if (question.type === "text") {
    state.answers[question.id] = els.textAnswer.value.trim();
  }
}

function next() {
  commitTextAnswer();
  updateNextState();
  if (els.nextButton.disabled) return;

  if (state.index === questions.length - 1) {
    renderResult();
    return;
  }
  state.index += 1;
  render();
}

function back() {
  commitTextAnswer();
  if (state.index > 0) {
    state.index -= 1;
    render();
  }
}

function restart() {
  state.index = 0;
  state.answers = {};
  state.adaptedQuestions = {};
  state.pendingAdaptations = {};
  render();
}

function renderTrail() {
  els.answerTrail.innerHTML = "";
  questions.forEach((baseQuestion, index) => {
    const question = getQuestionAt(index);
    const answer = state.answers[question.id];
    if (!answer) return;

    const li = document.createElement("li");
    const value = Array.isArray(answer) ? answer.join(", ") : answer;
    li.innerHTML = `<span>${index + 1}. ${question.category}</span><p>${escapeHtml(String(value))}</p>`;
    els.answerTrail.append(li);
  });
}

function renderScores() {
  const scores = { truth: 0, care: 0, clarity: 0 };
  questions.forEach((baseQuestion, index) => {
    const question = getQuestionAt(index);
    if (!state.answers[question.id]) return;
    Object.entries(question.scores || {}).forEach(([key, value]) => {
      scores[key] += value;
    });
  });
  els.truthScore.textContent = scores.truth;
  els.careScore.textContent = scores.care;
  els.clarityScore.textContent = scores.clarity;
}

function renderResult() {
  const plan = buildPlan();
  els.questionCard.hidden = true;
  els.resultPanel.hidden = false;
  els.stepLabel.textContent = "Plan ready";
  els.progressPercent.textContent = "100%";
  els.progressBar.style.width = "100%";
  renderTrail();
  renderScores();

  els.briefGrid.innerHTML = "";
  plan.cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = "brief-card";
    article.innerHTML = `<h3>${card.title}</h3><p>${escapeHtml(card.body)}</p>`;
    els.briefGrid.append(article);
  });
  els.openingScript.textContent = plan.script;
  renderAiFeedbackLoading();
  requestAiFeedback(plan);
}

function buildPlan() {
  const a = state.answers;
  const relationship = a.relationship || "this person";
  const tone = (a.tone || "Warm and direct").toLowerCase();
  const venue = (a.venue || "In person").toLowerCase();
  const style = Array.isArray(a.personStyle) ? a.personStyle.join(", ").toLowerCase() : "unknown";
  const readiness = Number(a.readiness || 3);
  const timing =
    readiness <= 2
      ? "Do not wing this today. Schedule it, write your first two sentences, and enter after your body has cooled down."
      : "You are ready enough to schedule it soon. Keep it private, focused, and time-limited.";

  const script =
    a.opening ||
    `I want to talk about ${lowerFirst(a.issue || "something important")}. I care about our relationship, and I want to be direct instead of letting this build up.`;

  return {
    script,
    cards: [
      {
        title: "Core truth",
        body: a.issue || "Name the real issue in one sentence before you begin.",
      },
      {
        title: "Relationship lens",
        body: `You are speaking with a ${relationship.toLowerCase()}. Use a ${tone} tone and avoid saving up unrelated history for this talk.`,
      },
      {
        title: "Evidence",
        body: a.evidence || "Bring one or two concrete examples that can be observed by both people.",
      },
      {
        title: "Your part",
        body: a.yourPart || "Own any delay, vagueness, assumption, or avoidance that belongs to you.",
      },
      {
        title: "Their likely response",
        body: `Plan for this pattern: ${style}. Ask one curiosity question before you move to your request.`,
      },
      {
        title: "The request",
        body: a.request || "Make one specific request with a visible next step.",
      },
      {
        title: "Timing",
        body: `${timing} Best container: ${venue}.`,
      },
      {
        title: "Success signal",
        body: a.success || "Decide what progress will look like after the conversation.",
      },
    ],
  };
}

function copyPlan() {
  const plan = buildPlan();
  const aiNotes = els.aiFeedbackContent?.innerText?.trim();
  const text = [
    "Fierce Conversation Plan",
    "",
    `Opening: ${plan.script}`,
    "",
    ...plan.cards.map((card) => `${card.title}: ${card.body}`),
    "",
    aiNotes ? `AI feedback:\n${aiNotes}` : "",
  ].join("\n");

  navigator.clipboard?.writeText(text).then(() => {
    els.copyButton.textContent = "Copied";
    setTimeout(() => {
      els.copyButton.textContent = "Copy plan";
    }, 1200);
  });
}

function renderAiFeedbackLoading() {
  els.aiFeedbackContent.classList.remove("is-error");
  els.aiFeedbackContent.innerHTML = "<p>Getting real feedback from the coach...</p>";
}

async function requestAiFeedback(plan) {
  try {
    if (!apiEndpoint) {
      throw new Error(
        "AI feedback is not configured for this GitHub Pages site. Add your backend URL to config.js.",
      );
    }

    const payload = {
      answers: questions.map((question) => ({
        id: question.id,
        category: getQuestionById(question.id).category,
        question: getQuestionById(question.id).question,
        answer: state.answers[question.id],
      })),
      plan,
    };

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "The AI coach could not respond.");
    }

    renderAiFeedback(data.feedback);
  } catch (error) {
    els.aiFeedbackContent.classList.add("is-error");
    els.aiFeedbackContent.innerHTML = `<p>${escapeHtml(error.message)} The questionnaire still works, but live AI coaching needs a deployed backend with a provider API key set.</p>`;
  }
}

function renderAiFeedback(feedback) {
  const text = String(feedback || "").trim();
  if (!text) {
    els.aiFeedbackContent.innerHTML = "<p>The AI coach returned an empty response. Try refining your answers and running it again.</p>";
    return;
  }

  els.aiFeedbackContent.classList.remove("is-error");
  els.aiFeedbackContent.innerHTML = text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`)
    .join("");
}

function lowerFirst(value) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : value;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[char];
  });
}

function getCurrentQuestion() {
  return getQuestionAt(state.index);
}

function getQuestionAt(index) {
  const baseQuestion = questions[index];
  return state.adaptedQuestions[baseQuestion.id] || baseQuestion;
}

function getQuestionById(id) {
  const index = questions.findIndex((question) => question.id === id);
  return index === -1 ? questions[0] : getQuestionAt(index);
}

async function requestAdaptiveQuestion() {
  const baseQuestion = questions[state.index];
  if (!shouldAdaptQuestion(baseQuestion)) return;
  if (!adaptiveEndpoint) return;
  if (state.answers[baseQuestion.id]) return;
  if (state.adaptedQuestions[baseQuestion.id] || state.pendingAdaptations[baseQuestion.id]) return;

  state.pendingAdaptations[baseQuestion.id] = true;

  try {
    const payload = {
      baseQuestion,
      answers: questions
        .slice(0, state.index)
        .map((question, index) => {
          const renderedQuestion = getQuestionAt(index);
          return {
            id: renderedQuestion.id,
            category: renderedQuestion.category,
            question: renderedQuestion.question,
            answer: state.answers[renderedQuestion.id],
          };
        })
        .filter((item) => item.answer),
    };

    const response = await fetch(adaptiveEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Question adaptation failed.");

    const adapted = normalizeAdaptedQuestion(baseQuestion, data.question);
    if (adapted) {
      state.adaptedQuestions[baseQuestion.id] = adapted;
      if (questions[state.index].id === baseQuestion.id && !state.answers[baseQuestion.id]) {
        render();
      }
    }
  } catch (error) {
    console.warn(error);
  } finally {
    delete state.pendingAdaptations[baseQuestion.id];
  }
}

function shouldAdaptQuestion(question) {
  return state.index >= 5 && adaptiveQuestionIds.has(question.id) && Object.keys(state.answers).length >= 4;
}

function normalizeAdaptedQuestion(baseQuestion, adapted) {
  if (!adapted || typeof adapted !== "object") return null;

  const next = {
    ...baseQuestion,
    category: cleanText(adapted.category) || baseQuestion.category,
    kicker: cleanText(adapted.kicker) || baseQuestion.kicker,
    question: cleanText(adapted.question) || baseQuestion.question,
    help: cleanText(adapted.help) || baseQuestion.help,
    label: cleanText(adapted.label) || baseQuestion.label,
    placeholder: cleanText(adapted.placeholder) || baseQuestion.placeholder,
  };

  if ((baseQuestion.type === "choice" || baseQuestion.type === "multi") && Array.isArray(adapted.options)) {
    const options = adapted.options
      .map((option) => ({
        label: cleanText(option.label),
        detail: cleanText(option.detail),
      }))
      .filter((option) => option.label && option.detail)
      .slice(0, 6);

    if (options.length >= 3) next.options = options;
  }

  return next;
}

function cleanText(value) {
  return typeof value === "string" ? value.trim().slice(0, 240) : "";
}

function getApiEndpoint() {
  const configured = window.CONVERSATION_COACH_API_URL;
  if (typeof configured === "string" && configured.trim()) {
    return configured.trim();
  }

  const isLocal =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "";

  if (isLocal) return "/api/feedback";
  return "";
}

function getAdaptiveEndpoint() {
  const configured = window.CONVERSATION_COACH_ADAPTIVE_URL;
  if (typeof configured === "string" && configured.trim()) {
    return configured.trim();
  }

  if (!apiEndpoint) return "";
  return apiEndpoint.replace(/\/api\/feedback\/?$/, "/api/adaptive-question");
}

function drawBackground() {
  const canvas = document.querySelector("#backgroundScene");
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const shapes = [
    { x: width * 0.08, y: height * 0.2, w: 210, h: 92, color: "rgba(42, 157, 143, 0.18)" },
    { x: width * 0.78, y: height * 0.18, w: 250, h: 110, color: "rgba(231, 111, 81, 0.16)" },
    { x: width * 0.68, y: height * 0.72, w: 300, h: 120, color: "rgba(242, 193, 78, 0.2)" },
  ];

  shapes.forEach((shape, index) => {
    ctx.fillStyle = shape.color;
    ctx.strokeStyle = "rgba(24,32,29,0.12)";
    ctx.lineWidth = 2;
    roundRect(ctx, shape.x, shape.y, shape.w, shape.h, 26);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    if (index !== 1) {
      ctx.moveTo(shape.x + 42, shape.y + shape.h);
      ctx.lineTo(shape.x + 72, shape.y + shape.h + 34);
      ctx.lineTo(shape.x + 88, shape.y + shape.h);
    } else {
      ctx.moveTo(shape.x + shape.w - 42, shape.y + shape.h);
      ctx.lineTo(shape.x + shape.w - 76, shape.y + shape.h + 38);
      ctx.lineTo(shape.x + shape.w - 96, shape.y + shape.h);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(24,32,29,0.10)";
  ctx.lineWidth = 1;
  for (let x = -40; x < width + 40; x += 58) {
    ctx.beginPath();
    ctx.moveTo(x, height);
    ctx.bezierCurveTo(x + 60, height * 0.75, x - 40, height * 0.45, x + 70, 0);
    ctx.stroke();
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

els.nextButton.addEventListener("click", next);
els.backButton.addEventListener("click", back);
els.restartButton.addEventListener("click", restart);
els.copyButton.addEventListener("click", copyPlan);
els.refineButton.addEventListener("click", () => {
  state.index = Math.max(0, questions.length - 3);
  render();
});
els.textAnswer.addEventListener("input", () => {
  const question = questions[state.index];
  state.answers[question.id] = els.textAnswer.value.trim();
  updateNextState();
  renderScores();
  renderTrail();
});
window.addEventListener("resize", drawBackground);

drawBackground();
render();
