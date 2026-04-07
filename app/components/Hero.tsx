export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle gradient blobs — light/pastel on white */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob-pulse absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-violet-100/80 blur-[120px]" />
        <div className="animate-blob-pulse delay-300 absolute -right-20 top-10 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[100px]" />
        <div className="animate-blob-pulse delay-600 absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-100/40 blur-[80px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#0a2540 1px, transparent 1px), linear-gradient(90deg, #0a2540 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-16">
          {/* Text side */}
          <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Now supporting YouTube Shorts + LinkedIn
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100 text-5xl font-bold leading-[1.08] tracking-tight text-[#0a2540] sm:text-6xl lg:text-[64px]">
              Clip once.{' '}
              <span className="gradient-text">Post everywhere.</span>
            </h1>

            <p className="animate-fade-in-up delay-200 mt-6 text-lg leading-relaxed text-[#425466]">
              Upload an MP4 or paste a link from TikTok, Instagram, YouTube, or Facebook.
              We publish your clip to every platform simultaneously — in seconds.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#try"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:shadow-violet-300 hover:from-violet-500 hover:to-blue-400 active:scale-95"
              >
                Start publishing free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e6ebf1] px-6 py-3 text-sm font-semibold text-[#425466] transition-all hover:border-[#0a2540]/20 hover:text-[#0a2540] hover:bg-[#f6f9fc]"
              >
                See how it works
              </a>
            </div>

            {/* Social proof */}
            <div className="animate-fade-in delay-500 mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-violet-400', 'bg-blue-400', 'bg-pink-400', 'bg-emerald-400'].map((c, i) => (
                  <div key={i} className={`h-7 w-7 rounded-full border-2 border-white ${c}`} />
                ))}
              </div>
              <p className="text-sm text-[#697386]">
                <span className="font-semibold text-[#0a2540]">2,400+</span> creators publishing daily
              </p>
            </div>
          </div>

          {/* Device mockup */}
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
      {/* Soft glow */}
      <div className="absolute inset-8 rounded-[40px] bg-violet-300/30 blur-3xl" />

      {/* Phone frame */}
      <div className="animate-float relative h-[540px] w-[268px] overflow-hidden rounded-[36px] border border-gray-200 bg-white shadow-2xl shadow-gray-200">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-[#f6f9fc] px-6 pt-4 pb-2">
          <span className="text-[11px] font-semibold text-[#0a2540]">9:41</span>
          <div className="h-4 w-20 rounded-full bg-gray-900" />
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-gray-400" />
            <div className="h-2 w-3 rounded-full bg-gray-400" />
            <div className="h-2 w-3 rounded-sm bg-gray-400" />
          </div>
        </div>

        {/* App content */}
        <div className="space-y-3 px-4 pb-4 pt-2">
          {/* App header */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-600 to-blue-500" />
              <span className="text-xs font-semibold text-[#0a2540]">ClipFlow</span>
            </div>
            <div className="h-6 w-6 rounded-full bg-gray-100" />
          </div>

          {/* Upload area */}
          <div className="flex h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-600" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <div className="space-y-1 text-center">
              <div className="mx-auto h-2 w-20 rounded-full bg-gray-200" />
              <div className="mx-auto h-1.5 w-14 rounded-full bg-gray-100" />
            </div>
          </div>

          {/* Platform cards */}
          {[
            { badge: 'IG', color: 'from-pink-500 to-orange-400', w: '60%' },
            { badge: 'TT', color: 'from-zinc-600 to-zinc-800',   w: '45%' },
            { badge: 'YT', color: 'from-red-500 to-red-600',     w: '75%' },
            { badge: 'FB', color: 'from-blue-600 to-blue-700',   w: '30%' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-[9px] font-bold text-white`}>
                {p.badge}
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${p.color}`}
                    style={{ width: p.w, animation: `progressFill 1.5s ${i * 0.3}s ease both` }}
                  />
                </div>
                <div className="h-1.5 w-8 rounded-full bg-gray-100" />
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-100" />
            </div>
          ))}

          {/* Publish button */}
          <div className="flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-500">
            <div className="h-1.5 w-16 rounded-full bg-white/60" />
          </div>
        </div>
      </div>

      {/* Floating platform badges */}
      <FloatingBadge className="animate-float-reverse -left-14 top-16 delay-100" color="from-pink-500 to-orange-400" label="Instagram" badge="IG" />
      <FloatingBadge className="animate-float        -right-12 top-32 delay-300" color="from-red-500 to-red-600"     label="YouTube"   badge="YT" />
      <FloatingBadge className="animate-float-reverse -left-10 bottom-28 delay-500" color="from-blue-600 to-blue-700" label="Facebook"  badge="FB" />
      <FloatingBadge className="animate-float        -right-14 bottom-16 delay-200" color="from-zinc-600 to-zinc-800" label="TikTok"   badge="TT" />

      {/* Success toast */}
      <div className="animate-float delay-400 absolute -right-4 top-8 flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-lg">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#0a2540]">Published!</div>
          <div className="text-[9px] text-[#697386]">6 platforms · 0.8s</div>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ className, color, label, badge }: {
  className: string; color: string; label: string; badge: string;
}) {
  return (
    <div className={`absolute flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-md ${className}`}>
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${color} text-[9px] font-bold text-white`}>
        {badge}
      </div>
      <span className="text-[11px] font-semibold text-[#0a2540]">{label}</span>
    </div>
  );
}
