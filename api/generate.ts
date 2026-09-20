const GEMINI_MODEL = "gemini-2.5-flash";

function getApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") return null;
  return key;
}

const SYSTEM_PROMPT = `You are "Auton AI", an expert QA Automation Engineer and Senior Software Developer.
Your sole task is to convert natural language test criteria, user stories, or manual test steps into production-ready, robust, and clean automation scripts using Playwright or Cypress.

Follow these strict best practices:
1. Framework-Specific Syntax:
   - For Playwright TypeScript (playwright-ts): Use 'import { test, expect } from "@playwright/test";'. Organize scripts using test.describe() and test() blocks. Use proper TypeScript types.
   - For Playwright JavaScript (playwright-js): Same as above but in standard JavaScript.
   - For Cypress (cypress): Use standard Cypress syntax, e.g., 'describe()' and 'it()', 'cy.visit()', and modern assertions.
2. Robust Selector Strategy:
   - Always prioritize modern user-facing semantic locators:
     * In Playwright: page.getByRole(), page.getByText(), page.getByLabel(), page.getByPlaceholder(), page.getByTestId().
     * In Cypress: cy.findByRole(), cy.findByPlaceholderText(), cy.findByLabelText(), or standard robust selectors.
   - Avoid brittle XPaths or deeply nested CSS class chains (e.g., 'div.header > ul > li > a').
3. Wait Mechanisms:
   - Rely on auto-waiting as much as possible.
   - Never use hardcoded sleeps like 'page.waitForTimeout(5000)' or 'cy.wait(5000)' unless absolutely necessary.
4. Completeness:
   - Provide fully formed, executable test scripts. No dummy placeholders. All steps fully coded.
5. Structure:
   - If Page Object Model (POM) is requested, structure the response with the Page Class definition first followed by the tests.

Respond ONLY with a JSON object conforming to the schema and nothing else.`;

const SCHEMA = {
  type: "OBJECT",
  properties: {
    filename: { type: "STRING", description: "A valid, descriptive filename for the generated test file (e.g., auth.spec.ts or checkout.cy.js)." },
    code: { type: "STRING", description: "The complete, fully formed, production-ready, and formatted automation test code." },
    notes: { type: "STRING", description: "An 'Architect's Notes' section formatted in clean Markdown. Explain assumptions, chosen selectors, wait strategies, and best practices." },
  },
  required: ["filename", "code", "notes"],
};

async function callGemini(prompt: string) {
  const apiKey = getApiKey();
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { responseMimeType: "application/json", responseSchema: SCHEMA },
      }),
    }
  );
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Model request failed (${res.status}): ${errText.slice(0, 300)}`);
  }
  const data: any = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No response generated from the model.");
  return JSON.parse(text.trim());
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.statusCode = 200; res.end("ok"); return; }
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed. Use POST." }));
    return;
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  const criteria = body.criteria;
  if (!criteria || typeof criteria !== "string" || !criteria.trim()) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Test criteria is required." }));
    return;
  }
  if (!getApiKey()) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Model key is not configured on this deployment." }));
    return;
  }

  const framework = body.framework || "playwright-ts";
  const options = body.options || {};

  const prompt = [
    `Convert the following test criteria into a ${framework} automation script.`,
    "",
    "Test Criteria:",
    criteria,
    "",
    "Options:",
    `- Page Object Model (POM): ${options.pom ? "Yes, structure using POM" : "No, standard inline test script"}`,
    `- Robust Locator Priority: ${options.robustSelectors ? "Yes, strictly prioritize getByRole, getByLabel, etc." : "Standard selector practices"}`,
    `- Viewport Config: ${options.includeViewport ? "Yes, configure viewport sizing" : "No special viewport config"}`,
    "",
    "Generate the fully-formed script conforming to the Auton AI standards.",
  ].join("\n");

  try {
    const result = await callGemini(prompt);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } catch (error: any) {
    console.error("Generation error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: error.message || "An unexpected error occurred during generation." }));
  }
}