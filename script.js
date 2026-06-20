const coreQuestions = [
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

const extraQuestions = [
  {
    id: "assumption",
    category: "Your story",
    kicker: "Check the story",
    type: "text",
    question: "What assumption are you making that you have not verified yet?",
    help: "Separate what you know from what you think it means. This is where many hard conversations go crooked.",
    label: "The unverified story",
    placeholder: "Example: I am assuming they do not care about how this affects me.",
    scores: { truth: 1, care: 1 },
  },
  {
    id: "impact",
    category: "Impact",
    kicker: "Name the effect",
    type: "text",
    question: "What has this been costing you emotionally, practically, or relationally?",
    help: "Impact helps the other person understand why the topic matters without turning the talk into an accusation.",
    label: "The impact",
    placeholder: "Example: I am spending extra time checking work and I feel less trusting.",
    scores: { truth: 1, clarity: 2 },
  },
  {
    id: "firstNoticed",
    category: "The pattern",
    kicker: "Timeline",
    type: "text",
    question: "When did you first notice this becoming something you could not ignore?",
    help: "A timeline keeps the conversation grounded and helps you avoid sounding like this came out of nowhere.",
    label: "When it shifted",
    placeholder: "Example: Around the last project handoff, when the same delay happened three times.",
    scores: { clarity: 2 },
  },
  {
    id: "frequency",
    category: "The pattern",
    kicker: "How often",
    type: "choice",
    question: "How often does this issue show up?",
    help: "Frequency changes the tone. A rare miss needs less force than a repeated pattern.",
    options: [
      { label: "Rarely", detail: "Treat it as a repair or clarification." },
      { label: "Sometimes", detail: "Name the pattern gently and ask what is happening." },
      { label: "Often", detail: "Be direct about the cost and the needed change." },
      { label: "Almost constantly", detail: "Prepare a boundary, not just a request." },
    ],
    scores: { truth: 1, clarity: 1 },
  },
  {
    id: "powerDynamic",
    category: "Power",
    kicker: "Name the dynamic",
    type: "choice",
    question: "What power dynamic should you account for?",
    help: "Power can be formal, emotional, financial, social, or based on who needs what from whom.",
    options: [
      { label: "They have more power", detail: "Be concise, documented, and specific." },
      { label: "I have more power", detail: "Use extra care and invite honesty." },
      { label: "Power is fairly equal", detail: "Use direct mutual accountability." },
      { label: "It is complicated", detail: "Name the dynamic carefully before the ask." },
    ],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "trustLevel",
    category: "Trust",
    kicker: "Relationship temperature",
    type: "scale",
    question: "How much trust is still available between you right now?",
    help: "If trust is low, your plan needs more evidence, more patience, and less improvising.",
    labels: ["Thin", "Wobbly", "Mixed", "Solid", "Strong"],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "heardBefore",
    category: "History",
    kicker: "Have you tried",
    type: "choice",
    question: "Have you already raised this before?",
    help: "A first conversation can be exploratory. A repeated conversation needs clearer consequences or next steps.",
    options: [
      { label: "No, this is the first time", detail: "Lead with curiosity and facts." },
      { label: "Yes, lightly", detail: "Name that you are becoming more direct now." },
      { label: "Yes, clearly", detail: "Move from request to accountability." },
      { label: "Many times", detail: "Prepare a boundary and a follow-up date." },
    ],
    scores: { truth: 1, clarity: 1 },
  },
  {
    id: "avoidanceReason",
    category: "Avoidance",
    kicker: "The hook",
    type: "choice",
    question: "What has made you avoid the conversation until now?",
    help: "Your avoidance reason often predicts where your tone will wobble.",
    options: [
      { label: "I do not want to hurt them", detail: "Keep care visible while still being specific." },
      { label: "I fear their reaction", detail: "Prepare boundaries and do not over-explain." },
      { label: "I am not sure I am right", detail: "Lead with observations and curiosity." },
      { label: "I need something from them", detail: "Be honest about the stakes and power dynamic." },
      { label: "I keep minimizing it", detail: "Name the cost of staying quiet." },
    ],
    scores: { truth: 1, care: 1 },
  },
  {
    id: "bodySignal",
    category: "Your state",
    kicker: "Body check",
    type: "choice",
    question: "What does your body do when you imagine this conversation?",
    help: "Your nervous system gives useful data about pacing, timing, and preparation.",
    options: [
      { label: "Tight chest", detail: "Slow the opening and breathe before naming the issue." },
      { label: "Hot face", detail: "Wait until the charge drops before you speak." },
      { label: "Stomach drop", detail: "Plan the ask and the exit before starting." },
      { label: "Numb or blank", detail: "Write the first sentence down." },
      { label: "Mostly steady", detail: "You can probably be direct and simple." },
    ],
    scores: { care: 1 },
  },
  {
    id: "trigger",
    category: "Your state",
    kicker: "Pressure point",
    type: "text",
    question: "What could they say that would make you lose your footing?",
    help: "Planning for your trigger makes it less likely to run the conversation.",
    label: "The line that would hook you",
    placeholder: "Example: If they say I am overreacting, I will want to defend everything at once.",
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "bestCaseForThem",
    category: "Fairness",
    kicker: "Steelman",
    type: "text",
    question: "What is the most generous believable explanation for their behavior?",
    help: "This keeps you from entering like a prosecutor. It does not require you to excuse the impact.",
    label: "Their best reasonable case",
    placeholder: "Example: They may be overloaded and embarrassed, not careless.",
    scores: { care: 2 },
  },
  {
    id: "nonNegotiable",
    category: "Boundary",
    kicker: "Line in the sand",
    type: "text",
    question: "What is the one thing you are no longer willing to keep doing?",
    help: "A boundary is about your future behavior, not controlling theirs.",
    label: "Your non-negotiable",
    placeholder: "Example: I am not willing to absorb last-minute work without a clear escalation.",
    scores: { truth: 1, clarity: 2 },
  },
  {
    id: "consequence",
    category: "Boundary",
    kicker: "If nothing changes",
    type: "text",
    question: "If nothing changes after the conversation, what will you do differently?",
    help: "This is not a threat. It is the reality you need to be honest with yourself about.",
    label: "Your next move",
    placeholder: "Example: I will stop accepting undocumented handoffs and escalate earlier.",
    scores: { truth: 1, clarity: 2 },
  },
  {
    id: "repairNeed",
    category: "Repair",
    kicker: "What needs mending",
    type: "choice",
    question: "Is repair part of what you need, or is this mostly about logistics?",
    help: "Repair conversations need more acknowledgment. Logistics conversations need more specificity.",
    options: [
      { label: "Mostly repair", detail: "Lead with impact, care, and listening." },
      { label: "Mostly logistics", detail: "Lead with facts and next steps." },
      { label: "Both", detail: "Separate the emotional impact from the practical request." },
      { label: "I am not sure", detail: "Ask what they think needs repair." },
    ],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "apology",
    category: "Your part",
    kicker: "Clean ownership",
    type: "text",
    question: "Is there anything you should apologize for before making your ask?",
    help: "A precise apology can lower defensiveness. A vague apology can muddy the issue.",
    label: "Possible apology",
    placeholder: "Example: I should apologize for waiting until I was frustrated instead of raising it earlier.",
    scores: { care: 2, truth: 1 },
  },
  {
    id: "permission",
    category: "Opening",
    kicker: "Invitation",
    type: "text",
    question: "How will you ask for permission to have the conversation?",
    help: "Permission does not mean asking whether the truth is allowed. It means setting a better container.",
    label: "Permission sentence",
    placeholder: "Example: Do you have twenty minutes today for something important about how we are working together?",
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "dataMissing",
    category: "Missing context",
    kicker: "Unknowns",
    type: "text",
    question: "What information might change your interpretation of what happened?",
    help: "If nothing could change your mind, you may be ready for a boundary rather than a discovery conversation.",
    label: "What you do not know",
    placeholder: "Example: I do not know whether priorities changed or whether they had a blocker.",
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "values",
    category: "Values",
    kicker: "What it touches",
    type: "choice",
    question: "What value is this issue pressing on for you?",
    help: "Values explain why a situation feels bigger than the isolated facts.",
    options: [
      { label: "Respect", detail: "You need consideration and directness." },
      { label: "Reliability", detail: "You need commitments to mean something." },
      { label: "Fairness", detail: "You need the load or standard to be shared." },
      { label: "Honesty", detail: "You need reality named without spin." },
      { label: "Safety", detail: "You need boundaries around harm or risk." },
      { label: "Belonging", detail: "You need the relationship to feel mutual." },
    ],
    scores: { truth: 1 },
  },
  {
    id: "audience",
    category: "Logistics",
    kicker: "Privacy",
    type: "choice",
    question: "Who should definitely not be present for this conversation?",
    help: "Hard conversations get distorted when they become performances.",
    options: [
      { label: "Peers or coworkers", detail: "Keep work status out of the room." },
      { label: "Family or mutual friends", detail: "Avoid turning it into a group judgment." },
      { label: "Their boss or authority figure", detail: "Start privately unless escalation is needed." },
      { label: "No one else", detail: "A private one-on-one is the right container." },
    ],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "timingRisk",
    category: "Timing",
    kicker: "Bad moment",
    type: "text",
    question: "What timing would make this conversation worse?",
    help: "Sometimes courage is speaking soon. Sometimes courage is not ambushing someone at the worst possible moment.",
    label: "Bad timing to avoid",
    placeholder: "Example: Not right before the client meeting or when either of us is rushing out.",
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "mediumRisk",
    category: "Logistics",
    kicker: "Channel",
    type: "choice",
    question: "Which communication channel would make misunderstanding most likely?",
    help: "Choose the channel that protects clarity, not the channel that protects your comfort.",
    options: [
      { label: "Text message", detail: "Too easy to misread tone." },
      { label: "Email", detail: "Useful for setup, risky for emotional nuance." },
      { label: "Public chat", detail: "Too performative for a real conversation." },
      { label: "Live call", detail: "Risky only if either person gets flooded quickly." },
    ],
    scores: { clarity: 1 },
  },
  {
    id: "oneSentenceTruth",
    category: "Core truth",
    kicker: "Boil it down",
    type: "text",
    question: "If you could only say one honest sentence, what would it be?",
    help: "This sentence is your compass. The actual conversation can be kinder and more complete.",
    label: "One honest sentence",
    placeholder: "Example: I need us to stop treating missed handoffs like they are harmless.",
    scores: { truth: 2, clarity: 1 },
  },
  {
    id: "whatNotToSay",
    category: "Tone",
    kicker: "Avoid the cheap shot",
    type: "text",
    question: "What sentence would feel satisfying but make the conversation worse?",
    help: "Naming the tempting sentence helps you avoid using it when you feel cornered.",
    label: "The sentence to leave out",
    placeholder: "Example: You always make your problem my problem.",
    scores: { care: 2 },
  },
  {
    id: "defensiveMove",
    category: "Their style",
    kicker: "If they push back",
    type: "choice",
    question: "What kind of pushback should your plan be ready for?",
    help: "A good plan does not require the other person to respond perfectly.",
    options: [
      { label: "Denial", detail: "Return to examples and impact." },
      { label: "Blame shifting", detail: "Own your part, then return to the request." },
      { label: "Minimizing", detail: "Name the cost without escalating." },
      { label: "Counterattack", detail: "Slow down and set a respect boundary." },
      { label: "Withdrawal", detail: "Ask one simple question and allow a pause." },
    ],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "listeningTarget",
    category: "Listening",
    kicker: "Listen for",
    type: "choice",
    question: "What should you listen for most carefully?",
    help: "Listening with a target keeps you from only waiting for your turn to talk.",
    options: [
      { label: "New facts", detail: "Information that changes the picture." },
      { label: "Their intent", detail: "What they thought they were doing." },
      { label: "Their constraints", detail: "What makes the change hard." },
      { label: "Their willingness", detail: "Whether they are ready to own next steps." },
      { label: "Their hurt", detail: "Impact you may need to repair." },
    ],
    scores: { care: 2 },
  },
  {
    id: "followUpDate",
    category: "Follow-up",
    kicker: "Make it real",
    type: "text",
    question: "When should you check back on whether the conversation changed anything?",
    help: "Without follow-up, even a good conversation can evaporate.",
    label: "Follow-up timing",
    placeholder: "Example: I will check in next Friday after the next handoff.",
    scores: { clarity: 2 },
  },
  {
    id: "measure",
    category: "Success",
    kicker: "Visible proof",
    type: "text",
    question: "What observable behavior would prove progress, even if the emotions are still settling?",
    help: "Good outcomes are visible enough that both people can recognize them.",
    label: "Observable proof",
    placeholder: "Example: The handoff arrives before the meeting with the missing fields filled in.",
    scores: { clarity: 2 },
  },
  {
    id: "fallbackAsk",
    category: "The ask",
    kicker: "If they cannot say yes",
    type: "text",
    question: "What smaller first step would still move things in the right direction?",
    help: "A fallback ask keeps the conversation from becoming yes-or-nothing.",
    label: "Smaller ask",
    placeholder: "Example: If weekly notes are too much, can we start with the top three risks by Wednesday?",
    scores: { clarity: 2, care: 1 },
  },
  {
    id: "supportNeeded",
    category: "Support",
    kicker: "Do not go in alone",
    type: "text",
    question: "What support or preparation do you need before you have the conversation?",
    help: "Support might be notes, documentation, a rehearsal, HR guidance, or simply a calmer moment.",
    label: "Support needed",
    placeholder: "Example: I need to write the facts down and rehearse the opening once.",
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "escalationLine",
    category: "Escalation",
    kicker: "Know the line",
    type: "text",
    question: "At what point would this need to involve someone else?",
    help: "Escalation is not failure when safety, authority, or repeated harm is involved.",
    label: "Escalation line",
    placeholder: "Example: If they agree and miss the next two handoffs, I will bring in our manager.",
    scores: { clarity: 2 },
  },
  {
    id: "confidentiality",
    category: "Trust",
    kicker: "After the talk",
    type: "choice",
    question: "How private does this conversation need to stay afterward?",
    help: "Privacy expectations prevent the second conflict after the first conversation.",
    options: [
      { label: "Very private", detail: "Agree on what can and cannot be shared." },
      { label: "Mostly private", detail: "Share only next steps with relevant people." },
      { label: "Work-visible outcome", detail: "The agreement may need to be documented." },
      { label: "Not sure", detail: "Ask directly during the close." },
    ],
    scores: { care: 1, clarity: 1 },
  },
  {
    id: "closeSentence",
    category: "Closing",
    kicker: "Land the plane",
    type: "text",
    question: "What closing sentence would leave the conversation clear rather than hanging?",
    help: "The ending should summarize agreement, care, and the next step.",
    label: "Closing sentence",
    placeholder: "Example: I appreciate you hearing this; I will send the agreed next steps so we both have them.",
    scores: { care: 1, clarity: 2 },
  },
  {
    id: "selfRespect",
    category: "Courage",
    kicker: "Future you",
    type: "text",
    question: "What would make you proud of how you handled yourself, regardless of their reaction?",
    help: "You cannot control their response. You can control whether you were honest, fair, and clear.",
    label: "Your standard",
    placeholder: "Example: I stayed calm, told the truth, and did not soften the request into fog.",
    scores: { truth: 1, care: 1, clarity: 1 },
  },
];

const questionBank = [...coreQuestions, ...extraQuestions];
const questionDepthOptions = [5, 10, 15, 20];

const questionSlots = [
  ["pattern", "frequency", "firstNoticed", "assumption"],
  ["stakes", "impact", "values", "selfRespect"],
  ["desiredOutcome", "request", "nonNegotiable", "fallbackAsk"],
  ["evidence", "oneSentenceTruth", "dataMissing"],
  ["yourPart", "apology", "avoidanceReason"],
  ["emotion", "bodySignal", "trigger"],
  ["personStyle", "defensiveMove", "listeningTarget"],
  ["tone", "whatNotToSay", "bestCaseForThem"],
  ["venue", "permission", "timingRisk", "mediumRisk"],
  ["opening", "oneSentenceTruth", "permission"],
  ["curiosity", "dataMissing", "listeningTarget"],
  ["readiness", "trustLevel", "supportNeeded"],
  ["powerDynamic", "audience", "confidentiality"],
  ["repairNeed", "apology", "bestCaseForThem"],
  ["consequence", "escalationLine", "nonNegotiable"],
  ["success", "measure", "followUpDate"],
  ["closeSentence", "followUpDate", "confidentiality"],
  ["supportNeeded", "selfRespect", "escalationLine"],
];

let questions = createQuestionSet(10);

function createQuestionSet(count) {
  const selected = ["issue", "relationship"];
  const used = new Set(selected);

  questionSlots.forEach((slot) => {
    if (selected.length >= count) return;
    const candidate = pickRandom(slot.filter((id) => !used.has(id)));
    if (!candidate) return;
    selected.push(candidate);
    used.add(candidate);
  });

  if (selected.length < count) {
    shuffle(questionBank.map((question) => question.id)).forEach((id) => {
      if (selected.length >= count || used.has(id)) return;
      selected.push(id);
      used.add(id);
    });
  }

  return selected
    .slice(0, count)
    .map((id) => questionBank.find((question) => question.id === id))
    .filter(Boolean);
}

function pickRandom(items) {
  if (!items.length) return "";
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

const state = {
  index: 0,
  selectedCount: 10,
  answers: {},
};

const apiEndpoint = getApiEndpoint();

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
  depthButtons: document.querySelectorAll("[data-question-count]"),
  backButton: document.querySelector("#backButton"),
  nextButton: document.querySelector("#nextButton"),
  restartButton: document.querySelector("#restartButton"),
  questionCard: document.querySelector("#questionCard"),
  resultPanel: document.querySelector("#resultPanel"),
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

  renderDepthButtons();
  hideInputs();
  renderTrail();
  renderScores();

  if (question.type === "choice") renderChoices(question);
  if (question.type === "text") renderText(question);
  if (question.type === "scale") renderScale(question);
  if (question.type === "multi") renderMulti(question);

  updateNextState();
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

async function next() {
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
  questions = createQuestionSet(state.selectedCount);
  render();
}

function setQuestionCount(count) {
  if (!questionDepthOptions.includes(count) || count === state.selectedCount) return;
  state.selectedCount = count;
  state.index = 0;
  state.answers = {};
  questions = createQuestionSet(count);
  render();
}

function renderDepthButtons() {
  els.depthButtons.forEach((button) => {
    const count = Number(button.dataset.questionCount);
    button.classList.toggle("is-selected", count === state.selectedCount);
    button.setAttribute("aria-pressed", String(count === state.selectedCount));
  });
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

  const guide = [
    {
      title: "Set the container",
      body: `Use ${venue}. Ask for enough private time, and do not start while either person is rushed or performing for others.`,
    },
    {
      title: "Open cleanly",
      body: script,
    },
    {
      title: "Name the pattern",
      body: a.evidence
        ? `Use your concrete examples: ${a.evidence}`
        : "Describe one or two observable moments. Keep it factual enough that both people could recognize what happened.",
    },
    {
      title: "Own your part",
      body: a.yourPart || "Name any delay, vagueness, assumption, or avoidance that belongs to you before making your request.",
    },
    {
      title: "Ask before deciding",
      body: a.curiosity || "Ask what context you may be missing, then listen long enough to be changed by useful information.",
    },
    {
      title: "Make one request",
      body: a.request || "Ask for one concrete behavior, boundary, or decision. Make the next step visible.",
    },
    {
      title: "Close with agreement",
      body: a.success || "Summarize what each person agreed to do, and decide when you will check whether it worked.",
    },
  ];

  return {
    script,
    guide,
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
  const aiNotes = els.aiFeedbackContent?.innerText?.trim();
  const text = [
    "Fierce Conversation Plan",
    "",
    aiNotes || "The AI plan has not loaded yet.",
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
  els.aiFeedbackContent.innerHTML = "<p>Building your step-by-step plan...</p>";
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
        category: question.category,
        question: question.question,
        answer: state.answers[question.id],
        answerDisplay: formatAnswerForAi(question, state.answers[question.id]),
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
  els.aiFeedbackContent.innerHTML = formatFeedbackHtml(text);
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
  return questions[index];
}

function formatAnswerForAi(question, answer) {
  if (answer === undefined || answer === null || answer === "") return "";
  if (Array.isArray(answer)) return answer.join(", ");
  if (question.id === "readiness") {
    const label = question.labels?.[Number(answer) - 1];
    return `${answer}${label ? ` (${label})` : ""} on a 1-5 readiness scale`;
  }
  return String(answer);
}

function formatFeedbackHtml(text) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const html = [];
  let listType = "";
  let listItems = [];
  let orderedListStart = 1;
  let lastOrderedNumber = 0;

  const flushList = () => {
    if (!listItems.length) return;
    const startAttribute = listType === "ol" && orderedListStart !== 1 ? ` start="${orderedListStart}"` : "";
    html.push(`<${listType}${startAttribute}>${listItems.join("")}</${listType}>`);
    listItems = [];
    listType = "";
    orderedListStart = 1;
    lastOrderedNumber = 0;
  };

  lines.forEach((line) => {
    const normalized = stripMarkdown(line);
    const sectionTitleMatch = normalized.match(
      /^\d+\.\s+(Strongest part|What they may be avoiding|Step-by-step conversation guide|Cleaner opening|Watch-outs|Final reminder)(?::\s*(.+))?$/i,
    );
    const headingMatch = normalized.match(/^(?:\d+\.\s+)?([A-Z][A-Za-z -]{2,70})$/);
    const markdownHeading = line.match(/^#{1,6}\s+(.+)/);
    const bulletMatch = normalized.match(/^[-*]\s+(.+)/);
    const numberedMatch = normalized.match(/^(\d+)\.\s+(.+)/);

    if (markdownHeading) {
      flushList();
      html.push(`<h3>${escapeHtml(stripSectionNumber(stripMarkdown(markdownHeading[1])))}</h3>`);
    } else if (sectionTitleMatch) {
      flushList();
      html.push(`<h3>${escapeHtml(sectionTitleMatch[1])}</h3>`);
      if (sectionTitleMatch[2]) {
        html.push(`<p>${escapeHtml(sectionTitleMatch[2])}</p>`);
      }
    } else if (bulletMatch) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(`<li>${escapeHtml(bulletMatch[1])}</li>`);
    } else if (numberedMatch && normalized.length < 220) {
      const itemNumber = Number(numberedMatch[1]);
      if (listType !== "ol") flushList();
      if (listType !== "ol") {
        orderedListStart = itemNumber;
      } else if (lastOrderedNumber && itemNumber !== lastOrderedNumber + 1) {
        flushList();
        listType = "ol";
        orderedListStart = itemNumber;
      }
      listType = "ol";
      listItems.push(`<li>${escapeHtml(numberedMatch[2])}</li>`);
      lastOrderedNumber = itemNumber;
    } else if (headingMatch && normalized.length < 80) {
      flushList();
      html.push(`<h3>${escapeHtml(headingMatch[1])}</h3>`);
    } else {
      flushList();
      html.push(`<p>${escapeHtml(normalized)}</p>`);
    }
  });

  flushList();
  return html.join("");
}

function stripMarkdown(value) {
  return String(value)
    .replace(/^#{1,6}\s*/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .trim();
}

function stripSectionNumber(value) {
  return String(value).replace(/^\d+\.\s+/, "").trim();
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
els.depthButtons.forEach((button) => {
  button.addEventListener("click", () => setQuestionCount(Number(button.dataset.questionCount)));
});
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
