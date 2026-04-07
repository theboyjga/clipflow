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
            className={`group relative flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
              isSelected
                ? 'border-violet-300 bg-violet-50 shadow-sm shadow-violet-100'
                : 'border-[#e6ebf1] bg-white shadow-sm hover:border-violet-200 hover:shadow-md'
            }`}
          >
            {/* Icon — wiggle on card hover */}
            <div className={`icon-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${platform.badgeClass} text-xs font-bold text-white shadow-sm`}>
              {platform.badge}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0a2540] truncate">{platform.label}</p>
              <p className="text-xs text-[#697386] truncate">{platform.description}</p>
            </div>
            {isSelected && (
              <div className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[9px] text-white shadow-sm">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
