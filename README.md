AI Scheme Eligibility & Explanation Assistant
Maharashtra Edition – AI for Bharat Hackathon
Overview

This project is a backend system that determines eligibility for selected Maharashtra government schemes using deterministic rule logic.

An AI layer is added only to explain the results in simple language. The AI does not decide eligibility.

The core idea behind this system is simple:

Eligibility must be rule-based, auditable, and predictable.

AI should assist with explanation, not decision-making.

What This System Does

Given a user profile (age, income, occupation, category, state), the system:

Validates the input.

Loads structured scheme rules from JSON files.

Evaluates eligibility using deterministic logic.

Optionally generates a plain-language explanation using AI.

Returns structured eligibility results.

If the AI fails or is unavailable, eligibility results are still returned.

Architectural Philosophy

The system is intentionally divided into two independent layers:

1. Deterministic Eligibility Layer (Authoritative)

This layer:

Uses fixed rule checks.

Evaluates age, income, occupation, category, and state.

Produces a boolean eligibility decision.

Returns machine-readable rule tokens.

This layer does not use AI and cannot be influenced by it.

Eligibility is calculated strictly as:

eligible = reasons.length === 0

All rules are evaluated fully for transparency. There is no early exit.

2. AI Explanation Layer (Non-Authoritative)

The AI layer:

Receives finalized eligibility results.

Converts rule tokens into a human-readable explanation.

Is explicitly instructed not to reinterpret rules.

Cannot change eligibility decisions.

If the AI call fails, the system returns results without explanation.

This ensures the deterministic engine always remains the source of truth.

Project Structure
ai-scheme-assistant/
│
├── features/
│   ├── eligibility/
│   │   ├── validator.js
│   │   ├── rulesLoader.js
│   │   └── engine.js
│   │
│   ├── explanation/
│   │   ├── promptTemplate.js
│   │   └── aiService.js
│   │
│   ├── schemes/
│   │   ├── pm_kisan.json
│   │   ├── mjpjay.json
│   │   ├── ebc_scholarship.json
│   │   ├── shravan_bal.json
│   │   └── yuva_prashikshan.json
│   │
│   └── evaluation/
│       └── evaluateController.js
│
├── server.js
├── package.json
└── .env

Each folder has a single responsibility:

eligibility/ → deterministic rule engine

explanation/ → AI prompt + API wrapper

schemes/ → structured rule definitions

evaluation/ → orchestration

server.js → HTTP layer only

Supported Schemes (Maharashtra Only)

The MVP includes five schemes:

PM-KISAN

Mahatma Jyotirao Phule Jan Arogya Yojana

Shravan Bal Seva Rajya Nivrutti Vetan Yojana

Economically Backward Class Scholarship

Mukhyamantri Yuva Karya Prashikshan Yojana

All rules are stored in JSON. No logic exists inside JSON files.

Why This Design?

Government eligibility systems must be:

Transparent

Predictable

Auditable

Free from probabilistic decision-making

AI is helpful for simplifying explanations, but it should never decide who qualifies.

This system demonstrates how AI can be layered on top of a rule engine safely, without compromising determinism.

Running the Project

Install dependencies:

npm install

Create a .env file in the root:

GEMINI_API_KEY=your_key_here

Start the server:

node server.js

Send a POST request to:

/evaluate
Example Response
{
  "results": [
    {
      "scheme": "Economically Backward Class Scholarship",
      "eligible": true,
      "matchedRules": [...],
      "reasons": []
    }
  ],
  "explanation": "You are eligible because..."
}

If AI is unavailable:

{
  "results": [...]
}
Constraints (MVP Scope)

This project intentionally does not include:

Database storage

Authentication

Persistent user data

Multi-state support

Real-time government APIs

AI-driven eligibility decisions

It is designed as a local-first, rule-based prototype.

Final Note

This project focuses on one core principle:

Eligibility decisions must be deterministic.
AI should assist users in understanding outcomes, not in determining them.