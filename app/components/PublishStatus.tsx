'use client';

import { getPlatform } from '@/app/lib/platforms';
import type { AppPhase, PublishStep } from '@/app/types/clipflow';

interface PublishStatusProps {
  steps: PublishStep[];
  phase: AppPhase;
  onReset: () => void;
}

export default function PublishStatus({ steps, phase, onReset }: PublishStatusProps) {
  const doneCount  = steps.filter((s) => s.status === 'done').length;
  const errorCount = steps.filter((s) => s.status === 'error').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0a2540]">
          {phase === 'complete' ? 'All done!' : 'Publishing your clip…'}
        </h2>
        {phase === 'complete' && (
          <p className="text-sm text-[#697386]">
            {doneCount} succeeded{errorCount > 0 ? `, ${errorCount} failed` : ''}
          </p>
        )}
      </div>

      <div className="divide-y divide-[#e6ebf1] overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
        {steps.map((step, i) => {
          const platform = getPlatform(step.platformId);
          return (
            <div key={step.platformId} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? '' : ''}`}>
              {/* Icon */}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${platform.badgeClass} text-xs font-bold text-white`}>
                {platform.badge}
              </div>

              {/* Label + bar */}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-[#0a2540]">{platform.label}</span>
                  <StatusBadge step={step} />
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={step.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Uploading to ${platform.label}`}
                  className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      step.status === 'done'  ? 'bg-emerald-500' :
                      step.status === 'error' ? 'bg-red-500' :
                      `bg-gradient-to-r ${platform.badgeClass}`
                    }`}
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {phase === 'complete' && (
        <button
          onClick={onReset}
          className="w-full rounded-xl border border-[#e6ebf1] bg-white py-3 text-sm font-semibold text-[#425466] shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          Publish another clip
        </button>
      )}
    </div>
  );
}

function StatusBadge({ step }: { step: PublishStep }) {
  if (step.status === 'idle')
    return <span className="text-xs text-gray-300">Waiting…</span>;
  if (step.status === 'uploading')
    return <span className="animate-pulse text-xs font-medium text-[#697386]">Uploading {step.progress}%</span>;
  if (step.status === 'done')
    return <span className="text-xs font-semibold text-emerald-600">Done ✓</span>;
  return <span className="text-xs font-semibold text-red-500">Failed ✗</span>;
}
