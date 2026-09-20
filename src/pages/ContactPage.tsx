import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, CheckCircle2, Loader2, MapPin } from "lucide-react";
import { Header, Footer } from "../components/Base";
import { RevealGroup } from "../components/RevealGroup";
import { usePageMeta } from "../lib/usePageMeta";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@auton-ai.com", note: "Answers within two business days." },
  { icon: MessageCircle, label: "Sales & onboarding", value: "sales@auton-ai.com", note: "For Team plan and BYO-key setup." },
  { icon: MapPin, label: "Base", value: "Remote-first · UK & USA", note: "We work across US/EU timezones." },
];

const FAQS = [
  { q: "Do you offer a paid pilot?", a: "Yes — Team plans start with a guided 14-day pilot, including style-rule setup and a review of your first generated suite." },
  { q: "Can the generator work with my internal frameworks?", a: "Absolutely. Team plan includes shared presets, custom rules and bring-your-own model keys so output matches your stack." },
  { q: "How do you handle security reviews?", a: "Generated scripts are retained per-session only on Free; Pro and Team can export everything. We're happy to complete a security questionnaire during evaluation." },
];

export default function ContactPage() {
  usePageMeta(
    "Contact — Auton AI",
    "Contact the Auton AI team for support, sales or onboarding. Email hello@auton-ai.com or use the form — answers within two business days.",
  );

  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || `Status ${res.status}`);
      }
      setStatus("done");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err: any) {
      setStatus("idle");
      setError(err.message || "Something went wrong. Try emailing us directly.");
    }
  };

  return (
    <div className="min-h-full">
      <Header />
      <main>
        <section className="pt-16 pb-10 md:pt-28 md:pb-14">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup className="max-w-3xl">
              <p className="reveal eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" /> Contact
              </p>
              <h1 className="reveal mt-5 font-display text-[2.6rem] leading-[1.05] md:text-6xl text-ink">
                Talk to the people <span className="italic text-brand">who build this.</span>
              </h1>
              <p className="reveal mt-6 text-ink-soft text-lg leading-relaxed max-w-2xl">
                Questions, team onboarding, or a sharp edge case we should encode as a rule — we read everything.
              </p>
            </RevealGroup>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-5 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
            <RevealGroup>
              <div className="reveal space-y-4">
                {CHANNELS.map((c) => (
                  <div key={c.label} className="panel p-6 flex items-start gap-4">
                    <span className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
                      <c.icon size={20} />
                    </span>
                    <div>
                      <h2 className="font-semibold text-ink">{c.label}</h2>
                      <p className="text-sm text-brand font-medium">{c.value}</p>
                      <p className="text-xs text-muted mt-1">{c.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealGroup>

            <RevealGroup>
              <div className="reveal panel p-6 md:p-8">
                {status === "done" ? (
                  <div className="py-10 text-center">
                    <CheckCircle2 size={40} className="mx-auto text-brand" />
                    <h2 className="mt-4 font-display text-2xl text-ink">Message received.</h2>
                    <p className="mt-2 text-sm text-ink-soft">We'll reply within two business days.</p>
                    <button onClick={() => setStatus("idle")} className="btn-ghost mt-6">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                        Name
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="mt-1 bg-paper border border-line rounded-xl px-4 py-3 text-sm text-ink font-sans font-normal normal-case tracking-normal focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" />
                      </label>
                      <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                        Work email
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="mt-1 bg-paper border border-line rounded-xl px-4 py-3 text-sm text-ink font-sans font-normal normal-case tracking-normal focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" />
                      </label>
                    </div>
                    <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                      Company <span className="font-normal text-muted/70 lower-case">(optional)</span>
                      <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="mt-1 bg-paper border border-line rounded-xl px-4 py-3 text-sm text-ink font-sans font-normal normal-case tracking-normal focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                      How can we help?
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="mt-1 bg-paper border border-line rounded-xl px-4 py-3 text-sm text-ink font-sans font-normal normal-case tracking-normal focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" />
                    </label>
                    {error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
                    <button type="submit" disabled={status === "sending"}
                      className="btn-primary disabled:opacity-60 disabled:pointer-events-none">
                      {status === "sending" ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : "Send message"}
                    </button>
                  </form>
                )}
              </div>
            </RevealGroup>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-surface border-y border-line">
          <div className="mx-auto max-w-3xl px-5">
            <RevealGroup>
              <p className="reveal eyebrow text-center">Before you ask</p>
              <h2 className="reveal mt-3 font-display text-3xl text-ink text-center">Frequent answers.</h2>
            </RevealGroup>
            <div className="mt-8 space-y-3">
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

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-5">
            <RevealGroup>
              <div className="reveal panel bg-brand text-white rounded-2xl p-8 md:p-12 text-center">
                <h2 className="font-display text-2xl md:text-3xl text-white">In a hurry? Try the product first.</h2>
                <p className="mt-2 text-white/75 leading-relaxed">It's free and needs no account.</p>
                <a href="#generator" className="btn-primary bg-white text-brand hover:bg-accent-soft mt-5">Open the generator</a>
              </div>
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}