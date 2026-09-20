import { Link } from "react-router-dom";
import { ArrowRight, Terminal, FileCode2, Plug } from "lucide-react";
import { Header, Footer } from "../components/Base";
import { RevealGroup } from "../components/RevealGroup";
import { usePageMeta } from "../lib/usePageMeta";

const RULES = [
  { t: "Framework-native imports", d: "Playwright TS starts from @playwright/test with typed blocks. Cypress uses describe/it with modern assertions." },
  { t: "Semantic locators first", d: "getByRole, getByLabel, getByPlaceholder, getByTestId before anything else. Enforce strict mode to ban class chains and XPaths." },
  { t: "Auto-wait, never sleep", d: "Wait for state via assertions and auto-waiting. Hardcoded timeouts are rejected unless genuinely unavoidable." },
  { t: "Fully formed output", d: "No stubs or 'implement here'. Every file is executable, with filenames that match suite conventions." },
];

const RUN_STEPS = [
  { icon: Terminal, title: "Playwright", cmd: "npx playwright install && npx playwright test", note: "Place .spec.ts / .spec.js files in tests/." },
  { icon: FileCode2, title: "Cypress", cmd: "npx cypress open", note: "Place .cy.js files in cypress/e2e/. Or run headless with npx cypress run." },
];

export default function DocsPage() {
  usePageMeta(
    "How It Works — Auton AI",
    "How Auton AI turns natural language into Playwright and Cypress scripts: describe, generate, refine, run. Hard rules, sample criteria, and running your generated tests.",
  );

  return (
    <div className="min-h-full">
      <Header />
      <main>
        <section className="pt-16 pb-10 md:pt-28 md:pb-14">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup className="max-w-3xl">
              <p className="reveal eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" /> How it works
              </p>
              <h1 className="reveal mt-5 font-display text-[2.6rem] leading-[1.05] md:text-6xl text-ink">
                Critieria in, <span className="italic text-brand">commit-ready spec out.</span>
              </h1>
              <p className="reveal mt-6 text-ink-soft text-lg leading-relaxed max-w-2xl">
                Four steps between your test plan and a green suite — including the rules Auton refuses to break.
              </p>
            </RevealGroup>
          </div>
        </section>

        {/* Steps */}
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { n: "1", t: "Describe", d: "Write the flow in plain English, or load a preset. Be as conversational as you like — 'log in as admin, go to reports, make sure the table loads'." },
                { n: "2", t: "Generate", d: "Pick Playwright or Cypress and your guidelines (POM, strict locators, viewport). Auton returns a full script plus an architect's report." },
                { n: "3", t: "Refine", d: "Type adjustments in natural language and the whole file updates — a new viewport, a mocked API error, a stricter assertion." },
                { n: "4", t: "Ship", d: "Copy or download the file into tests/ or cypress/e2e/, run it, commit. The diff stays small because the spec was right." },
              ].map((s) => (
                <RevealGroup key={s.n}>
                  <div className="reveal">
                    <p className="font-display text-4xl text-line">{s.n}</p>
                    <h2 className="mt-2 font-display text-xl text-ink">{s.t}</h2>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.d}</p>
                  </div>
                </RevealGroup>
              ))}
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="py-12 md:py-16 bg-surface border-y border-line">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup className="max-w-2xl">
              <p className="reveal eyebrow">The hard rules</p>
              <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-ink">
                Applied to every generation.
              </h2>
            </RevealGroup>
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {RULES.map((r) => (
                <RevealGroup key={r.t}>
                  <div className="reveal panel p-6 h-full">
                    <h3 className="font-semibold text-ink">{r.t}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{r.d}</p>
                  </div>
                </RevealGroup>
              ))}
            </div>
          </div>
        </section>

        {/* Example criteria */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <RevealGroup>
                <p className="reveal eyebrow">Sample criteria</p>
                <h2 className="reveal mt-3 font-display text-3xl text-ink">From paragraph to Playwright.</h2>
                <p className="reveal mt-4 text-ink-soft leading-relaxed">
                  This is the exact kind of criteria you paste in — and the shape of what comes back. The full flow is
                  live on the homepage if you want to see it happen.
                </p>
                <div className="reveal mt-6 panel p-5 bg-paper font-mono text-xs text-ink-soft leading-relaxed">
                  <p>Go to the SauceDemo login page.</p>
                  <p className="mt-1">Log in as <span className="text-[#047857]">standard_user</span> / <span className="text-[#047857]">secret_sauce</span>.</p>
                  <p className="mt-1">Sort inventory by Price (High → Low).</p>
                  <p className="mt-1">Add the top-priced product to the cart.</p>
                  <p className="mt-1">Go to cart, assert the product name, check out.</p>
                  <p className="mt-1">Fill name, ZIP, continue, finish.</p>
                  <p className="mt-1">Assert <span className="text-[#047857]">"Thank you for your order!"</span> is visible.</p>
                </div>
              </RevealGroup>
              <RevealGroup>
                <p className="reveal eyebrow">Running it</p>
                <h2 className="reveal mt-3 font-display text-3xl text-ink">Where the file lands.</h2>
                <div className="reveal mt-6 space-y-4">
                  {RUN_STEPS.map((r) => (
                    <div key={r.title} className="panel p-6">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center"><r.icon size={18} /></span>
                        <h3 className="font-display text-lg text-ink">{r.title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-ink-soft">{r.note}</p>
                      <pre className="mt-3 bg-paper border border-line rounded-xl px-4 py-3 text-xs font-mono text-ink overflow-x-auto"><code>{r.cmd}</code></pre>
                    </div>
                  ))}
                  <div className="panel bg-brand text-white p-6 flex items-start gap-3">
                    <Plug size={18} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-white/85 leading-relaxed">
                      Mocking, intercepts and custom viewports are expressed in plain English during refine — Auton
                      converts them into the framework's native intercept/route APIs.
                    </p>
                  </div>
                </div>
              </RevealGroup>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <div className="reveal panel bg-brand text-white rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-white">Try the workflow now.</h2>
                  <p className="mt-2 text-white/75 leading-relaxed">Free, no sign-up, on the homepage.</p>
                </div>
                <Link to="/#generator" className="btn-primary bg-white text-brand hover:bg-accent-soft shrink-0">
                  Generate a script <ArrowRight size={16} />
                </Link>
              </div>
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}