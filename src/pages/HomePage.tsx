import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, GitBranch, Wand2, Copy as CopyIcon, TerminalSquare, CheckCircle2 } from "lucide-react";
import { Header, Footer } from "../components/Base";
import { RevealGroup } from "../components/RevealGroup";
import Generator from "../components/Generator";
import { usePageMeta } from "../lib/usePageMeta";

const FEATURES = [
  { icon: ShieldCheck, title: "Strict semantic selectors", text: "getByRole, getByLabel, getByTestId — never brittle class chains or nested XPaths that break on a CSS change." },
  { icon: Zap, title: "Auto-waiting, no sleeps", text: "State-based waits and built-in assertions. No page.waitForTimeout(5000) anywhere in your suite." },
  { icon: GitBranch, title: "Playwright & Cypress", text: "Full TypeScript and JavaScript output for both frameworks, with framework-native syntax from line one." },
  { icon: Wand2, title: "Refine in place", text: "Ask for a custom viewport, a mocked 403, an extra assertion — the whole script updates, not just a snippet." },
  { icon: CheckCircle2, title: "Completeness first", text: "Fully executable scripts. No 'implement here' placeholders, no half-written helpers to finish yourself." },
  { icon: CopyIcon, title: "Copy or download", text: "Grab the exact file and drop it in tests/ or cypress/e2e/. Filenames match the suite conventions." },
];

const STEPS = [
  { n: "01", title: "Describe the test", text: "Plain English — login flow, filters, cart steps, mobile viewports. Load a preset for a head start." },
  { n: "02", title: "Generate the spec", text: "Pick Playwright or Cypress, choose your guidelines, and get a production-ready script with selectors and waits." },
  { n: "03", text: "New viewport, mocked API, stricter locator — type it and refactor. Then copy or download and commit.", title: "Refine & ship" },
];

const FAQS = [
  { q: "What exactly does Auton generate?", a: "A complete, formatted Playwright or Cypress automation file from your natural language criteria — covering navigation, actions, assertions and best-practice waits, with an architect's report explaining the choices." },
  { q: "Do I need a Gemini API key to use it?", a: "The generator runs on the site's server-side Gemini integration. If the team behind the deployment has configured the key, generation and refactoring work straight from the page — no account needed." },
  { q: "Can it handle the Page Object Model?", a: "Yes. Turn on the Page Object Model guideline and Auton structures the output into page classes with clean separation between actions and element declarations." },
  { q: "Is the output really executable?", a: "Yes. Files land in your tests/ folder and run with npx playwright test, or cypress/e2e/ for Cypress. No stubs — if a step can't be resolved, Auton flags it and lets you refine." },
  { q: "What if my criteria are vague?", a: "Auton makes reasonable assumptions and lists them in the architect's notes. Ask for changes in plain English and the whole script updates coherently." },
];

export default function HomePage() {
  usePageMeta(
    "Auton AI — Test Automation, Written From Plain English",
    "Turn natural-language test criteria into production-ready Playwright and Cypress scripts, then refine them in place. Describe the test, generate the spec, ship it.",
  );

  return (
    <div className="min-h-full">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-brand-soft opacity-70 blur-3xl" />
          <div className="absolute top-40 -left-24 w-[420px] h-[420px] rounded-full bg-accent-soft opacity-60 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 md:pt-24 md:pb-16">
          <RevealGroup className="max-w-3xl">
            <p className="reveal eyebrow flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent" /> AI-assisted QA automation
            </p>
            <h1 className="reveal mt-5 font-display text-[2.75rem] leading-[1.02] md:text-7xl text-ink">
              Describe the test.
              <br /> <span className="italic text-brand">We write the spec.</span>
            </h1>
            <p className="reveal mt-6 text-ink-soft text-lg leading-relaxed max-w-2xl">
              Auton converts plain-English test criteria into production-ready <strong className="text-ink">Playwright</strong> and{" "}
              <strong className="text-ink">Cypress</strong> scripts — strict semantic locators, auto-waiting, complete
              and executable. Then refine the whole file in place.
            </p>
            <div className="reveal mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/#generator" className="btn-primary">
                Generate a script <ArrowRight size={16} />
              </Link>
              <Link to="/docs" className="btn-ghost">
                How it works
              </Link>
            </div>
            <div className="reveal mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-muted">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand" /> Playwright TS/JS</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand" /> Cypress</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand" /> POM support</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand" /> No hardcoded sleeps</span>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Tool */}
      <section id="generator" className="py-10 md:py-14 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5">
          <RevealGroup className="max-w-2xl">
            <p className="reveal eyebrow">The generator</p>
            <h2 className="reveal mt-3 font-display text-3xl md:text-5xl text-ink">Run it right here.</h2>
            <p className="reveal mt-4 text-ink-soft text-lg leading-relaxed">
              Load a preset or describe your own flow. Generate, inspect the notes, then refactor until it's exactly
              your suite.
            </p>
          </RevealGroup>
          <RevealGroup>
            <div className="reveal mt-8">
              <Generator />
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Rules band */}
      <section className="py-14 md:py-20 bg-brand text-white">
        <div className="mx-auto max-w-4xl px-5">
          <RevealGroup>
            <p className="reveal eyebrow eyebrow-light text-center">Hard rules, enforced</p>
            <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-white text-center">
              Three rules make Auton tests worth committing.
            </h2>
            <div className="reveal mt-10 grid md:grid-cols-3 gap-5 text-center">
              {[
                { t: "Semantic locators only", d: "User-facing selectors that survive CSS changes — not nested class chains." },
                { t: "Auto-wait by default", d: "Assertions and state waits. No arbitrary timeout sleeps, ever." },
                { t: "Never half-done", d: "Every output is a fully formed, executable file. No 'implement here'." },
              ].map((r) => (
                <div key={r.t} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="mx-auto w-8 h-px bg-accent mb-4" />
                  <h3 className="font-semibold">{r.t}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{r.d}</p>
                </div>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <RevealGroup className="max-w-2xl">
            <p className="reveal eyebrow">Workflow</p>
            <h2 className="reveal mt-3 font-display text-3xl md:text-5xl text-ink">
              From a sentence to a suite.
            </h2>
          </RevealGroup>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <RevealGroup key={s.n}>
                <div className="reveal panel p-6 h-full">
                  <p className="font-display text-4xl text-line">{s.n}</p>
                  <h3 className="mt-3 font-display text-xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.text}</p>
                </div>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 md:py-20 bg-surface border-y border-line">
        <div className="mx-auto max-w-6xl px-5">
          <RevealGroup className="max-w-2xl">
            <p className="reveal eyebrow">Why Auton</p>
            <h2 className="reveal mt-3 font-display text-3xl md:text-5xl text-ink">
              Built for suites that stay green.
            </h2>
            <p className="reveal mt-4 text-ink-soft text-lg leading-relaxed">
              The goal isn't more tests on the screen — it's tests that still pass next sprint.
            </p>
          </RevealGroup>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <RevealGroup key={f.title}>
                <div className="reveal panel p-6 h-full">
                  <span className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
                    <f.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.text}</p>
                </div>
              </RevealGroup>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/features" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-strong">
              Explore every feature <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <RevealGroup>
            <p className="reveal eyebrow text-center">Worth repeating</p>
            <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-ink text-center">
              What automation engineers say.
            </h2>
          </RevealGroup>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { q: "Our old suite died on every CSS release. Auton's semantic locators meant hand-writes became the exception, not the rule.", n: "Lead QA Engineer", c: "Fintech platform" },
              { q: "I described a 40-step checkout in a paragraph and got a script that imported clean and ran green on the first try.", n: "SDET", c: "E-commerce team" },
              { q: "The refine loop is the killer feature. 'Mock a 403 on checkout' updated the whole spec — not a manual diff.", n: "Engineering Manager", c: "SaaS company" },
            ].map((t) => (
              <RevealGroup key={t.n}>
                <figure className="reveal panel p-6 h-full flex flex-col">
                  <div className="flex gap-1 text-accent" aria-hidden="true">{"★★★★★".split("").map((s, i) => <span key={i} className="text-sm">{s}</span>)}</div>
                  <blockquote className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">"{t.q}"</blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <p className="text-sm font-bold text-ink">{t.n}</p>
                    <p className="text-xs text-muted">{t.c}</p>
                  </figcaption>
                </figure>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-surface border-y border-line">
        <div className="mx-auto max-w-3xl px-5">
          <RevealGroup>
            <p className="reveal eyebrow text-center">Questions</p>
            <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-ink text-center">Straight answers.</h2>
          </RevealGroup>
          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <RevealGroup key={f.q}>
                <details className="reveal panel overflow-hidden group">
                  <summary className="px-5 py-4 font-semibold text-ink cursor-pointer list-none flex items-center justify-between">
                    {f.q}
                    <span className="text-brand group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm text-ink-soft leading-relaxed">{f.a}</p>
                </details>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <RevealGroup>
            <div className="reveal panel bg-brand text-white rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <span className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 text-accent items-center justify-center shrink-0"><TerminalSquare size={28} /></span>
                <div>
                  <p className="eyebrow eyebrow-light">Try it now</p>
                  <h2 className="mt-2 font-display text-2xl md:text-4xl text-white">
                    Write your first spec in the next two minutes.
                  </h2>
                  <p className="mt-3 text-white/75 leading-relaxed max-w-xl">
                    No sign-up, no install. Open the generator, load a preset, and see what "production-ready" means
                    around here.
                  </p>
                </div>
              </div>
              <Link to="/#generator" className="btn-primary bg-white text-brand hover:bg-accent-soft shrink-0 !px-6">
                Open the generator <ArrowRight size={16} />
              </Link>
            </div>
          </RevealGroup>
        </div>
      </section>

      <Footer />
    </div>
  );
}