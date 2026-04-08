'use client';

import { useState } from 'react';
import AnimateOnScroll from '@/app/components/AnimateOnScroll';

const FREE_FEATURES = [
  '2 uploads per day',
  '4 platforms (Instagram, TikTok, YouTube, Facebook)',
  'ClipFlow watermark',
  'Real-time publish progress',
  'MP4 file + link import',
];

const PRO_FEATURES = [
  'Unlimited uploads',
  'All 8 platforms including X & LinkedIn',
  'No watermark',
  'No ads',
  'Twitch & Kick clip import',
  'Post scheduling & calendar',
  'Advanced analytics',
  'Priority support',
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const proPrice = annual ? 16 : 20;
  const saving   = annual ? 48 : 0;

  return (
    <section id="pricing" className="bg-[var(--cf-section)] py-24 transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-600">Pricing</p>
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
            Simple, honest pricing
          </h2>
          <p className="mb-10 text-center text-[var(--cf-body)]">
            Start free. Upgrade when you&apos;re ready.
          </p>

          {/* Billing toggle */}
          <div className="mb-12 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!annual ? 'text-[var(--cf-heading)]' : 'text-[var(--cf-muted)]'}`}>Monthly</span>
            <button
              onClick={() => setAnnual((a) => !a)}
              role="switch"
              aria-checked={annual}
              className={`relative h-6 w-11 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${annual ? 'bg-black dark:bg-white' : 'bg-[var(--cf-border)]'}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${annual ? 'translate-x-5 dark:bg-black' : 'translate-x-0.5'}`}
              />
            </button>
            <span className={`text-sm font-semibold ${annual ? 'text-[var(--cf-heading)]' : 'text-[var(--cf-muted)]'}`}>
              Annual
              {annual && (
                <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  Save ${saving}/yr
                </span>
              )}
            </span>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Free */}
          <AnimateOnScroll delay={0} direction="up">
            <div className="flex h-full flex-col rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-8 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">Free</p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-[var(--cf-heading)]">$0</span>
                <span className="text-sm text-[var(--cf-muted)]">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--cf-body)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-[var(--cf-muted)]" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/auth"
                className="block w-full rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] py-3 text-center text-sm font-bold text-[var(--cf-heading)] transition-all hover:border-[var(--cf-muted)]"
              >
                Get started free
              </a>
            </div>
          </AnimateOnScroll>

          {/* Pro */}
          <AnimateOnScroll delay={80} direction="up">
            <div className="relative flex h-full flex-col rounded-2xl border-2 border-black bg-[var(--cf-card)] p-8 shadow-lg dark:border-white">
              {/* Most popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-orange-500 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-md">
                  Most popular
                </span>
              </div>

              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">Pro</p>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-[var(--cf-heading)]">${proPrice}</span>
                <span className="text-sm text-[var(--cf-muted)]">/mo</span>
              </div>
              {annual && (
                <p className="mb-5 text-xs text-emerald-600">Billed ${proPrice * 12}/year · save ${saving}</p>
              )}
              {!annual && <div className="mb-6" />}
              <ul className="mb-8 flex-1 space-y-3">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--cf-body)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-emerald-500" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/auth"
                className="block w-full rounded-xl bg-black py-3 text-center text-sm font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
              >
                Start Pro free trial
              </a>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={200}>
          <p className="mt-8 text-center text-xs text-[var(--cf-muted)]">
            No credit card required to start. Cancel anytime.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
