'use client';

import { useEffect, useRef, useState } from 'react';
import type { AppPhase, PlatformId, PublishStep, UploadSource } from '@/app/types/clipflow';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import PlatformLogos from '@/app/components/PlatformLogos';
import Features from '@/app/components/Features';
import HowItWorks from '@/app/components/HowItWorks';
import InteractiveDemo from '@/app/components/InteractiveDemo';
import AnimateOnScroll from '@/app/components/AnimateOnScroll';
import UploadZone from '@/app/components/UploadZone';
import PlatformSelector from '@/app/components/PlatformSelector';
import PublishButton from '@/app/components/PublishButton';
import PublishStatus from '@/app/components/PublishStatus';

export default function Home() {
  const [uploadSource, setUploadSource] = useState<UploadSource | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<PlatformId>>(new Set());
  const [phase, setPhase] = useState<AppPhase>('input');
  const [publishSteps, setPublishSteps] = useState<PublishStep[]>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (phase === 'publishing' && publishSteps.length > 0) {
      const allDone = publishSteps.every((s) => s.status === 'done' || s.status === 'error');
      if (allDone) setPhase('complete');
    }
  }, [publishSteps, phase]);

  function handlePublish() {
    const platforms = Array.from(selectedPlatforms);
    setPublishSteps(platforms.map((id) => ({ platformId: id, status: 'idle', progress: 0 })));
    setPhase('publishing');
    platforms.forEach((id, i) => {
      const startTimer: NodeJS.Timeout = setTimeout(() => {
        setPublishSteps((prev) => prev.map((s) => s.platformId === id ? { ...s, status: 'uploading' } : s));
        let pct = 0;
        const tick: NodeJS.Timeout = setInterval(() => {
          pct = Math.min(pct + Math.random() * 14 + 3, 100);
          setPublishSteps((prev) => prev.map((s) => s.platformId === id ? { ...s, progress: Math.round(pct) } : s));
          if (pct >= 100) {
            clearInterval(tick);
            setPublishSteps((prev) => prev.map((s) => s.platformId === id ? { ...s, status: 'done', progress: 100 } : s));
          }
        }, 120);
        timersRef.current.push(tick);
      }, i * 450);
      timersRef.current.push(startTimer);
    });
  }

  function handleReset() {
    timersRef.current.forEach((t) => { clearTimeout(t); clearInterval(t); });
    timersRef.current = [];
    setUploadSource(null);
    setSelectedPlatforms(new Set());
    setPhase('input');
    setPublishSteps([]);
  }

  return (
    <div className="min-h-screen transition-colors duration-200" style={{ background: 'var(--cf-page)', color: 'var(--cf-heading)' }}>
      <Header />
      <Hero />
      <PlatformLogos />
      <Features />
      <HowItWorks />
      <InteractiveDemo />

      {/* ── Try it section ───────────────────────── */}
      <section id="try" className="py-28 transition-colors duration-200" style={{ background: 'var(--cf-page)' }}>
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <AnimateOnScroll>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-violet-600">
              Try it now
            </p>
            <h2 className="mb-3 text-center text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
              Start publishing
            </h2>
            <p className="mb-12 text-center text-[var(--cf-body)]">
              No account needed. Just add your video and go.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <div className="gradient-border rounded-2xl p-6 sm:p-8" style={{ background: 'var(--cf-card)' }}>
              {phase === 'input' && (
                <div className="space-y-8">
                  <section aria-labelledby="upload-heading">
                    <h3 id="upload-heading" className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">
                      1 · Add your video
                    </h3>
                    <UploadZone value={uploadSource} onChange={setUploadSource} />
                  </section>
                  <section aria-labelledby="platforms-heading">
                    <h3 id="platforms-heading" className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">
                      2 · Choose platforms
                    </h3>
                    <PlatformSelector selected={selectedPlatforms} onChange={setSelectedPlatforms} />
                  </section>
                  <PublishButton
                    selectedCount={selectedPlatforms.size}
                    hasSource={uploadSource !== null}
                    onPublish={handlePublish}
                  />
                </div>
              )}
              {(phase === 'publishing' || phase === 'complete') && (
                <PublishStatus steps={publishSteps} phase={phase} onReset={handleReset} />
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--cf-border)] py-10 transition-colors duration-200" style={{ background: 'var(--cf-section)' }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-blue-500 shadow-sm">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[var(--cf-heading)]">ClipFlow</span>
          </div>
          <p className="text-xs text-[var(--cf-muted)]">© {new Date().getFullYear()} ClipFlow. Clip once. Post everywhere.</p>
          <div className="flex gap-5 text-xs font-medium text-[var(--cf-muted)]">
            <a href="#" className="transition-colors hover:text-[var(--cf-heading)]">Privacy</a>
            <a href="#" className="transition-colors hover:text-[var(--cf-heading)]">Terms</a>
            <a href="#" className="transition-colors hover:text-[var(--cf-heading)]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
