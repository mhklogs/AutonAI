import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, GitBranch, Wand2, Copy as CopyIcon, CheckCircle2, Layers, Eye } from "lucide-react";
import { Header, Footer } from "../components/Base";
import { RevealGroup } from "../components/RevealGroup";
import { usePageMeta } from "../lib/usePageMeta";

const DETAILS = [
  {
    icon: ShieldCheck,
    tag: "Selectors",
    title: "Locators that survive refactors",
    text: "Auton writes getByRole, getByLabel, getByPlaceholder and getByTestId — user-facing semantic locators that stay meaningful when a designer renames a class. You can enforce strict mode so class-name and XPath selectors never sneak in.",
  },
  {
    icon: Zap,
    tag: "Waits",
    title: "State-based waiting, zero sleeps",
    text: "Auto-waiting and assertion waits replace setTimeout guesses. Pages that load fast or slow both pass — the suite stops being flaky-by-timing.",
  },
  {
    icon: GitBranch,
    tag: "Framework-native",
    title: "Playwright or Cypress, TS or JS",
    text: "Output matches the target framework's idioms — describe/test blocks, modern assertions, correct imports. TypeScript gets full types; JavaScript stays clean standard syntax.",
  },
  {
    icon: Layers,
    tag: "Structure",
    title: "Page Object Model when you want it",
    text: "Flip on POM and output separates page classes from test files, with element declarations and actions cleanly scoped. Consistent with how senior teams lay out their suites.",
  },
  {
    icon: Wand2,
    tag: "Refinement",
    title: "Refine the whole file, in place",
    text: "Type a change — 'use a 1440px viewport', 'mock the payments API to return a 403', 'add a negative-case assertion' — and the entire script updates coherently, not a patch-diff.",
  },
  {
    icon: Eye,
    tag: "Transparency",
    title: "Architect's notes on every run",
    text: "Every generation ships with a plain-English report: the assumptions made, the selectors chosen, the wait strategy and the best-practice calls. Review once, then trust the diff is small.",
  },
  {
    icon: CopyIcon,
    tag: "Handoff",
    title: "Copy or download, commit-ready",
    text: "Correct filenames (auth.spec.ts, checkout.cy.js), copy-to-clipboard and one-click download. Files drop straight into tests/ or cypress/e2e/ and run.",
  },
  {
    icon: CheckCircle2,
    tag: "Completeness",
    title: "No 'implement here', ever",
    text: "Requires fully formed, executable scripts. If a step can't be resolved from your criteria, Auton flags it in the notes and via refactor asks until it's resolved.",
  },
];

const BENEFITS = [
  "Less time writing boilerplate, more time on edge cases",
  "One consistent selector & waiting strategy across the suite",
  "Onboard juniors to senior-grade patterns faster",
  "Reviewable, auditable output — by design, not by accident",
];

export default function FeaturesPage() {
  usePageMeta(
    "Features — Auton AI",
    "Every Auton AI feature: semantic selectors, state-based waits, Playwright/Cypress output, Page Object Model, in-place refactoring, architect's notes, and copy-ready handoff.",
  );

  return (
    <div className="min-h-full">
      <Header />
      <main>
        <section className="pt-16 pb-10 md:pt-28 md:pb-14">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup className="max-w-3xl">
              <p className="reveal eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" /> Features
              </p>
              <h1 className="reveal mt-5 font-display text-[2.6rem] leading-[1.05] md:text-6xl text-ink">
                Everything a well-behaved suite <span className="italic text-brand">already does.</span>
              </h1>
              <p className="reveal mt-6 text-ink-soft text-lg leading-relaxed max-w-2xl">
                Auton builds in the habits your best engineers would have written by hand — so the difference between
                AI output and good output stops being a question.
              </p>
            </RevealGroup>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {DETAILS.map((f) => (
                <RevealGroup key={f.title}>
                  <div className="reveal panel p-6 md:p-7 h-full">
                    <div className="flex items-center gap-3">
                      <span className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
                        <f.icon size={20} />
                      </span>
                      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{f.tag}</span>
                    </div>
                    <h2 className="mt-4 font-display text-xl text-ink">{f.title}</h2>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.text}</p>
                  </div>
                </RevealGroup>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-brand text-white">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
                <div>
                  <p className="eyebrow eyebrow-light">Why teams adopt it</p>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl text-white">
                    Where QA time should actually go.
                  </h2>
                  <p className="mt-4 text-white/75 leading-relaxed">
                    Auton changes where QA time goes — away from scaffolding and toward the edge cases only a human
                    thinks to check.
                  </p>
                </div>
                <ul className="grid gap-3">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-white/85 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                      <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealGroup>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <div className="reveal panel bg-surface rounded-2xl p-8 md:p-12 text-center border-line">
                <h2 className="font-display text-2xl md:text-4xl text-ink">See it run on the homepage.</h2>
                <p className="mt-3 text-ink-soft leading-relaxed max-w-xl mx-auto">
                  The full generator is live, free, and needs no account. Load a preset and watch the spec land.
                </p>
                <Link to="/#generator" className="btn-primary mt-6">
                  Open the generator <ArrowRight size={16} />
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