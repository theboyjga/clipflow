import AnimateOnScroll from '@/app/components/AnimateOnScroll';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

const steps = [
  { step: '01', title: 'Add your clip',      body: 'Upload an MP4 from your device or paste a public link from any short-form video platform.', illustration: <UploadIllustration /> },
  { step: '02', title: 'Select destinations', body: 'Pick any combination of Instagram, TikTok, YouTube, Facebook, Twitter, and LinkedIn.',        illustration: <SelectIllustration /> },
  { step: '03', title: 'Publish in one click', body: 'Hit Publish and watch your clip go live across every platform simultaneously.',              illustration: <LiveIllustration /> },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[var(--cf-section)] py-28 transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-600">How it works</p>
          <h2 className="mx-auto mb-20 max-w-xl text-center text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
            Three steps to everywhere
          </h2>
        </AnimateOnScroll>
        <div className="flex flex-col gap-6 sm:flex-row">
          {steps.map((s, i) => (
            <AnimateOnScroll key={i} delay={i * 120} direction="up" className="flex-1">
              <StepCard {...s} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, title, body, illustration }: {
  step: string; title: string; body: string; illustration: React.ReactNode;
}) {
  return (
    <div className="group card-shadow flex flex-col overflow-hidden rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)]">
      <div className="relative h-52 overflow-hidden border-b border-[var(--cf-border)] bg-[var(--cf-section)] shimmer-placeholder">
        {illustration}
        <div className="absolute right-4 top-4 rounded-full border border-[var(--cf-border)] bg-[var(--cf-card)] px-2.5 py-1 text-xs font-semibold text-[var(--cf-muted)]">
          {step}
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-semibold text-[var(--cf-heading)]">{title}</h3>
        <p className="text-sm leading-relaxed text-[var(--cf-body)]">{body}</p>
      </div>
    </div>
  );
}

function UploadIllustration() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative mx-6 flex h-32 w-full max-w-[240px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20">
        <div className="icon-bounce flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 ring-8 ring-orange-50 dark:bg-orange-800 dark:ring-orange-900/30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-600" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
        </div>
        <div className="space-y-1 text-center">
          <div className="mx-auto h-2 w-24 rounded-full bg-[var(--cf-border)]" />
          <div className="mx-auto h-1.5 w-16 rounded-full bg-[var(--cf-section)]" />
        </div>
        <div className="absolute -right-8 -top-4 flex items-center gap-1.5 rounded-xl border border-[var(--cf-border)] bg-[var(--cf-card)] px-2.5 py-1.5 shadow-md">
          <div className="h-4 w-4 rounded bg-orange-100 dark:bg-orange-900/40" />
          <div className="h-1.5 w-12 rounded-full bg-[var(--cf-border)]" />
        </div>
      </div>
    </div>
  );
}

function SelectIllustration() {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="grid w-full max-w-[240px] grid-cols-2 gap-2">
        {(
          [
            { id: 'instagram' as PlatformId, selected: true  },
            { id: 'tiktok'    as PlatformId, selected: true  },
            { id: 'youtube'   as PlatformId, selected: false },
            { id: 'facebook'  as PlatformId, selected: true  },
            { id: 'twitter'   as PlatformId, selected: false },
            { id: 'linkedin'  as PlatformId, selected: true  },
          ]
        ).map((p) => (
          <div key={p.id} className={`flex items-center gap-2 rounded-xl p-2 ${p.selected ? 'border border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20' : 'border border-[var(--cf-border)] bg-[var(--cf-card)]'}`}>
            <PlatformIcon id={p.id} size="md" className="icon-hover h-7 w-7 rounded-lg" />
            {p.selected && <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[8px] text-white">✓</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveIllustration() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
      <div className="icon-bounce flex w-full max-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-800 py-2.5 shadow-md shadow-orange-200 dark:shadow-orange-900/40">
        <div className="h-2 w-20 rounded-full bg-white/60" />
      </div>
      <div className="flex gap-3">
        {(['instagram', 'youtube', 'facebook', 'tiktok'] as PlatformId[]).map((id) => (
          <div key={id} className="flex flex-col items-center gap-1.5">
            <PlatformIcon id={id} size="lg" className="icon-hover rounded-xl shadow-sm" />
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-100 dark:ring-emerald-900/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
