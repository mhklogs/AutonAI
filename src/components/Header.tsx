import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="120" fill="#2B4E6F" />
      <path d="M150 348 L256 164 L362 348" fill="none" stroke="#F4A93C" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="188" y1="296" x2="324" y2="296" stroke="#FBF8F3" strokeWidth="22" strokeLinecap="round" />
    </svg>
  );
}

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/docs", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="leading-none">
            <span className="font-display text-lg tracking-tight text-ink">Auton AI</span>
            <span className="block text-[10px] font-mono text-muted mt-1 tracking-wide">
              plain english → shipped tests
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/#generator" className="btn-primary !py-2.5 !px-4 text-sm">
            Open the generator <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border border-line text-ink-soft"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-surface px-5 py-4 flex flex-col gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-semibold ${isActive ? "bg-brand-soft text-brand" : "text-ink-soft hover:bg-surface"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/#generator" onClick={() => setOpen(false)} className="btn-primary mt-3 !py-3 text-sm">
            Open the generator <ArrowRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
}