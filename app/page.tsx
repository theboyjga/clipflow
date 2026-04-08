'use client';

import { useEffect, useRef, useState } from 'react';
import type { AppPhase, PlatformId, PublishStep, UploadSource } from '@/app/types/clipflow';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import PhotoScroll from '@/app/components/PhotoScroll';
import PlatformLogos from '@/app/components/PlatformLogos';
import StatsSection from '@/app/components/StatsSection';
import Features from '@/app/components/Features';
import HowItWorks from '@/app/components/HowItWorks';
import InteractiveDemo from '@/app/components/InteractiveDemo';
import AnalyticsSection from '@/app/components/AnalyticsSection';
import SchedulerSection from '@/app/components/SchedulerSection';
import Testimonials from '@/app/components/Testimonials';
import PricingSection from '@/app/components/PricingSection';
import FAQSection from '@/app/components/FAQSection';
import AnimateOnScroll from '@/app/components/AnimateOnScroll';
import ClipFlowLogo from '@/app/components/ui/ClipFlowLogo';
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
      <PhotoScroll />
      <PlatformLogos />
      <StatsSection />
      <Features />
      <HowItWorks />
      <section id="demo">
        <InteractiveDemo />
      </section>
      <AnalyticsSection />
      <SchedulerSection />
      <Testimonials />
      <PricingSection />
      <FAQSection />

      {/* ── Try it section ───────────────────────── */}
      <section id="try" className="py-28 transition-colors duration-200" style={{ background: 'var(--cf-page)' }}>
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <AnimateOnScroll>
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-600">
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

      {/* ── Footer ── */}
      <footer className="border-t border-white/8 py-14 transition-colors duration-200" style={{ background: '#07040f' }}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <a href="/" className="flex items-center gap-2.5">
                <ClipFlowLogo size={28} />
                <span className="text-[15px] font-bold tracking-tight text-white">ClipFlow</span>
              </a>
              <p className="max-w-[200px] text-xs leading-relaxed text-white/40">
                Clip it. Post it. Everywhere.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {[
                  { label: 'Twitter/X', href: '#', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                  { label: 'Instagram', href: '#', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:border-white/25 hover:text-white/80"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="flex flex-wrap gap-10 text-xs sm:gap-12">
              <div className="flex flex-col gap-2.5">
                <p className="mb-1 font-semibold uppercase tracking-widest text-white/30">Product</p>
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'Demo', href: '#demo' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'FAQ', href: '#faq' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-white/50 transition-colors hover:text-white">{label}</a>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="mb-1 font-semibold uppercase tracking-widest text-white/30">Company</p>
                {['About', 'Blog', 'Careers'].map((l) => (
                  <a key={l} href="#" className="text-white/50 transition-colors hover:text-white">{l}</a>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="mb-1 font-semibold uppercase tracking-widest text-white/30">Legal</p>
                {['Privacy', 'Terms', 'Contact'].map((l) => (
                  <a key={l} href="#" className="text-white/50 transition-colors hover:text-white">{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/8 pt-6">
            <p className="text-center text-[11px] text-white/30">© 2026 ClipFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
