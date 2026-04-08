'use client';

import { useEffect, useRef, useState } from 'react';
import type { AppPhase, PlatformId, PublishStep, UploadSource } from '@/app/types/clipflow';
import TopBar from '@/app/components/dashboard/TopBar';
import UploadZone from '@/app/components/UploadZone';
import PlatformSelector from '@/app/components/PlatformSelector';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import PublishStatus from '@/app/components/PublishStatus';

type ScheduleMode = 'now' | 'later';
type AspectRatio  = '9:16' | '1:1' | '16:9';

const ASPECT_RATIOS: AspectRatio[] = ['9:16', '1:1', '16:9'];

export default function DashboardPage() {
  const [uploadSource, setUploadSource]       = useState<UploadSource | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<PlatformId>>(new Set());
  const [captions, setCaptions]               = useState<Partial<Record<PlatformId, string>>>({});
  const [scheduleMode, setScheduleMode]       = useState<ScheduleMode>('now');
  const [scheduleDate, setScheduleDate]       = useState('');
  const [scheduleTime, setScheduleTime]       = useState('');
  const [aspectRatio, setAspectRatio]         = useState<AspectRatio>('9:16');
  const [trimStart, setTrimStart]             = useState('0:00');
  const [trimEnd, setTrimEnd]                 = useState('0:30');
  const [phase, setPhase]                     = useState<AppPhase>('input');
  const [publishSteps, setPublishSteps]       = useState<PublishStep[]>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (phase === 'publishing' && publishSteps.length > 0) {
      if (publishSteps.every((s) => s.status === 'done' || s.status === 'error')) setPhase('complete');
    }
  }, [publishSteps, phase]);

  function handlePublish() {
    const platforms = Array.from(selectedPlatforms);
    setPublishSteps(platforms.map((id) => ({ platformId: id, status: 'idle', progress: 0 })));
    setPhase('publishing');
    platforms.forEach((id, i) => {
      const t1 = setTimeout(() => {
        setPublishSteps((p) => p.map((s) => s.platformId === id ? { ...s, status: 'uploading' } : s));
        let pct = 0;
        const tick = setInterval(() => {
          pct = Math.min(pct + Math.random() * 14 + 3, 100);
          setPublishSteps((p) => p.map((s) => s.platformId === id ? { ...s, progress: Math.round(pct) } : s));
          if (pct >= 100) {
            clearInterval(tick);
            setPublishSteps((p) => p.map((s) => s.platformId === id ? { ...s, status: 'done', progress: 100 } : s));
          }
        }, 120);
        timersRef.current.push(tick);
      }, i * 450);
      timersRef.current.push(t1);
    });
  }

  function handleReset() {
    timersRef.current.forEach((t) => { clearTimeout(t); clearInterval(t); });
    timersRef.current = [];
    setUploadSource(null);
    setSelectedPlatforms(new Set());
    setCaptions({});
    setPhase('input');
    setPublishSteps([]);
  }

  const canPublish = uploadSource !== null && selectedPlatforms.size > 0;

  return (
    <>
      <TopBar title="New Post" />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
          {(phase === 'publishing' || phase === 'complete') ? (
            <PublishStatus steps={publishSteps} phase={phase} onReset={handleReset} />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

              {/* ── Left column ── */}
              <div className="space-y-8">
                {/* 1. Upload */}
                <section>
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">1 · Add your clip</h2>
                  <UploadZone value={uploadSource} onChange={setUploadSource} />
                </section>

                {/* 2. Clip editor */}
                {uploadSource && (
                  <section>
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">2 · Edit clip</h2>
                    <div className="rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-5">
                      {/* Aspect ratio */}
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-semibold text-[var(--cf-muted)]">Aspect ratio</p>
                        <div className="flex gap-2">
                          {ASPECT_RATIOS.map((r) => (
                            <button
                              key={r}
                              onClick={() => setAspectRatio(r)}
                              className={`flex-1 rounded-lg border py-2 text-xs font-bold transition-all ${
                                aspectRatio === r
                                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                  : 'border-[var(--cf-border)] text-[var(--cf-body)] hover:border-[var(--cf-muted)]'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Trim */}
                      <div>
                        <p className="mb-2 text-xs font-semibold text-[var(--cf-muted)]">Trim</p>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--cf-border)] bg-[var(--cf-section)] px-3 py-2">
                            <span className="text-xs text-[var(--cf-muted)]">Start</span>
                            <input
                              type="text"
                              value={trimStart}
                              onChange={(e) => setTrimStart(e.target.value)}
                              className="w-full bg-transparent text-xs font-mono text-[var(--cf-heading)] outline-none"
                              placeholder="0:00"
                            />
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--cf-muted)]">
                            <path d="M5 12h14" />
                          </svg>
                          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--cf-border)] bg-[var(--cf-section)] px-3 py-2">
                            <span className="text-xs text-[var(--cf-muted)]">End</span>
                            <input
                              type="text"
                              value={trimEnd}
                              onChange={(e) => setTrimEnd(e.target.value)}
                              className="w-full bg-transparent text-xs font-mono text-[var(--cf-heading)] outline-none"
                              placeholder="0:30"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* 3. Platforms */}
                <section>
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">3 · Choose platforms</h2>
                  <PlatformSelector selected={selectedPlatforms} onChange={setSelectedPlatforms} />
                </section>

                {/* 4. Captions */}
                {selectedPlatforms.size > 0 && (
                  <section>
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">4 · Captions</h2>
                    <div className="space-y-3">
                      {Array.from(selectedPlatforms).map((pid) => {
                        const text = captions[pid] ?? '';
                        const limit = pid === 'twitter' ? 280 : 2200;
                        return (
                          <div key={pid} className="rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-4">
                            <div className="mb-2 flex items-center gap-2">
                              <PlatformIcon id={pid} size="sm" />
                              <span className="text-xs font-semibold capitalize text-[var(--cf-heading)]">{pid}</span>
                            </div>
                            <textarea
                              value={text}
                              onChange={(e) => setCaptions((prev) => ({ ...prev, [pid]: e.target.value }))}
                              rows={3}
                              maxLength={limit}
                              placeholder={`Write a caption for ${pid}…`}
                              className="auth-field resize-none"
                            />
                            <p className={`mt-1 text-right text-[10px] ${text.length > limit * 0.9 ? 'text-orange-500' : 'text-[var(--cf-muted)]'}`}>
                              {text.length}/{limit}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>

              {/* ── Right sidebar ── */}
              <div className="space-y-5">
                {/* Schedule */}
                <div className="rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-5">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">When to publish</h3>
                  <div className="flex rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] p-1">
                    {(['now', 'later'] as ScheduleMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setScheduleMode(m)}
                        className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all capitalize ${
                          scheduleMode === m
                            ? 'bg-[var(--cf-card)] text-[var(--cf-heading)] shadow-sm'
                            : 'text-[var(--cf-muted)] hover:text-[var(--cf-body)]'
                        }`}
                      >
                        {m === 'now' ? 'Publish now' : 'Schedule'}
                      </button>
                    ))}
                  </div>
                  {scheduleMode === 'later' && (
                    <div className="mt-3 space-y-2">
                      <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="auth-field" />
                      <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="auth-field" />
                    </div>
                  )}
                </div>

                {/* Publish button */}
                <button
                  onClick={handlePublish}
                  disabled={!canPublish}
                  className="w-full rounded-xl bg-black py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
                >
                  {scheduleMode === 'now' ? 'Publish now' : 'Schedule post'}
                </button>

                {!canPublish && (
                  <p className="text-center text-xs text-[var(--cf-muted)]">
                    Add a clip and select at least one platform.
                  </p>
                )}

                {/* Free limit notice */}
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/15">
                  <p className="text-xs font-semibold text-orange-700 dark:text-orange-400">Free plan: 1 of 2 uploads used today</p>
                  <a href="/#pricing" className="mt-2 block text-xs font-bold text-orange-600 hover:underline">
                    Upgrade for unlimited →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
