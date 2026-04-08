import { AnimatedGroup } from '@/app/components/ui/animated-group';
import AnimateOnScroll from '@/app/components/AnimateOnScroll';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

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

        <AnimatedGroup
          preset="blur-slide"
          className="grid gap-5 sm:grid-cols-3"
          variants={{
            container: {
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
            },
            item: {
              hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
              visible: {
                opacity: 1, y: 0, filter: 'blur(0px)',
                transition: { type: 'spring', bounce: 0.25, duration: 0.9 },
              },
            },
          }}
        >
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </AnimatedGroup>
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
        {(['tiktok', 'instagram', 'youtube', 'facebook'] as PlatformId[]).map((id) => (
          <PlatformIcon key={id} id={id} size="lg" className="icon-hover h-10 w-10 rounded-xl shadow-md" />
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
        {(
          [
            { id: 'instagram' as PlatformId, barColor: 'from-pink-500 to-orange-400', w: '70%' },
            { id: 'tiktok'    as PlatformId, barColor: 'from-zinc-700 to-zinc-900',   w: '55%' },
            { id: 'youtube'   as PlatformId, barColor: 'from-red-500 to-red-700',     w: '80%' },
            { id: 'facebook'  as PlatformId, barColor: 'from-blue-600 to-blue-800',   w: '40%' },
          ]
        ).map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <PlatformIcon id={p.id} size="sm" className="icon-hover h-5 w-5 shrink-0 rounded-md" />
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--cf-border)]">
              <div className={`h-full rounded-full bg-gradient-to-r ${p.barColor}`} style={{ width: p.w }} />
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
      {(
        [
          { id: 'instagram' as PlatformId, label: 'Instagram', barColor: 'from-pink-500 to-orange-400', status: 'Done ✓',        statusColor: 'text-emerald-500',         pct: 100 },
          { id: 'tiktok'    as PlatformId, label: 'TikTok',    barColor: 'from-zinc-600 to-zinc-800',   status: 'Uploading 67%',  statusColor: 'text-[var(--cf-muted)]',   pct: 67  },
          { id: 'youtube'   as PlatformId, label: 'YouTube',   barColor: 'from-red-500 to-red-600',     status: 'Done ✓',        statusColor: 'text-emerald-500',         pct: 100 },
          { id: 'facebook'  as PlatformId, label: 'Facebook',  barColor: 'from-blue-600 to-blue-700',   status: 'Waiting…',       statusColor: 'text-[var(--cf-border)]',  pct: 0   },
        ]
      ).map((p) => (
        <div key={p.id} className="flex items-center gap-2">
          <PlatformIcon id={p.id} size="sm" className="icon-hover h-6 w-6 shrink-0 rounded-md" />
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[var(--cf-heading)]">{p.label}</span>
              <span className={`text-[9px] font-semibold ${p.statusColor}`}>{p.status}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--cf-border)]">
              <div className={`h-full rounded-full bg-gradient-to-r ${p.barColor}`} style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
