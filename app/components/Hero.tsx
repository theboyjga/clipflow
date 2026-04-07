'use client';

import { motion } from 'framer-motion';
import { BackgroundPaths } from '@/app/components/ui/background-paths';
import { AnimatedGroup } from '@/app/components/ui/animated-group';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import ClipFlowLogo from '@/app/components/ui/ClipFlowLogo';
import type { PlatformId } from '@/app/types/clipflow';

// ── Animated headline helper ───────────────────────────────────────────────────
function AnimatedWord({
  word,
  wordIndex,
  className,
}: {
  word: string;
  wordIndex: number;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className ?? ''}`}>
      {word.split('').map((letter, i) => (
        <motion.span
          key={`${wordIndex}-${i}`}
          initial={{ y: 60, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            delay: 0.3 + wordIndex * 0.12 + i * 0.032,
            type: 'spring',
            stiffness: 160,
            damping: 22,
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}

// ── Main hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="hero-dark relative overflow-hidden">

      {/* ── Gradient glow blobs ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob-pulse absolute -left-48 -top-24 h-[700px] w-[700px] rounded-full bg-orange-700/35 blur-[140px]" />
        <div className="animate-blob-pulse delay-300 absolute -right-32 top-8 h-[600px] w-[600px] rounded-full bg-amber-600/20 blur-[120px]" />
        <div className="animate-blob-pulse delay-600 absolute -bottom-20 left-1/3 h-[400px] w-[500px] rounded-full bg-orange-900/20 blur-[100px]" />
        {/* Bottom fade to page */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--cf-page)] to-transparent" />
      </div>

      {/* ── Animated flowing SVG paths (BackgroundPaths) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <BackgroundPaths colorA="#c2410c" colorB="#f97316" />
      </div>

      {/* ── Dot grid ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-28 pt-20 sm:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">

          {/* ── Text side ── */}
          <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Now supporting YouTube Shorts + LinkedIn
            </motion.div>

            {/* Headline — letter-by-letter spring animation */}
            <h1 className="mb-0 text-5xl font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-6xl lg:text-[68px]">
              <AnimatedWord word="Clip" wordIndex={0} />{' '}
              <AnimatedWord word="it." wordIndex={1} />{' '}
              <AnimatedWord word="Post" wordIndex={2} />{' '}
              <AnimatedWord word="it." wordIndex={3} />
              <br className="hidden sm:block" />
              {/* "Everywhere." gets the gradient */}
              <span className="gradient-text">
                <AnimatedWord word="Everywhere." wordIndex={4} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
              className="mt-6 text-[1.05rem] leading-relaxed text-white/55"
            >
              Upload an MP4 or paste a link from TikTok, Instagram, YouTube, Facebook, Twitch, or Kick.
              We publish your clip to every platform simultaneously — in seconds.
            </motion.p>

            {/* CTAs */}
            <AnimatedGroup
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={{
                container: {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.1 } },
                },
                item: {
                  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
                  visible: {
                    opacity: 1, y: 0, filter: 'blur(0px)',
                    transition: { type: 'spring', bounce: 0.3, duration: 0.9 },
                  },
                },
              }}
            >
              <a
                href="/auth"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3 text-[0.9rem] font-bold text-white shadow-xl transition-all hover:bg-zinc-800 active:scale-95"
              >
                Get started free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/6 px-7 py-3 text-[0.9rem] font-semibold text-white/75 backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10 hover:text-white"
              >
                Watch demo
              </a>
            </AnimatedGroup>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {['bg-orange-400', 'bg-orange-600', 'bg-emerald-400', 'bg-amber-400'].map((c, i) => (
                  <div key={i} className={`h-7 w-7 rounded-full border-2 border-[#07040f] ${c}`} />
                ))}
              </div>
              <p className="text-sm text-white/45">
                <span className="font-semibold text-white/80">2,400+</span> creators publishing daily
              </p>
            </motion.div>

            {/* Platform chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              {(
                [
                  { id: 'instagram' as PlatformId, label: 'Instagram'   },
                  { id: 'tiktok'    as PlatformId, label: 'TikTok'      },
                  { id: 'youtube'   as PlatformId, label: 'YouTube'     },
                  { id: 'facebook'  as PlatformId, label: 'Facebook'    },
                  { id: 'linkedin'  as PlatformId, label: 'LinkedIn'    },
                  { id: 'twitter'   as PlatformId, label: 'Twitter / X' },
                ]
              ).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/5 px-2.5 py-1.5 backdrop-blur-sm"
                >
                  <PlatformIcon id={p.id} size="sm" />
                  <span className="text-[11px] font-medium text-white/50">{p.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Device mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 80, damping: 20 }}
            className="relative flex flex-1 items-center justify-center"
          >
            <DeviceMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Device mockup (unchanged) ──────────────────────────────────────────────────
function DeviceMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-8 rounded-[48px] bg-orange-500/20 blur-3xl" />

      <div
        className="animate-float relative h-[560px] w-[274px] overflow-hidden rounded-[40px] border border-white/10 shadow-2xl"
        style={{ background: '#13111a' }}
      >
        <div className="flex items-center justify-between px-6 pt-4 pb-2" style={{ background: '#1a1726' }}>
          <span className="text-[11px] font-semibold text-white/70">9:41</span>
          <div className="h-4 w-20 rounded-full bg-black/60" />
          <div className="flex gap-1">{[...Array(3)].map((_, i) => <div key={i} className="h-2 w-2.5 rounded-sm bg-white/30" />)}</div>
        </div>

        <div className="space-y-3 px-4 pb-4 pt-2">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-1.5">
              <ClipFlowLogo size={20} />
              <span className="text-xs font-bold text-white/80">ClipFlow</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-white/10" />
          </div>

          <div
            className="flex h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-orange-500/40"
            style={{ background: 'rgba(234,88,12,0.08)' }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="mx-auto h-2 w-20 rounded-full bg-white/15" />
              <div className="mx-auto h-1.5 w-14 rounded-full bg-white/8" />
            </div>
          </div>

          {(
            [
              { id: 'instagram' as PlatformId, barColor: 'from-pink-500 to-orange-400', w: '60%' },
              { id: 'tiktok'    as PlatformId, barColor: 'from-zinc-500 to-zinc-700',   w: '45%' },
              { id: 'youtube'   as PlatformId, barColor: 'from-red-500 to-red-600',     w: '78%' },
              { id: 'facebook'  as PlatformId, barColor: 'from-blue-600 to-blue-700',   w: '32%' },
            ]
          ).map((p, i) => (
            <div key={p.id} className="flex items-center gap-2 rounded-xl border border-white/8 p-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <PlatformIcon id={p.id} size="sm" className="h-7 w-7 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${p.barColor}`} style={{ width: p.w, animation: `progressFill 1.5s ${i * 0.3}s ease both` }} />
                </div>
                <div className="h-1.5 w-8 rounded-full bg-white/10" />
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            </div>
          ))}

          <div className="flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-800 shadow-lg shadow-orange-700/30">
            <div className="h-1.5 w-16 rounded-full bg-white/60" />
          </div>
        </div>
      </div>

      <FloatingBadge className="animate-float-reverse -left-16 top-16 delay-100"    platformId="instagram" label="Instagram" />
      <FloatingBadge className="animate-float        -right-14 top-32 delay-300"    platformId="youtube"   label="YouTube"   />
      <FloatingBadge className="animate-float-reverse -left-12 bottom-28 delay-500" platformId="facebook"  label="Facebook"  />
      <FloatingBadge className="animate-float        -right-16 bottom-14 delay-200" platformId="tiktok"    label="TikTok"    />

      <div className="animate-float delay-400 absolute -right-6 top-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1e1a2e]/90 px-3 py-2.5 shadow-xl backdrop-blur-md">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-400" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <div className="text-[10px] font-bold text-white/85">Published!</div>
          <div className="text-[9px] text-white/40">6 platforms · 0.8s</div>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ className, platformId, label }: {
  className: string; platformId: PlatformId; label: string;
}) {
  return (
    <div className={`absolute flex items-center gap-2 rounded-xl border border-white/10 bg-[#1e1a2e]/85 px-3 py-2 shadow-lg backdrop-blur-md ${className}`}>
      <PlatformIcon id={platformId} size="sm" className="h-6 w-6 rounded-md" />
      <span className="text-[11px] font-semibold text-white/70">{label}</span>
    </div>
  );
}
