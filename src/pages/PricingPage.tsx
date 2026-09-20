import { Link } from "react-router-dom";
import { ArrowRight, Check, Star } from "lucide-react";
import { Header, Footer } from "../components/Base";
import { RevealGroup } from "../components/RevealGroup";
import { usePageMeta } from "../lib/usePageMeta";

const PLANS = [
  {
    name: "Free",
    monthly: "$0",
    blurb: "For trying the workflow and light personal use.",
    cta: "Open the generator",
    to: "/#generator",
    features: [
      "Unlimited script generation",
      "Playwright & Cypress output",
      "All presets & frameworks",
      "Refine loop",
      "Copy & download",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    monthly: "$29",
    blurb: "For individual engineers who ship suites daily.",
    cta: "Start 14-day trial",
    to: "/contact",
    features: [
      "Everything in Free",
      "Priority generation queues",
      "Team presets & style rules",
      "Export suites as projects",
      "Session history sync",
      "Email support",
    ],
    highlight: true,
  },
  {
    name: "Team",
    monthly: "$99",
    blurb: "For QA teams standardising on one pattern.",
    cta: "Talk to us",
    to: "/contact",
    features: [
      "Everything in Pro",
      "Up to 10 seats",
      "Shared selectors & rules library",
      "SSO & audit logs",
      "Priority support + onboarding",
      "Custom model keys (bring your own)",
    ],
    highlight: false,
  },
];

const COMPARE = [
  { f: "Script generation", v: ["✓", "✓", "✓"] },
  { f: "Playwright & Cypress", v: ["✓", "✓", "✓"] },
  { f: "Refine loop", v: ["✓", "✓", "✓"] },
  { f: "Team style rules", v: ["—", "✓", "✓"] },
  { f: "Session history sync", v: ["—", "✓", "✓"] },
  { f: "Seats", v: ["1", "1", "Up to 10"] },
  { f: "Bring your own model key", v: ["—", "—", "✓"] },
  { f: "Audit logs & SSO", v: ["—", "—", "✓"] },
];

export default function PricingPage() {
  usePageMeta(
    "Pricing — Auton AI",
    "Auton AI pricing: Free for individuals, Pro at $29/mo, Team at $99/mo. Transparent plans, quarterly option, no lock-in. Every plan includes the full generator.",
  );

  return (
    <div className="min-h-full">
      <Header />
      <main>
        <section className="pt-16 pb-10 md:pt-28 md:pb-14">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup className="max-w-3xl">
              <p className="reveal eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" /> Pricing
              </p>
              <h1 className="reveal mt-5 font-display text-[2.6rem] leading-[1.05] md:text-6xl text-ink">
                Pay for the <span className="italic text-brand">right size</span> of workflow.
              </h1>
              <p className="reveal mt-6 text-ink-soft text-lg leading-relaxed max-w-2xl">
                The generator is free — start there. Paid plans add consistency and control for engineers and teams
                who've made Auton a daily tool. No lock-in, cancel anytime.
              </p>
            </RevealGroup>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid md:grid-cols-3 gap-5">
              {PLANS.map((p) => (
                <RevealGroup key={p.name}>
                  <div className={`reveal panel p-7 h-full flex flex-col ${p.highlight ? "border-brand ring-1 ring-brand/20 bg-paper" : ""}`}>
                    {p.highlight && (
                      <span className="self-start inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-widest text-white bg-brand rounded-full px-3 py-1">
                        <Star size={11} fill="currentColor" /> Most popular
                      </span>
                    )}
                    <h2 className="mt-3 font-display text-2xl text-ink">{p.name}</h2>
                    <p className="mt-1 flex items-baseline gap-1">
                      <span className="font-display text-4xl text-ink">{p.monthly}</span>
                      <span className="text-xs text-muted">/month</span>
                    </p>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{p.blurb}</p>
                    <ul className="mt-5 space-y-2.5 flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <Check size={15} className="mt-0.5 text-brand shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={p.to} className={`${p.highlight ? "btn-primary" : "btn-ghost"} mt-6 w-full`}>
                      {p.cta} <ArrowRight size={15} />
                    </Link>
                  </div>
                </RevealGroup>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-surface border-y border-line">
          <div className="mx-auto max-w-4xl px-5">
            <RevealGroup>
              <p className="reveal eyebrow text-center">Compare</p>
              <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-ink text-center">Plan details.</h2>
            </RevealGroup>
            <RevealGroup>
              <div className="reveal mt-8 panel overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th className="px-5 py-4 text-muted font-semibold">Feature</th>
                      <th className="px-5 py-4 text-center font-semibold text-ink">Free</th>
                      <th className="px-5 py-4 text-center font-semibold text-brand">Pro</th>
                      <th className="px-5 py-4 text-center font-semibold text-ink">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map((row) => (
                      <tr key={row.f} className="border-b border-line/70 last:border-0">
                        <td className="px-5 py-3 text-ink-soft font-medium">{row.f}</td>
                        {row.v.map((cell, i) => (
                          <td key={i} className="px-5 py-3 text-center">{cell === "✓" ? <Check size={16} className="mx-auto text-brand" /> : <span className="text-muted text-sm">{cell}</span>}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RevealGroup>
            <p className="mt-6 text-center text-xs text-muted">
              Prices in USD. Team plan billed annually; monthly billing available on request. Education discounts for
              teams under 20.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-5">
            <RevealGroup>
              <p className="reveal eyebrow text-center">Fair questions</p>
              <h2 className="reveal mt-3 font-display text-3xl text-ink text-center">Before you sign up.</h2>
            </RevealGroup>
            <div className="mt-8 space-y-3">
              {[
                { q: "Is the free plan really unlimited?", a: "Yes — no caps on generations or refinitions. Free exists to get the tool into every engineer's workflow; Pro adds team-level control, not more output." },
                { q: "Can I bring my own Gemini key?", a: "Team plan supports bring-your-own model keys so generation uses your own infrastructure and billing." },
                { q: "Do you store my test code?", a: "Generated scripts are held for your current session only. Pro and Team sync history for convenience; export anything, anytime. Nothing is used for training." },
                { q: "What does cancel look like?", a: "Cancel in one click, keep access until the end of the period. There's also a quarterly option on Pro." },
              ].map((f) => (
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

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <div className="reveal panel bg-brand text-white rounded-2xl p-8 md:p-12 text-center">
                <h2 className="font-display text-2xl md:text-4xl text-white">Start free, upgrade when the team agrees.</h2>
                <p className="mt-3 text-white/75 leading-relaxed max-w-xl mx-auto">
                  Open the generator on the homepage. If it becomes part of your daily workflow, that's the moment to
                  talk plans.
                </p>
                <Link to="/#generator" className="btn-primary bg-white text-brand hover:bg-accent-soft mt-6 !px-6">
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