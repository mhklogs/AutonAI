import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Header, Footer } from "../components/Base";
import { RevealGroup } from "../components/RevealGroup";
import { usePageMeta } from "../lib/usePageMeta";

const TEAM = [
  { photo: "/images/1560250097-0b93528c311a.jpg", name: "Elena Marsh", role: "Co-founder · Product" },
  { photo: "/images/1573496359142-b8d87734a5a2.jpg", name: "Daniel Okafor", role: "Co-founder · Engineering" },
  { photo: "/images/1507003211169-0a1dd7228f2d.jpg", name: "Priya Raman", role: "QA Practice Lead" },
  { photo: "/images/1547425260-76bcadfb4f2c.jpg", name: "Marcus Field", role: "Head of Platform" },
];

const VALUES = [
  { t: "Tests should survive refactors", d: "We build for the next CSS release, not today's DOM. Semantic locators aren't a preference here — they're the point." },
  { t: "Output is a contract", d: "If a script isn't executable, it isn't finished. Our generation enforces completeness because partial code wastes a reviewer's hour." },
  { t: "Explain everything", d: "Software you can't audit is a liability. Every script ships with notes on the choices made, so reviews take minutes." },
  { t: "Welcome the edge case", d: "The whole product sharpens when someone asks to mock a 403 or lock a viewport. Those asks become defaults." },
];

export default function AboutPage() {
  usePageMeta(
    "About — Auton AI",
    "Auton AI builds AI-assisted QA automation for resilient test suites. Meet the team behind natural-language Playwright and Cypress generation.",
  );

  return (
    <div className="min-h-full">
      <Header />
      <main>
        <section className="pt-16 pb-10 md:pt-28 md:pb-16">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup className="max-w-3xl">
              <p className="reveal eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" /> About
              </p>
              <h1 className="reveal mt-5 font-display text-[2.6rem] leading-[1.05] md:text-6xl text-ink">
                A tool for QA engineers, <span className="italic text-brand">built by them.</span>
              </h1>
              <p className="reveal mt-6 text-ink-soft text-lg leading-relaxed max-w-2xl">
                Auton exists because most AI test generation fails the one test that matters: the suite stays green
                after a real-life refactor. We started from that failure and worked backwards.
              </p>
            </RevealGroup>
          </div>
        </section>

        <section className="py-10 md:py-16 bg-surface border-y border-line">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <RevealGroup>
                <img src="/images/collab.jpg" alt="The Auton team at work" loading="lazy" className="reveal rounded-2xl border border-line object-cover aspect-[4/3] w-full" />
              </RevealGroup>
              <RevealGroup>
                <p className="reveal eyebrow">The story</p>
                <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-ink">From flaky to foundational.</h2>
                <p className="reveal mt-5 text-ink-soft leading-[1.8]">
                  A typical e-commerce suite used to shed 40% of its tests every time a design system shipped. Rewriting
                  selectors by hand wasn't automation — it was janitorial work. We wanted generation that produced the
                  kind of tests we'd write ourselves: user-facing locators, state-based waits, complete files.
                </p>
                <p className="reveal mt-4 text-ink-soft leading-[1.8]">
                  Auton is the result. The generator encodes the rules senior engineers enforce in code review, and the
                  refine loop keeps a human in charge of every decision. Teams use it to onboard new engineers to
                  senior-grade patterns from day one.
                </p>
              </RevealGroup>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup className="max-w-2xl">
              <p className="reveal eyebrow">What we believe</p>
              <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-ink">Principles we don't trade.</h2>
            </RevealGroup>
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {VALUES.map((v, i) => (
                <RevealGroup key={v.t}>
                  <div className="reveal panel p-6 h-full">
                    <p className="font-display text-4xl text-line">{i + 1}</p>
                    <h3 className="mt-3 font-display text-xl text-ink">{v.t}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{v.d}</p>
                  </div>
                </RevealGroup>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-surface border-y border-line">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <p className="reveal eyebrow text-center">The people</p>
              <h2 className="reveal mt-3 font-display text-3xl md:text-4xl text-ink text-center">
                Small team, sharp edges.
              </h2>
            </RevealGroup>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((m) => (
                <RevealGroup key={m.name}>
                  <div className="reveal panel overflow-hidden h-full">
                    <img src={m.photo} alt={m.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <div className="p-5">
                      <h3 className="font-semibold text-ink">{m.name}</h3>
                      <p className="text-xs text-muted mt-0.5">{m.role}</p>
                    </div>
                  </div>
                </RevealGroup>
              ))}
            </div>
            <RevealGroup>
              <div className="reveal mt-8 panel bg-brand text-white rounded-2xl p-8">
                <Quote size={26} className="text-accent" />
                <blockquote className="mt-4 font-display text-xl md:text-2xl leading-[1.35] max-w-3xl">
                  "We don't think AI should write tests the way a junior would. We think it should write them the way
                  the suite has to behave next quarter."
                </blockquote>
                <p className="mt-4 text-sm text-white/70">Elena Marsh — Co-founder, Auton AI</p>
              </div>
            </RevealGroup>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <div className="reveal panel bg-brand text-white rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl text-white">See the product we're proud of.</h2>
                  <p className="mt-2 text-white/75 leading-relaxed">The generator is live, free and needs no account.</p>
                </div>
                <Link to="/#generator" className="btn-primary bg-white text-brand hover:bg-accent-soft shrink-0">
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