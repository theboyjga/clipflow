'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateOnScroll from '@/app/components/AnimateOnScroll';

const FAQS = [
  {
    q: 'What platforms does ClipFlow support?',
    a: 'ClipFlow publishes to Instagram Reels, TikTok, YouTube Shorts, Facebook Reels, X (Twitter), and LinkedIn — 6 publishing destinations in total. You can import clips from TikTok, Instagram, YouTube, Facebook, Twitch, and Kick.',
  },
  {
    q: 'Do I need accounts on each platform?',
    a: 'Yes, you connect your accounts once in your ClipFlow dashboard. After that, all publishing is handled automatically. You can connect and disconnect platforms at any time from your settings.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Absolutely. The Free plan lets you upload 2 clips per day to 4 platforms with a ClipFlow watermark. The Pro plan ($20/mo or $16/mo annual) removes all limits and the watermark, and unlocks scheduling, analytics, Twitch & Kick import, and all 8 platforms.',
  },
  {
    q: 'Does ClipFlow re-encode my video?',
    a: 'No — ClipFlow uploads your original file as-is to each platform. This means no quality loss. Each platform applies its own compression after receiving the file.',
  },
  {
    q: 'Can I schedule posts in advance?',
    a: 'Scheduling is a Pro feature. You can pick a specific date and time for your clip to go live on each platform. Scheduled posts appear in your dashboard calendar where you can edit or cancel them.',
  },
  {
    q: 'How do I import a Twitch or Kick clip?',
    a: 'On the upload screen, switch to the "Paste link" tab and paste your clip URL. For Twitch: use a clips.twitch.tv URL. For Kick: use a kick.com clip URL. ClipFlow will detect the source automatically and import the clip for you.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[var(--cf-page)] py-24 transition-colors duration-200">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-600">FAQ</p>
          <h2 className="mb-14 text-center text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
            Frequently asked questions
          </h2>
        </AnimateOnScroll>

        <div className="divide-y divide-[var(--cf-border)] overflow-hidden rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] shadow-sm">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--cf-section)]"
              >
                <span className="text-sm font-semibold text-[var(--cf-heading)] sm:text-base">{faq.q}</span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--cf-border)] text-[var(--cf-muted)] transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--cf-body)]">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
