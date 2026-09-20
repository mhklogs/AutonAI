import React, { useState } from "react";
import {
  Play, FileCode, Copy, Check, Download, History, Sparkles, RefreshCw, Sliders, Info,
  Code, BookOpen, X, FileText, AlertTriangle, Terminal
} from "lucide-react";
import { Framework, GenerationOptions, ScriptItem } from "../types";
import { TEMPLATES } from "../data/templates";
import { highlightCode } from "../utils/highlighter";

export default function Generator() {
  const [criteria, setCriteria] = useState(TEMPLATES[0].criteria);
  const [framework, setFramework] = useState<Framework>("playwright-ts");
  const [options, setOptions] = useState<GenerationOptions>({ pom: false, robustSelectors: true, includeViewport: false });
  const [filename, setFilename] = useState("auth.spec.ts");
  const [generatedCode, setGeneratedCode] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refactorInstruction, setRefactorInstruction] = useState("");
  const [isRefactoring, setIsRefactoring] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "notes">("code");
  const [copied, setCopied] = useState(false);
  const [savedScripts, setSavedScripts] = useState<ScriptItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const saveToHistory = (item: ScriptItem) => {
    setSavedScripts((prev) => [item, ...prev.slice(0, 19)]);
  };

  const handleSelectTemplate = (id: string) => {
    const tmpl = TEMPLATES.find((t) => t.id === id);
    if (tmpl) { setCriteria(tmpl.criteria); setFramework(tmpl.framework); }
  };

  const handleGenerate = async () => {
    setIsLoading(true); setError(null); setGeneratedCode(""); setNotes("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ framework, criteria, options }),
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || `Status ${res.status}`); }
      const data = await res.json();
      setFilename(data.filename); setGeneratedCode(data.code); setNotes(data.notes); setActiveTab("code");
      saveToHistory({ id: Math.random().toString(36).slice(2, 9), name: data.filename, criteria, code: data.code, notes: data.notes, framework, timestamp: Date.now() });
    } catch (err: any) { setError(err.message || "Generation failed."); }
    finally { setIsLoading(false); }
  };

  const handleRefactor = async () => {
    if (!refactorInstruction.trim()) return;
    setIsRefactoring(true); setError(null);
    try {
      const res = await fetch("/api/refactor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ framework, criteria, currentCode: generatedCode, instruction: refactorInstruction }),
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || `Status ${res.status}`); }
      const data = await res.json();
      setFilename(data.filename); setGeneratedCode(data.code); setNotes(data.notes); setRefactorInstruction(""); setActiveTab("code");
      saveToHistory({ id: Math.random().toString(36).slice(2, 9), name: `Refactored: ${data.filename}`, criteria: `${criteria}\n\nRefactor: ${refactorInstruction}`, code: data.code, notes: data.notes, framework, timestamp: Date.now() });
    } catch (err: any) { setError(err.message || "Refactor failed."); }
    finally { setIsRefactoring(false); }
  };

  const handleCopy = () => { navigator.clipboard.writeText(generatedCode); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const loadFromHistory = (item: ScriptItem) => { setCriteria(item.criteria); setFramework(item.framework); setFilename(item.name); setGeneratedCode(item.code); setNotes(item.notes); setActiveTab("code"); setShowHistory(false); };

  return (
    <>
      {/* Generator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="generator-form-card">

        {/* Controls */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="panel p-5 md:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
                  <Sparkles size={18} />
                </span>
                <h2 className="font-semibold text-ink text-[0.95rem]">Automation requirements</h2>
              </div>
              <span className="text-[0.7rem] font-mono text-muted flex items-center gap-1">
                <Info size={13} className="text-muted" /> describe your test
              </span>
            </div>

            {/* Framework */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Target framework</label>
              <div className="grid grid-cols-3 gap-1.5 bg-paper p-1.5 rounded-xl border border-line">
                {([["playwright-ts", "Playwright", "TS"], ["playwright-js", "Playwright", "JS"], ["cypress", "Cypress", "JS"]] as [Framework, string, string][]).map(([val, name, lang]) => (
                  <button key={val} id={`framework-${val}`} type="button"
                    onClick={() => setFramework(val)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold font-mono transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      framework === val ? "bg-brand text-white shadow-sm" : "hover:bg-brand-soft text-ink-soft"
                    }`}>
                    <span>{name}</span>
                    <span className="text-[10px] font-sans font-medium opacity-60">{lang}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted flex items-center justify-between">
                <span>Presets</span><span className="text-[0.65rem] font-normal text-brand font-sans">click to load</span>
              </label>
              <div className="flex flex-col gap-1.5">
                {TEMPLATES.map((t) => (
                  <button key={t.id} type="button" onClick={() => handleSelectTemplate(t.id)}
                    className="w-full text-left p-3 rounded-xl border border-line bg-paper hover:bg-brand-soft hover:border-brand/20 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink group-hover:text-brand transition-colors">{t.title}</span>
                      <span className="text-[0.6rem] font-mono px-2 py-0.5 rounded bg-paper text-muted border border-line uppercase">
                        {t.framework.replace("-ts", " TS").replace("-js", " JS")}
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-muted mt-1 line-clamp-1">{t.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted flex items-center justify-between">
                <span>Natural language criteria</span>
                <span className="text-[0.65rem] font-mono text-muted">{criteria.length} chars</span>
              </label>
              <textarea id="criteria-textarea" rows={7} value={criteria} onChange={(e) => setCriteria(e.target.value)}
                placeholder="Describe clicks, assertions, target URLs..."
                className="w-full bg-paper border border-line rounded-xl p-4 text-sm text-ink focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all placeholder:text-muted/60 font-sans leading-relaxed" />
            </div>

            {/* Options */}
            <div className="border-t border-line pt-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                <Sliders size={13} /> <span>Guidelines</span>
              </div>
              <div className="flex flex-col gap-2 bg-paper p-3 rounded-xl border border-line/70">
                {([
                  ["pom", "Page Object Model", "Separate page actions & element declarations cleanly."],
                  ["robustSelectors", "Strict semantic locators", "Prioritize getByRole, getByLabel over XPaths."],
                  ["includeViewport", "Explicit viewport config", "Pre-set responsive viewport dimensions."],
                ] as const).map(([key, title, desc]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer text-xs text-ink-soft hover:text-ink py-1 select-none">
                    <input type="checkbox" checked={options[key]} onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                      className="rounded border-line text-brand focus:ring-brand/20 bg-surface h-4 w-4 cursor-pointer accent-brand" />
                    <div>
                      <span className="font-bold text-ink">{title}</span>
                      <p className="text-[0.6rem] text-muted mt-0.5">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate */}
            <button id="generate-script-btn" type="button" onClick={handleGenerate}
              disabled={isLoading || !criteria.trim()}
              className="w-full mt-1 py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white hover:shadow-md hover:shadow-brand/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
              {isLoading ? <><RefreshCw size={15} className="animate-spin" /> Generating…</> : <><Play size={15} className="fill-white" /> Generate script</>}
            </button>
          </div>

          {/* Help tip */}
          <div className="panel bg-brand-soft/50 p-4 flex gap-3 border-brand/10">
            <Info size={18} className="text-brand shrink-0 mt-0.5" />
            <div className="text-xs text-ink-soft leading-relaxed">
              <span className="font-bold text-ink block">Running your generated test</span>
              Place Playwright specs in <code className="text-brand font-semibold">tests/</code> and run with <code className="text-brand font-semibold">npx playwright test</code>. Cypress: <code className="text-brand font-semibold">cypress/e2e/</code>.
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="panel overflow-hidden flex flex-col min-h-[540px]">
            <div className="border-b border-line px-4 md:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button id="tab-code-btn" type="button" onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "code" ? "bg-brand-soft text-brand" : "text-muted hover:text-ink"}`}>
                  <FileCode size={15} /> Output
                </button>
                <button id="tab-notes-btn" type="button" onClick={() => setActiveTab("notes")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "notes" ? "bg-brand-soft text-brand" : "text-muted hover:text-ink"}`}>
                  <BookOpen size={15} /> Architect's notes
                </button>
              </div>
              {generatedCode && (
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-[0.65rem] font-mono text-muted bg-paper border border-line px-2.5 py-0.5 rounded-lg max-w-[160px] truncate">{filename}</span>
                  <button onClick={handleCopy} className="p-1.5 rounded-lg border border-line text-muted hover:text-brand hover:border-brand/30 transition-all cursor-pointer" title="Copy">
                    {copied ? <Check size={15} className="text-brand" /> : <Copy size={15} />}
                  </button>
                  <button onClick={handleDownload} className="p-1.5 rounded-lg border border-line text-muted hover:text-brand hover:border-brand/30 transition-all cursor-pointer" title="Download">
                    <Download size={15} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 p-4 md:p-5 relative flex flex-col justify-between">
              {error && (
                <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                  <div><span className="font-bold block">Generation failed</span><p>{error}</p></div>
                </div>
              )}
              {isLoading && (
                <div className="absolute inset-0 bg-paper/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20">
                  <RefreshCw size={28} className="text-brand animate-spin" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-ink">Generating script…</p>
                    <p className="text-xs text-muted mt-1">Applying rules & locators…</p>
                  </div>
                </div>
              )}
              <div className="flex-1 min-h-[320px]">
                {!generatedCode && !isLoading && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-14 px-4">
                    <div className="p-4 rounded-full bg-brand-soft text-brand mb-4"><Code size={26} /></div>
                    <h3 className="text-base font-bold text-ink">Ready to generate</h3>
                    <p className="text-xs text-muted max-w-sm mt-1 leading-relaxed">
                      Enter your test criteria or load a preset, then tap <strong className="text-brand">Generate script</strong>.
                    </p>
                  </div>
                )}
                {generatedCode && activeTab === "code" && (
                  <pre className="text-xs font-mono bg-[#F5F3EB] border border-line rounded-xl p-5 overflow-auto max-h-[480px] flex-1 leading-relaxed text-ink">
                    <code dangerouslySetInnerHTML={{ __html: highlightCode(generatedCode) }} className="block" />
                  </pre>
                )}
                {generatedCode && activeTab === "notes" && (
                  <div className="text-xs text-ink-soft leading-relaxed overflow-auto max-h-[480px] bg-paper border border-line rounded-xl p-5">
                    <div className="flex items-center gap-2 text-brand border-b border-line pb-2.5 mb-4">
                      <BookOpen size={15} /> <span className="font-bold text-sm">Architect's report</span>
                    </div>
                    <div className="space-y-4">
                      {notes.split("\n").map((line, idx) => {
                        if (line.startsWith("##")) return <h3 key={idx} className="text-xs font-bold uppercase tracking-wider text-brand mt-4 mb-1.5">{line.replace(/^#+/, "").trim()}</h3>;
                        if (line.startsWith("#")) return <h2 key={idx} className="text-sm font-bold text-ink border-b border-line pb-1 mt-5 mb-2">{line.replace(/^#+/, "").trim()}</h2>;
                        if (line.startsWith("-") || line.startsWith("*")) return <div key={idx} className="flex items-start gap-2 pl-2"><span className="text-accent font-bold shrink-0">·</span><span>{line.substring(1).trim()}</span></div>;
                        if (!line.trim()) return <div key={idx} className="h-1.5" />;
                        return <p key={idx} className="text-muted leading-relaxed">{line}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {generatedCode && (
                <div className="mt-4 pt-4 border-t border-line flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand"><Sparkles size={14} /> Refine the script</div>
                    <span className="text-[0.6rem] text-muted font-sans">incremental adjustments</span>
                  </div>
                  <div className="flex gap-2">
                    <input id="refactor-input" type="text" value={refactorInstruction}
                      onChange={(e) => setRefactorInstruction(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && refactorInstruction.trim() && !isRefactoring) handleRefactor(); }}
                      placeholder="e.g. 'Add viewport', 'Mock API 403', 'Use getByTestId'…"
                      className="flex-1 bg-paper border border-line rounded-xl px-4 py-3 text-xs text-ink placeholder:text-muted/50 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20" />
                    <button id="refactor-btn" type="button" onClick={handleRefactor}
                      disabled={isRefactoring || !refactorInstruction.trim()}
                      className="px-4 py-3 rounded-xl font-bold text-xs bg-accent hover:bg-accent/90 text-white transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer">
                      {isRefactoring ? <><RefreshCw size={13} className="animate-spin" /> Refining</> : <><RefreshCw size={13} /> Refactor</>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* History Drawer */}
      {showHistory && (
        <div id="history-drawer" className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-50 flex justify-end" onClick={() => setShowHistory(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-surface h-full border-l border-line flex flex-col shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
              <div className="flex items-center gap-2"><History size={18} className="text-brand" /><h3 className="font-bold text-ink">Session history</h3></div>
              <button onClick={() => setShowHistory(false)} className="p-2 rounded-lg border border-line text-muted hover:text-ink cursor-pointer"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-auto space-y-2.5 pr-1">
              {savedScripts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <FileText size={30} className="text-muted/30 mb-2" /><p className="text-xs text-muted">No scripts in this session yet</p>
                </div>
              ) : savedScripts.map((item) => (
                <button key={item.id} onClick={() => loadFromHistory(item)}
                  className="w-full p-4 rounded-xl border border-line bg-paper hover:bg-brand-soft hover:border-brand/20 transition-all text-left group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink group-hover:text-brand transition-colors truncate max-w-[200px]">{item.name}</span>
                    <span className="text-[0.6rem] font-mono text-muted">{new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <span className="text-[0.6rem] font-mono uppercase bg-brand-soft text-brand px-2 py-0.5 rounded mt-1.5 inline-block">{item.framework}</span>
                  <p className="text-[0.7rem] text-muted mt-2 line-clamp-2 bg-paper border border-line/60 p-2.5 rounded-lg leading-relaxed font-mono">{item.criteria.substring(0, 120)}…</p>
                </button>
              ))}
            </div>
            {savedScripts.length > 0 && (
              <div className="border-t border-line pt-3 mt-3">
                <button onClick={() => setSavedScripts([])} className="w-full py-2.5 rounded-xl text-xs font-bold border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer">Clear history</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAB for history */}
      {!showHistory && savedScripts.length > 0 && (
        <button id="history-toggle-btn" onClick={() => setShowHistory(true)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand text-white shadow-lg shadow-brand/20 flex items-center justify-center hover:bg-brand-strong transition-all cursor-pointer">
          <History size={18} />
        </button>
      )}
    </>
  );
}