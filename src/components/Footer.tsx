import { Link } from "react-router-dom";
import { Mail, Github, FileCode2 } from "lucide-react";
import { BrandMark } from "./Header";

const COLS = [
  {
    title: "Product",
    links: [
      { to: "/#generator", label: "Script generator" },
      { to: "/features", label: "Features" },
      { to: "/docs", label: "How it works" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/contact", label: "Contact" },
      { to: "/privacy", label: "Privacy policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark size={36} />
            <span className="font-display text-xl text-white">Auton AI</span>
          </div>
          <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
            Turn plain-English test criteria into production-ready Playwright and Cypress scripts — then refine them
            until they're exactly yours.
          </p>
          <p className="mt-4 text-xs font-mono text-white/40">Built for teams that ship fast and test for real.</p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Get in touch</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href="mailto:hello@auton-ai.com" className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-2">
                <Mail size={14} /> hello@auton-ai.com
              </a>
            </li>
            <li className="text-sm text-white/60 inline-flex items-center gap-2">
              <FileCode2 size={14} /> Playwright 1.4x · Cypress 13 · TS/JS
            </li>
          </ul>
          <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-white/60 leading-relaxed">
              Try it now — the generator is free, no sign-up, run it straight from the homepage.
            </p>
            <Link to="/#generator" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-soft">
              Open generator →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© 2026 Auton AI. All rights reserved.</p>
          <p className="text-xs font-mono text-white/40">no flaky selectors · no hardcoded sleeps · no wrapper agents</p>
        </div>
      </div>
    </footer>
  );
}