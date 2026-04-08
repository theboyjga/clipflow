'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

type Step = 1 | 2 | 3;

const CONTENT_FOCUSES = [
  'Gaming', 'Lifestyle', 'Music', 'Comedy', 'Education', 'Sports', 'Tech', 'Other',
];

const CONNECTABLE: { id: PlatformId; label: string }[] = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok',   label: 'TikTok'    },
  { id: 'youtube',  label: 'YouTube'   },
  { id: 'twitter',  label: 'X / Twitter' },
  { id: 'facebook', label: 'Facebook'  },
  { id: 'linkedin', label: 'LinkedIn'  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep]               = useState<Step>(1);
  const [focuses, setFocuses]         = useState<Set<string>>(new Set());
  const [connected, setConnected]     = useState<Set<PlatformId>>(new Set());

  function toggleFocus(f: string) {
    setFocuses((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f); else next.add(f);
      return next;
    });
  }

  function toggleConnect(id: PlatformId) {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const STEPS = [
    { n: 1, label: 'Content focus' },
    { n: 2, label: 'Connect accounts' },
    { n: 3, label: 'Choose plan' },
  ];

  return (
    <div>
      {/* Step indicators */}
      <div className="mb-7 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex flex-1 items-center gap-2">
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
              step > s.n ? 'bg-emerald-500 text-white' :
              step === s.n ? 'bg-black text-white dark:bg-white dark:text-black' :
              'bg-[var(--cf-section)] text-[var(--cf-muted)]'
            }`}>
              {step > s.n ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : s.n}
            </div>
            <span className={`hidden text-xs sm:block ${step === s.n ? 'font-semibold text-[var(--cf-heading)]' : 'text-[var(--cf-muted)]'}`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-[var(--cf-border)]" />}
          </div>
        ))}
      </div>

      {/* Step 1: Content focus */}
      {step === 1 && (
        <div>
          <h2 className="mb-1.5 text-xl font-bold text-[var(--cf-heading)]">What kind of content do you make?</h2>
          <p className="mb-6 text-sm text-[var(--cf-muted)]">Pick all that apply. We&apos;ll personalise your experience.</p>
          <div className="mb-8 grid grid-cols-2 gap-2.5">
            {CONTENT_FOCUSES.map((f) => {
              const sel = focuses.has(f);
              return (
                <button
                  key={f}
                  onClick={() => toggleFocus(f)}
                  className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
                    sel
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-[var(--cf-border)] bg-[var(--cf-section)] text-[var(--cf-body)] hover:border-[var(--cf-muted)]'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(2)} className="btn-auth-primary w-full">
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Connect accounts */}
      {step === 2 && (
        <div>
          <h2 className="mb-1.5 text-xl font-bold text-[var(--cf-heading)]">Connect your accounts</h2>
          <p className="mb-6 text-sm text-[var(--cf-muted)]">Connect now or do it later from your dashboard settings.</p>
          <div className="mb-8 space-y-2.5">
            {CONNECTABLE.map(({ id, label }) => {
              const conn = connected.has(id);
              return (
                <div key={id} className="flex items-center justify-between rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <PlatformIcon id={id} size="md" />
                    <span className="text-sm font-semibold text-[var(--cf-heading)]">{label}</span>
                  </div>
                  <button
                    onClick={() => toggleConnect(id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      conn
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black'
                    }`}
                  >
                    {conn ? '✓ Connected' : 'Connect'}
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => setStep(3)} className="btn-auth-primary w-full">
            Continue
          </button>
          <button onClick={() => setStep(3)} className="mt-2.5 w-full py-2 text-sm text-[var(--cf-muted)] hover:text-[var(--cf-heading)]">
            Skip for now
          </button>
        </div>
      )}

      {/* Step 3: Choose plan */}
      {step === 3 && (
        <div>
          <h2 className="mb-1.5 text-xl font-bold text-[var(--cf-heading)]">Start for free or go Pro</h2>
          <p className="mb-6 text-sm text-[var(--cf-muted)]">No credit card required to start.</p>
          <div className="mb-4 space-y-3">
            {/* Free */}
            <div className="rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[var(--cf-heading)]">Free</p>
                  <p className="text-xs text-[var(--cf-muted)]">2 uploads/day · watermark · 4 platforms</p>
                </div>
                <span className="text-xl font-extrabold text-[var(--cf-heading)]">$0</span>
              </div>
            </div>
            {/* Pro */}
            <div className="rounded-xl border-2 border-black bg-[var(--cf-card)] p-4 dark:border-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[var(--cf-heading)]">Pro</p>
                    <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">POPULAR</span>
                  </div>
                  <p className="text-xs text-[var(--cf-muted)]">Unlimited · no watermark · all 8 platforms</p>
                </div>
                <span className="text-xl font-extrabold text-[var(--cf-heading)]">$20<span className="text-xs font-normal">/mo</span></span>
              </div>
            </div>
          </div>
          <button onClick={() => router.push('/dashboard')} className="btn-auth-primary w-full mb-2">
            Start Pro free trial
          </button>
          <button onClick={() => router.push('/dashboard')} className="w-full py-2 text-sm text-[var(--cf-muted)] hover:text-[var(--cf-heading)]">
            Continue with free
          </button>
        </div>
      )}
    </div>
  );
}
