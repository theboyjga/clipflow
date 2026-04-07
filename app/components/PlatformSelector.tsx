'use client';

import { PLATFORMS } from '@/app/lib/platforms';
import type { PlatformId } from '@/app/types/clipflow';

interface PlatformSelectorProps {
  selected: Set<PlatformId>;
  onChange: (updated: Set<PlatformId>) => void;
}

export default function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  function toggle(id: PlatformId) {
    const next = new Set(selected);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    onChange(next);
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {PLATFORMS.map((platform) => {
        const isSelected = selected.has(platform.id);
        return (
          <button
            key={platform.id}
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => toggle(platform.id)}
            className={`group relative flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
              isSelected
                ? 'border-orange-300 bg-orange-50 shadow-sm dark:border-orange-700 dark:bg-orange-900/20'
                : 'border-[var(--cf-border)] bg-[var(--cf-card)] shadow-sm hover:border-orange-200 hover:shadow-md dark:hover:border-orange-800'
            }`}
          >
            <div className={`icon-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${platform.badgeClass} text-xs font-bold text-white shadow-sm`}>
              {platform.badge}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--cf-heading)]">{platform.label}</p>
              <p className="truncate text-xs text-[var(--cf-muted)]">{platform.description}</p>
            </div>
            {isSelected && (
              <div className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] text-white shadow-sm">✓</div>
            )}
          </button>
        );
      })}
    </div>
  );
}
