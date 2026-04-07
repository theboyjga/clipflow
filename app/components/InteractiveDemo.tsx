'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = ['Import', 'Select', 'Publish'] as const;
type Step = (typeof STEPS)[number];

const PLATFORMS = [
  { badge: 'IG', label: 'Instagram Reels', color: 'from-pink-500 to-orange-400' },
  { badge: 'TT', label: 'TikTok',          color: 'from-zinc-600 to-zinc-800' },
  { badge: 'YT', label: 'YouTube Shorts',  color: 'from-red-500 to-red-600' },
  { badge: 'FB', label: 'Facebook Reels',  color: 'from-blue-600 to-blue-700' },
  { badge: 'X',  label: 'Twitter / X',     color: 'from-zinc-800 to-zinc-950' },
  { badge: 'in', label: 'LinkedIn',        color: 'from-blue-700 to-blue-900' },
];

export default function InteractiveDemo() {
  const [step, setStep] = useState<Step>('Import');
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stepIndex = STEPS.indexOf(step);

  function advance() {
    setStep(STEPS[(stepIndex + 1) % STEPS.length]);
  }

  // Auto-advance
  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setTimeout(advance, 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, autoPlay]);

  function goTo(s: Step) {
    setAutoPlay(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    setStep(s);
  }

  return (
    <section id="demo" className="bg-[var(--cf-section)] py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-600">
            Live demo
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
            See it in action
          </h2>
          <p className="mt-4 text-[var(--cf-body)]">
            Watch how ClipFlow takes you from one clip to every platform in three steps.
          </p>
        </div>

        {/* Browser chrome */}
        <div className="card-shadow overflow-hidden rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)]">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-[var(--cf-border)] bg-[var(--cf-section)] px-4 py-3">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            {/* URL bar */}
            <div className="flex flex-1 items-center justify-center">
              <div className="flex h-7 w-full max-w-xs items-center gap-2 rounded-md border border-[var(--cf-border)] bg-[var(--cf-card)] px-3">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--cf-muted)] shrink-0" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-xs text-[var(--cf-muted)]">app.clipflow.io</span>
              </div>
            </div>
            {/* Spacer */}
            <div className="w-16" />
          </div>

          {/* Step tabs inside the "app" */}
          <div className="flex border-b border-[var(--cf-border)] bg-[var(--cf-card)]">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => goTo(s)}
                className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
                  step === s
                    ? 'border-b-2 border-violet-600 text-violet-600'
                    : 'text-[var(--cf-muted)] hover:text-[var(--cf-body)]'
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  step === s ? 'bg-violet-600 text-white' : 'bg-[var(--cf-section)] text-[var(--cf-muted)]'
                }`}>{i + 1}</span>
                {s}
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="min-h-[340px] p-6 sm:p-10">
            {step === 'Import' && <ImportStep key="import" />}
            {step === 'Select' && <SelectStep key="select" />}
            {step === 'Publish' && <PublishStep key="publish" />}
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between border-t border-[var(--cf-border)] bg-[var(--cf-section)] px-6 py-3">
            {/* Progress dots */}
            <div className="flex gap-1.5">
              {STEPS.map((s) => (
                <button
                  key={s}
                  onClick={() => goTo(s)}
                  aria-label={`Go to step: ${s}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === s ? 'w-5 bg-violet-600' : 'w-2 bg-[var(--cf-border)] hover:bg-[var(--cf-muted)]'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Auto-play toggle */}
              <button
                onClick={() => setAutoPlay((p) => !p)}
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--cf-muted)] transition-colors hover:text-[var(--cf-body)]"
              >
                <span className={`flex h-3 w-3 items-center justify-center rounded-full border ${autoPlay ? 'border-violet-500 bg-violet-500' : 'border-[var(--cf-border)]'}`}>
                  {autoPlay && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                Auto-play
              </button>
              {/* Next button */}
              <button
                onClick={() => { setAutoPlay(false); advance(); }}
                className="flex items-center gap-1 rounded-full bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-violet-500 active:scale-95"
              >
                {stepIndex === 2 ? 'Restart' : 'Next'}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* CTA below */}
        <div className="mt-8 text-center">
          <a href="#try" className="text-sm font-semibold text-violet-600 underline underline-offset-4 transition-colors hover:text-violet-500">
            Try it yourself with your own video →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Step 1: Import ─────────────────────────────── */

const FAKE_URL = 'https://www.tiktok.com/@creator/video/123456789';

function ImportStep() {
  const [typed, setTyped] = useState(0);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    if (typed >= FAKE_URL.length) { setMatched(true); return; }
    const t = setTimeout(() => setTyped((n) => n + 1), 38);
    return () => clearTimeout(t);
  }, [typed]);

  return (
    <div className="animate-step-in mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">1 · Add your video</p>
        <h3 className="text-xl font-bold text-[var(--cf-heading)]">Paste any short-form link</h3>
        <p className="mt-1 text-sm text-[var(--cf-body)]">TikTok, Instagram Reels, YouTube Shorts, or Facebook Reels.</p>
      </div>

      {/* Source platform chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { badge: 'TT', label: 'TikTok', color: 'from-zinc-600 to-zinc-800', active: true },
          { badge: 'IG', label: 'Instagram', color: 'from-pink-500 to-orange-400', active: false },
          { badge: 'YT', label: 'YouTube', color: 'from-red-500 to-red-600', active: false },
          { badge: 'FB', label: 'Facebook', color: 'from-blue-600 to-blue-700', active: false },
        ].map((p) => (
          <div key={p.badge} className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${p.active ? 'border-violet-300 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'border-[var(--cf-border)] text-[var(--cf-muted)]'}`}>
            <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${p.color} text-[9px] font-bold text-white`}>{p.badge[0]}</span>
            {p.label}
          </div>
        ))}
      </div>

      {/* URL input with typewriter */}
      <div className="relative">
        <div className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${matched ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-violet-400 bg-[var(--cf-card)]'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`shrink-0 ${matched ? 'text-emerald-500' : 'text-[var(--cf-muted)]'}`} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span className="flex-1 text-sm font-mono text-[var(--cf-body)]">
            {FAKE_URL.slice(0, typed)}
            {typed < FAKE_URL.length && <span className="inline-block w-px animate-pulse bg-violet-500">&nbsp;</span>}
          </span>
          {matched && <span className="text-xs font-semibold text-emerald-600">✓ TikTok</span>}
        </div>
        {matched && (
          <p className="mt-1.5 text-xs font-medium text-emerald-600 animate-step-in">Valid TikTok link detected — ready to import!</p>
        )}
      </div>
    </div>
  );
}

/* ── Step 2: Select ─────────────────────────────── */

function SelectStep() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Auto-select platforms one by one
  useEffect(() => {
    const ids = ['IG', 'TT', 'YT', 'FB'];
    ids.forEach((id, i) => {
      setTimeout(() => setSelected((prev) => new Set([...prev, id])), i * 350 + 300);
    });
  }, []);

  return (
    <div className="animate-step-in mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">2 · Choose platforms</p>
        <h3 className="text-xl font-bold text-[var(--cf-heading)]">Pick where to publish</h3>
        <p className="mt-1 text-sm text-[var(--cf-body)]">Select any combination. Your clip goes to all of them at once.</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {PLATFORMS.map((p) => {
          const isSelected = selected.has(p.badge);
          return (
            <button
              key={p.badge}
              onClick={() => setSelected((prev) => {
                const next = new Set(prev);
                if (next.has(p.badge)) next.delete(p.badge); else next.add(p.badge);
                return next;
              })}
              className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-violet-300 bg-violet-50 shadow-sm shadow-violet-100 dark:bg-violet-900/20 dark:border-violet-700'
                  : 'border-[var(--cf-border)] bg-[var(--cf-card)] hover:border-violet-200'
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-[10px] font-bold text-white shadow-sm`}>
                {p.badge}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-[var(--cf-heading)]">{p.label}</p>
              </div>
              {isSelected && (
                <div className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[9px] font-bold text-white">✓</div>
              )}
            </button>
          );
        })}
      </div>

      {selected.size > 0 && (
        <p className="animate-step-in text-center text-sm font-semibold text-violet-600">
          {selected.size} platform{selected.size !== 1 ? 's' : ''} selected — ready to publish!
        </p>
      )}
    </div>
  );
}

/* ── Step 3: Publish ────────────────────────────── */

function PublishStep() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [done, setDone] = useState<Set<string>>(new Set());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const platforms = PLATFORMS.slice(0, 4);
    platforms.forEach((p, i) => {
      setTimeout(() => {
        let pct = 0;
        const tick = setInterval(() => {
          pct = Math.min(pct + Math.random() * 18 + 5, 100);
          setProgress((prev) => ({ ...prev, [p.badge]: Math.round(pct) }));
          if (pct >= 100) {
            clearInterval(tick);
            setDone((prev) => new Set([...prev, p.badge]));
          }
        }, 100);
      }, i * 300);
    });
  }, [started]);

  const allDone = done.size === 4;

  return (
    <div className="animate-step-in mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">3 · Publish</p>
        <h3 className="text-xl font-bold text-[var(--cf-heading)]">
          {allDone ? '🎉 Published to all platforms!' : 'Publishing your clip…'}
        </h3>
        <p className="mt-1 text-sm text-[var(--cf-body)]">
          {allDone ? 'Your clip is now live everywhere.' : 'Uploading to each platform simultaneously.'}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--cf-border)] bg-[var(--cf-card)]">
        {PLATFORMS.slice(0, 4).map((p, i) => {
          const pct = progress[p.badge] ?? 0;
          const isDone = done.has(p.badge);
          return (
            <div key={p.badge} className={`flex items-center gap-3 px-4 py-3 ${i < 3 ? 'border-b border-[var(--cf-border)]' : ''}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-[10px] font-bold text-white`}>
                {p.badge}
              </div>
              <div className="flex-1">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--cf-heading)]">{p.label}</span>
                  {isDone
                    ? <span className="text-[10px] font-bold text-emerald-500">Done ✓</span>
                    : pct > 0
                    ? <span className="text-[10px] font-medium text-[var(--cf-muted)] animate-pulse">Uploading {pct}%</span>
                    : <span className="text-[10px] text-[var(--cf-muted)]">Waiting…</span>}
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--cf-section)]">
                  <div
                    className={`h-full rounded-full transition-all duration-200 ${isDone ? 'bg-emerald-500' : `bg-gradient-to-r ${p.color}`}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="animate-step-in flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-900/20">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Published to 4 platforms in 2.3s
          </span>
        </div>
      )}
    </div>
  );
}
