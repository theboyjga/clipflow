import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

const platforms: { id: PlatformId; label: string }[] = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok',    label: 'TikTok'    },
  { id: 'youtube',   label: 'YouTube'   },
  { id: 'facebook',  label: 'Facebook'  },
  { id: 'twitter',   label: 'Twitter/X' },
  { id: 'linkedin',  label: 'LinkedIn'  },
];

export default function PlatformLogos() {
  return (
    <div className="border-y border-[var(--cf-border)] bg-[var(--cf-section)] py-10 transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">
          Publish to all your platforms at once
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {platforms.map((p) => (
            <div
              key={p.id}
              className="platform-pill flex cursor-default items-center gap-2.5 rounded-full border border-[var(--cf-border)] bg-[var(--cf-card)] px-4 py-2 shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-md"
            >
              <PlatformIcon id={p.id} size="md" />
              <span className="text-sm font-medium text-[var(--cf-body)]">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
