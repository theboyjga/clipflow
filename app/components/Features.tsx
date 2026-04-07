import AnimateOnScroll from '@/app/components/AnimateOnScroll';

const features = [
  {
    badge: '01',
    title: 'Import from anywhere',
    description:
      'Paste a link from TikTok, Instagram Reels, YouTube Shorts, or Facebook — or upload an MP4 directly. We handle the rest.',
    placeholder: <ImportPlaceholder />,
  },
  {
    badge: '02',
    title: 'One click to all platforms',
    description:
      'No more logging in to six different apps. Select your destinations and hit publish. Your clip goes everywhere at once.',
    placeholder: <PublishPlaceholder />,
  },
  {
    badge: '03',
    title: 'Real-time progress',
    description:
      'Watch each platform update live as your clip uploads. Get instant confirmation when every channel goes live.',
    placeholder: <ProgressPlaceholder />,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[var(--cf-page)] py-24 transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-600">
            Why ClipFlow
          </p>
          <h2 className="mx-auto mb-16 max-w-2xl text-center text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
            Everything you need to go viral — on every platform
          </h2>
        </AnimateOnScroll>

        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f, i) => (
            <AnimateOnScroll key={i} delay={i * 100} direction="up">
              <FeatureCard {...f} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ badge, title, description, placeholder }: {
  badge: string; title: string; description: string; placeholder: React.ReactNode;
}) {
  return (
    <div className="group card-shadow flex flex-col overflow-hidden rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)]">
      <div className="h-48 overflow-hidden border-b border-[var(--cf-border)] bg-[var(--cf-section)] shimmer-placeholder">
        {placeholder}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">{badge}</span>
        <h3 className="mb-2 text-base font-semibold text-[var(--cf-heading)]">{title}</h3>
        <p className="text-sm leading-relaxed text-[var(--cf-body)]">{description}</p>
      </div>
    </div>
  );
}

function ImportPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-5">
      <div className="flex gap-2.5">
        {[
          { label: 'TT', color: 'from-zinc-700 to-zinc-900' },
          { label: 'IG', color: 'from-pink-500 to-orange-400' },
          { label: 'YT', color: 'from-red-500 to-red-700' },
          { label: 'FB', color: 'from-blue-600 to-blue-800' },
        ].map((p, i) => (
          <div key={i} className={`icon-hover flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} text-xs font-bold text-white shadow-md`}>
            {p.label}
          </div>
        ))}
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-600" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
      <div className="flex w-full max-w-[180px] items-center gap-2.5 rounded-xl border border-[var(--cf-border)] bg-[var(--cf-card)] px-3 py-2.5 shadow-sm">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-900/30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-600" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-20 rounded-full bg-[var(--cf-border)]" />
          <div className="h-1.5 w-12 rounded-full bg-[var(--cf-section)]" />
        </div>
      </div>
    </div>
  );
}

function PublishPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-5">
      <div className="icon-bounce flex w-full max-w-[180px] items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-800 py-2.5 shadow-md shadow-orange-200 dark:shadow-orange-900/40">
        <div className="h-2 w-24 rounded-full bg-white/60" />
      </div>
      <div className="flex w-full max-w-[200px] flex-col gap-2">
        {[
          { color: 'from-pink-500 to-orange-400', label: 'IG', w: '70%' },
          { color: 'from-zinc-700 to-zinc-900',   label: 'TT', w: '55%' },
          { color: 'from-red-500 to-red-700',     label: 'YT', w: '80%' },
          { color: 'from-blue-600 to-blue-800',   label: 'FB', w: '40%' },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`icon-hover flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${p.color} text-[8px] font-bold text-white`}>{p.label}</div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--cf-border)]">
              <div className={`h-full rounded-full bg-gradient-to-r ${p.color}`} style={{ width: p.w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressPlaceholder() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      {[
        { label: 'Instagram', badge: 'IG', color: 'from-pink-500 to-orange-400', status: 'Done ✓',       statusColor: 'text-emerald-500', pct: 100 },
        { label: 'TikTok',    badge: 'TT', color: 'from-zinc-600 to-zinc-800',   status: 'Uploading 67%', statusColor: 'text-[var(--cf-muted)]',   pct: 67  },
        { label: 'YouTube',   badge: 'YT', color: 'from-red-500 to-red-600',     status: 'Done ✓',       statusColor: 'text-emerald-500', pct: 100 },
        { label: 'Facebook',  badge: 'FB', color: 'from-blue-600 to-blue-700',   status: 'Waiting…',     statusColor: 'text-[var(--cf-border)]',    pct: 0   },
      ].map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`icon-hover flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${p.color} text-[8px] font-bold text-white`}>{p.badge}</div>
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[var(--cf-heading)]">{p.label}</span>
              <span className={`text-[9px] font-semibold ${p.statusColor}`}>{p.status}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--cf-border)]">
              <div className={`h-full rounded-full bg-gradient-to-r ${p.color}`} style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
