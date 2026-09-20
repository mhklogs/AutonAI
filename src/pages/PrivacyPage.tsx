import { Link } from "react-router-dom";
import { ShieldCheck, Mail } from "lucide-react";
import { Header, Footer } from "../components/Base";
import { RevealGroup } from "../components/RevealGroup";
import { usePageMeta } from "../lib/usePageMeta";

const SECTIONS = [
  {
    title: "1. Who we are",
    body: [
      "Auton AI (\"the Service\") is a web application that converts natural-language test criteria into Playwright and Cypress automation scripts. This policy explains what information the Service processes, why, and the rights you hold.",
    ],
  },
  {
    title: "2. Data we process",
    body: [
      "If you only use the generator, we process the criteria and options you enter at the moment of generating, plus the generated script and notes returned to you. Generated scripts are retained only for the current browser session (Free) unless you enable history sync on a paid plan.",
      "If you contact us, we process your name, email, company (if provided) and message. We never sell or rent personal data.",
    ],
  },
  {
    title: "3. How generation works",
    body: [
      "Scripts are produced by a server-side AI model using the criteria, framework and guidelines you submit. The generation call includes your criteria text and may be transmitted to the model provider to produce output. We do not use your scripts or criteria to retrain models.",
    ],
  },
  {
    title: "4. Cookies & analytics",
    body: [
      "The Service uses essential cookies for session operations only. Aggregate, anonymous usage analytics may be used to improve the product. You can decline non-essential analytics where presented.",
    ],
  },
  {
    title: "5. Your rights",
    body: [
      "Depending on your region (including GDPR and CCPA), you may request access to, correction of, or deletion of your personal data, and may object to processing. Email privacy@auton-ai.com with a verified request and we respond within the legally required timeframe.",
    ],
  },
  {
    title: "6. Security & retention",
    body: [
      "Data in transit is encrypted, session data is held in memory, and stored data (on paid plans) sits in secured environments with access controls. Session-only scripts are discarded when your tab closes. We delete contact enquiries on your request or after 12 months of inactivity.",
    ],
  },
  {
    title: "7. Changes",
    body: [
      "We may update this policy from time to time. Material changes will be reflected here with an updated revision date. Continued use of the Service after changes indicates acceptance.",
    ],
  },
];

export default function PrivacyPage() {
  usePageMeta(
    "Privacy Policy — Auton AI",
    "How Auton AI handles your data: session-only scripts on Free, encrypted transmission, no selling of personal data, GDPR and CCPA compliant rights.",
  );

  return (
    <div className="min-h-full">
      <Header />
      <main>
        <section className="pt-16 pb-12 md:pt-28 md:pb-16">
          <div className="mx-auto max-w-3xl px-5">
            <RevealGroup>
              <p className="reveal eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" /> Legal
              </p>
              <h1 className="reveal mt-5 font-display text-[2.6rem] leading-[1.05] md:text-5xl text-ink">
                Privacy policy.
              </h1>
              <p className="reveal mt-5 text-ink-soft leading-relaxed">
                Last updated: January 2026. This policy applies to the Auton AI web application and its public site.
              </p>
            </RevealGroup>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-surface border-t border-line">
          <div className="mx-auto max-w-3xl px-5">
            <div className="space-y-10">
              {SECTIONS.map((s) => (
                <div key={s.title}>
                  <h2 className="font-display text-xl text-ink">{s.title}</h2>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-3 text-sm text-ink-soft leading-[1.8]">{p}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-12 panel bg-brand text-white rounded-2xl p-8 flex items-start gap-4">
              <ShieldCheck size={22} className="text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-white/85 leading-relaxed">
                Questions about your data? Email{" "}
                <a href="mailto:privacy@auton-ai.com" className="underline underline-offset-2 text-accent">
                  privacy@auton-ai.com
                </a>{" "}
                and we'll respond within two business days.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm text-muted">
              <Mail size={15} /> Auton AI · hello@auton-ai.com
            </div>
            <Link to="/" className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
              ← Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}