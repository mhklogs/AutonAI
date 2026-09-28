# Auton AI 🎭

Auton AI is a web-based, AI-powered test automation engineer. Describe test criteria, user stories, or manual QA steps in natural language and it generates production-ready **Playwright** (TypeScript or JavaScript) or **Cypress** scripts — then lets you refine them interactively in plain English. Powered by Google's Gemini API.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mhklogs/AutonAI/pulls)

---

## ✨ Features

- **Dual framework output** — Native Playwright TS/JS and Cypress JS generation from a single prompt.
- **Strict smart-locator engine** — Prefers modern, accessible-first locators (`getByRole`, `getByLabel`, `getByPlaceholder`) over brittle XPaths and deep CSS chains.
- **Zero-flakiness defaults** — Relies on built-in auto-waiting instead of hardcoded sleeps (`page.waitForTimeout`, `cy.wait`).
- **Architect's Notes** — Every generation includes a strategy report covering assumptions, selector choices, and wait strategies.
- **Interactive refactoring** — Ask for changes ("use a custom viewport", "mock a 500 error") and regenerate the script in place.
- **Session history** — Recently generated scripts are kept for the browser session so you can jump back to previous results.

## 🚀 Quick Start

**Prerequisites:** Node.js 20+

```bash
# 1. Install dependencies
npm install

# 2. Configure your Gemini API key
echo "GEMINI_API_KEY=your_key_here" > .env.local

# 3. Run the app
npm run dev
```

Then open http://localhost:3000. The Vite dev server proxies `/api` requests to the Express backend on port 3000.

> **No API key?** The UI still loads. You'll see a friendly "API key not configured" message when you try to generate instead of a crash.

## 🏗️ Production Build

```bash
npm run build   # bundles the frontend (Vite) and backend (esbuild)
npm run start   # serves dist/ via the bundled Express server
```

## 🧪 Use Cases

- **Manual-to-automated QA translation** — paste bulleted manual test sheets and get ready-to-run `.spec.ts` / `.cy.js` files.
- **Rapid regression scaffolding** — describe a feature path and spin up smoke/regression suites in seconds.
- **TDD / BDD setup** — write criteria before implementing a feature to generate failing tests first.
- **Cross-framework migration** — translate existing Cypress routines into modern Playwright TypeScript.

## 🛠️ How to Use the Generated Tests

- **Playwright:** drop specs into your `tests/` folder and run `npx playwright test`.
- **Cypress:** drop specs into `cypress/e2e/` and run `npx cypress run`.

## 🔧 Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server with HMR on port 3000 |
| `npm run build` | Production build (frontend + backend) |
| `npm run start` | Run the production server |
| `npm run lint` | Type-check the codebase (`tsc --noEmit`) |

## 🧠 How It Works

1. You describe a user journey in the **Automation Requirements** panel (or load a preset).
2. The backend sends your criteria plus guideline options (POM structure, strict semantic locators, explicit viewport config) to Gemini with a strict system prompt.
3. Gemini returns a fully formed script plus an Architect's Notes report, validated against a JSON schema.
4. The result is rendered with syntax highlighting; use **Refactor** to iterate on it.

## 📁 Project Structure

```
├── server.ts              # Express backend + Gemini API integration
├── src/
│   ├── App.tsx            # Main app UI
│   ├── data/templates.ts  # Example test presets
│   ├── utils/highlighter.ts
│   └── types.ts
├── index.html
├── manifest.json          # PWA manifest
└── sw.js                  # Service worker (network-first for API, cache-first for static)
```

## 📄 License

MIT