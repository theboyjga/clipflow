export default function Hero() {
  return (
    <section className="hero-dark relative overflow-hidden">
      {/* ── Vivid gradient glow blobs ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Left violet glow */}
        <div className="animate-blob-pulse absolute -left-48 -top-24 h-[700px] w-[700px] rounded-full bg-violet-700/40 blur-[130px]" />
        {/* Right rose/pink glow */}
        <div className="animate-blob-pulse delay-300 absolute -right-32 top-8 h-[600px] w-[600px] rounded-full bg-pink-600/30 blur-[120px]" />
        {/* Bottom cyan accent */}
        <div className="animate-blob-pulse delay-600 absolute -bottom-20 left-1/3 h-[400px] w-[500px] rounded-full bg-indigo-700/20 blur-[100px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Bottom fade to page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--cf-page)] to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-28 pt-20 sm:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-20">

          {/* ── Text side ── */}
          <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="animate-fade-in mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Now supporting YouTube Shorts + LinkedIn
            </div>

            <h1 className="animate-fade-in-up delay-100 text-5xl font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-6xl lg:text-[68px]">
              Clip once.{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">Post everywhere.</span>
            </h1>

            <p className="animate-fade-in-up delay-200 mt-6 text-[1.05rem] leading-relaxed text-white/55">
              Upload an MP4 or paste a link from TikTok, Instagram, YouTube, or Facebook.
              We publish your clip to every platform simultaneously — in seconds.
            </p>

            <div className="animate-fade-in-up delay-300 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#try"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 py-3 text-[0.9rem] font-bold text-white shadow-xl shadow-violet-700/40 transition-all hover:from-violet-400 hover:to-pink-400 hover:shadow-violet-600/50 active:scale-95"
              >
                Start publishing free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/6 px-7 py-3 text-[0.9rem] font-semibold text-white/75 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                See the demo
              </a>
            </div>

            {/* Social proof */}
            <div className="animate-fade-in delay-500 mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-violet-400', 'bg-pink-400', 'bg-emerald-400', 'bg-amber-400'].map((c, i) => (
                  <div key={i} className={`h-7 w-7 rounded-full border-2 border-[#07040f] ${c}`} />
                ))}
              </div>
              <p className="text-sm text-white/45">
                <span className="font-semibold text-white/80">2,400+</span> creators publishing daily
              </p>
            </div>

            {/* Trusted by logos row */}
            <div className="animate-fade-in delay-700 mt-8 flex flex-wrap items-center gap-3">
              {[
                { badge: 'IG', color: 'from-pink-500 to-orange-400', label: 'Instagram'  },
                { badge: 'TT', color: 'from-zinc-500 to-zinc-700',   label: 'TikTok'     },
                { badge: 'YT', color: 'from-red-500 to-red-700',     label: 'YouTube'    },
                { badge: 'FB', color: 'from-blue-600 to-blue-800',   label: 'Facebook'   },
                { badge: 'LI', color: 'from-blue-700 to-cyan-700',   label: 'LinkedIn'   },
                { badge: 'TW', color: 'from-sky-500 to-blue-500',    label: 'Twitter / X' },
              ].map((p) => (
                <div
                  key={p.badge}
                  className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/5 px-2.5 py-1.5 backdrop-blur-sm"
                >
                  <div className={`flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br ${p.color} text-[8px] font-bold text-white`}>{p.badge}</div>
                  <span className="text-[11px] font-medium text-white/50">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Device mockup ── */}
          <div className="animate-slide-in-right delay-200 relative flex flex-1 items-center justify-center">
            <DeviceMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function DeviceMockup() {
  return (
    <div className="relative">
      {/* Glow behind phone */}
      <div className="absolute inset-8 rounded-[48px] bg-violet-500/20 blur-3xl" />

      {/* Phone frame */}
      <div
        className="animate-float relative h-[560px] w-[274px] overflow-hidden rounded-[40px] border border-white/10 shadow-2xl"
        style={{ background: '#13111a' }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2" style={{ background: '#1a1726' }}>
          <span className="text-[11px] font-semibold text-white/70">9:41</span>
          <div className="h-4 w-20 rounded-full bg-black/60" />
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-2 w-2.5 rounded-sm bg-white/30" />
            ))}
          </div>
        </div>

        {/* App content */}
        <div className="space-y-3 px-4 pb-4 pt-2">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-500 to-pink-500" />
              <span className="text-xs font-bold text-white/80">ClipFlow</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-white/10" />
          </div>

          {/* Upload area */}
          <div
            className="flex h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-violet-500/40"
            style={{ background: 'rgba(139,92,246,0.08)' }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-400" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="mx-auto h-2 w-20 rounded-full bg-white/15" />
              <div className="mx-auto h-1.5 w-14 rounded-full bg-white/8" />
            </div>
          </div>

          {/* Platform cards */}
          {[
            { badge: 'IG', color: 'from-pink-500 to-orange-400', w: '60%' },
            { badge: 'TT', color: 'from-zinc-500 to-zinc-700',   w: '45%' },
            { badge: 'YT', color: 'from-red-500 to-red-600',     w: '78%' },
            { badge: 'FB', color: 'from-blue-600 to-blue-700',   w: '32%' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-white/8 p-2 shadow-sm" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-[9px] font-bold text-white`}>{p.badge}</div>
              <div className="flex-1 space-y-1.5">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${p.color}`} style={{ width: p.w, animation: `progressFill 1.5s ${i * 0.3}s ease both` }} />
                </div>
                <div className="h-1.5 w-8 rounded-full bg-white/10" />
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            </div>
          ))}

          <div className="flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 shadow-lg shadow-violet-700/30">
            <div className="h-1.5 w-16 rounded-full bg-white/60" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <FloatingBadge className="animate-float-reverse -left-16 top-16 delay-100" color="from-pink-500 to-orange-400" label="Instagram" badge="IG" />
      <FloatingBadge className="animate-float        -right-14 top-32 delay-300" color="from-red-500 to-red-600"     label="YouTube"   badge="YT" />
      <FloatingBadge className="animate-float-reverse -left-12 bottom-28 delay-500" color="from-blue-600 to-blue-700" label="Facebook" badge="FB" />
      <FloatingBadge className="animate-float        -right-16 bottom-14 delay-200" color="from-zinc-500 to-zinc-700" label="TikTok"   badge="TT" />

      {/* Success toast */}
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

function FloatingBadge({ className, color, label, badge }: {
  className: string; color: string; label: string; badge: string;
}) {
  return (
    <div className={`absolute flex items-center gap-2 rounded-xl border border-white/10 bg-[#1e1a2e]/85 px-3 py-2 shadow-lg backdrop-blur-md ${className}`}>
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${color} text-[9px] font-bold text-white`}>{badge}</div>
      <span className="text-[11px] font-semibold text-white/70">{label}</span>
    </div>
  );
}
