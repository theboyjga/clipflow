'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

// ── Constants ──────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

// Simulate "today" matching the current date in context
const TODAY_DAY   = 7;
const TODAY_MONTH = 3; // 0-indexed = April
const TODAY_YEAR  = 2026;

const PLATFORM_COLORS: Record<string, string> = {
  IG: 'from-pink-500 to-orange-400',
  TT: 'from-zinc-600 to-zinc-800',
  YT: 'from-red-500 to-red-600',
  FB: 'from-blue-600 to-blue-700',
  LI: 'from-blue-700 to-cyan-600',
  TW: 'from-sky-500 to-blue-400',
};

type ScheduledPost = {
  title: string;
  time: string;
  platforms: string[];
  color: string;
};

const SCHEDULED: Record<number, ScheduledPost[]> = {
  7:  [{ title: 'Morning workout tips',  time: '9:00 AM',  platforms: ['IG','YT','TT'],       color: 'from-orange-500 to-orange-700'  }],
  9:  [{ title: 'Recipe video #12',      time: '2:00 PM',  platforms: ['IG','FB'],             color: 'from-pink-500 to-orange-400'    }],
  12: [
        { title: 'Weekend vlog',         time: '11:00 AM', platforms: ['YT','IG','TT','FB'],   color: 'from-emerald-500 to-cyan-500'   },
        { title: 'Q&A session',          time: '6:00 PM',  platforms: ['IG','TT'],             color: 'from-amber-500 to-orange-500'   },
      ],
  15: [{ title: 'Product unboxing',      time: '3:00 PM',  platforms: ['YT','IG','TT','FB','LI'], color: 'from-rose-500 to-pink-500'  }],
  18: [{ title: 'Behind the scenes',     time: '12:00 PM', platforms: ['IG','TT'],             color: 'from-blue-500 to-indigo-500'   }],
  22: [{ title: 'Tutorial series ep.4',  time: '10:00 AM', platforms: ['YT','IG','TT'],        color: 'from-orange-500 to-orange-700' }],
  25: [{ title: 'Monthly recap',         time: '4:00 PM',  platforms: ['IG','YT','FB','LI'],   color: 'from-teal-500 to-emerald-500'  }],
  28: [{ title: 'Collab with @creator',  time: '2:00 PM',  platforms: ['IG','TT','YT'],        color: 'from-fuchsia-500 to-pink-500'  }],
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay(); }

// ── Post card ──────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: ScheduledPost }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--cf-border)] transition-all hover:shadow-md" style={{ background: 'var(--cf-page)' }}>
      <div className={`h-1.5 w-full bg-gradient-to-r ${post.color}`} />
      <div className="p-3">
        <p className="text-sm font-semibold text-[var(--cf-heading)]">{post.title}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--cf-muted)]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          {post.time}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {post.platforms.map((pid) => (
            <span
              key={pid}
              className={`inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br ${PLATFORM_COLORS[pid] ?? 'from-gray-400 to-gray-500'} text-[9px] font-bold text-white`}
            >
              {pid}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function SchedulerSection() {
  const [viewMonth, setViewMonth] = useState({ year: TODAY_YEAR, month: TODAY_MONTH });
  const [selectedDay, setSelectedDay] = useState<number>(TODAY_DAY);

  const { year, month } = viewMonth;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay    = getFirstDayOfMonth(year, month);
  const isCurrentMonth = year === TODAY_YEAR && month === TODAY_MONTH;

  const selectedPosts = SCHEDULED[selectedDay] ?? [];

  const allUpcoming = Object.entries(SCHEDULED)
    .filter(([d]) => !isCurrentMonth || parseInt(d) >= TODAY_DAY)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .flatMap(([d, posts]) => posts.map((p) => ({ ...p, day: parseInt(d) })));

  function prevMonth() {
    setViewMonth(({ year: y, month: m }) =>
      m === 0 ? { year: y - 1, month: 11 } : { year: y, month: m - 1 }
    );
  }
  function nextMonth() {
    setViewMonth(({ year: y, month: m }) =>
      m === 11 ? { year: y + 1, month: 0 } : { year: y, month: m + 1 }
    );
  }

  return (
    <section id="scheduler" className="py-28 transition-colors duration-200" style={{ background: 'var(--cf-page)' }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Section header ── */}
        <AnimateOnScroll>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-600">
            Scheduler
          </p>
          <h2 className="mb-3 text-center text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
            Plan your content.{' '}
            <span className="gradient-text">Publish on autopilot.</span>
          </h2>
          <p className="mb-12 text-center text-[var(--cf-body)] max-w-xl mx-auto">
            Schedule posts weeks in advance across every platform.
            ClipFlow handles publishing at exactly the right moment.
          </p>
        </AnimateOnScroll>

        {/* ── Scheduler shell ── */}
        <AnimateOnScroll delay={100}>
          <div className="overflow-hidden rounded-2xl border border-[var(--cf-border)] shadow-xl" style={{ background: 'var(--cf-card)' }}>

            {/* Title bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--cf-border)] px-6 py-4" style={{ background: 'var(--cf-section)' }}>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-sm font-semibold text-[var(--cf-heading)]">Content Scheduler</span>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-orange-800 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:from-orange-500 hover:to-orange-700">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Schedule post
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">

              {/* ── Calendar panel ── */}
              <div className="flex-1 border-b border-[var(--cf-border)] p-6 lg:border-b-0 lg:border-r">

                {/* Month navigation */}
                <div className="mb-5 flex items-center justify-between">
                  <button
                    onClick={prevMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-lg leading-none text-[var(--cf-muted)] transition-colors hover:bg-[var(--cf-section)] hover:text-[var(--cf-heading)]"
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <h3 className="text-base font-bold text-[var(--cf-heading)]">
                    {MONTH_NAMES[month]} {year}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-lg leading-none text-[var(--cf-muted)] transition-colors hover:bg-[var(--cf-section)] hover:text-[var(--cf-heading)]"
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>

                {/* Day-of-week headers */}
                <div className="mb-1 grid grid-cols-7 text-center">
                  {DAY_LABELS.map((d) => (
                    <div key={d} className="py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--cf-muted)]">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-0.5">
                  {/* Padding cells */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const hasPosts    = !!SCHEDULED[day]?.length;
                    const postCount   = SCHEDULED[day]?.length ?? 0;
                    const isToday     = isCurrentMonth && day === TODAY_DAY;
                    const isSelected  = day === selectedDay;
                    const isPast      = isCurrentMonth && day < TODAY_DAY;

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`relative flex flex-col items-center rounded-lg px-1 py-1.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                          isSelected
                            ? 'bg-orange-600 text-white shadow-md'
                            : isToday
                            ? 'border border-orange-400 font-semibold text-orange-600'
                            : isPast
                            ? 'text-[var(--cf-border)] hover:bg-[var(--cf-section)]'
                            : 'text-[var(--cf-heading)] hover:bg-[var(--cf-section)]'
                        }`}
                        aria-label={`${MONTH_NAMES[month]} ${day}${hasPosts ? `, ${postCount} post${postCount > 1 ? 's' : ''} scheduled` : ''}`}
                      >
                        <span className="font-medium">{day}</span>
                        {hasPosts && (
                          <div className="mt-0.5 flex gap-0.5">
                            {Array.from({ length: Math.min(postCount, 3) }).map((_, j) => (
                              <div
                                key={j}
                                className={`h-1 w-1 rounded-full ${isSelected ? 'bg-white/70' : 'bg-orange-500'}`}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-5 flex flex-wrap gap-4 border-t border-[var(--cf-border)] pt-4">
                  {[
                    { color: 'bg-orange-600', label: 'Selected' },
                    { color: 'border border-orange-400', label: 'Today' },
                    { color: 'bg-orange-500', label: 'Has posts' },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                      <span className="text-[11px] text-[var(--cf-muted)]">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Side panel ── */}
              <div className="w-full p-6 lg:w-80">

                {selectedPosts.length > 0 ? (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-bold text-[var(--cf-heading)]">
                        {MONTH_NAMES[month]} {selectedDay}
                      </p>
                      <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                        {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {selectedPosts.map((post, i) => (
                        <PostCard key={i} post={post} />
                      ))}
                    </div>
                    <button className="mt-4 w-full rounded-xl border-2 border-dashed border-[var(--cf-border)] py-3 text-xs font-semibold text-[var(--cf-muted)] transition-all hover:border-orange-300 hover:text-orange-600">
                      + Add another post
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mb-4 text-sm font-bold text-[var(--cf-heading)]">
                      {MONTH_NAMES[month]} {selectedDay}
                    </p>
                    <div className="mb-6 flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-[var(--cf-border)] py-8 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--cf-section)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--cf-muted)]" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                          <path d="M12 14v4M10 16h4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--cf-heading)]">No posts scheduled</p>
                        <p className="mt-0.5 text-xs text-[var(--cf-muted)]">Click a day with dots to view scheduled posts</p>
                      </div>
                      <button className="rounded-lg bg-gradient-to-r from-orange-600 to-orange-800 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:from-orange-500 hover:to-orange-700">
                        Schedule a post
                      </button>
                    </div>

                    {/* Upcoming list */}
                    {allUpcoming.length > 0 && (
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--cf-muted)]">
                          Upcoming
                        </p>
                        <div className="space-y-2">
                          {allUpcoming.slice(0, 4).map((post, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedDay(post.day)}
                              className="flex w-full items-center gap-2.5 rounded-xl border border-[var(--cf-border)] p-2.5 text-left transition-all hover:border-orange-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                              style={{ background: 'var(--cf-page)' }}
                            >
                              <div className={`h-9 w-1.5 shrink-0 rounded-full bg-gradient-to-b ${post.color}`} />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-semibold text-[var(--cf-heading)]">{post.title}</p>
                                <p className="text-[10px] text-[var(--cf-muted)]">
                                  {MONTH_NAMES[month].slice(0, 3)} {post.day} · {post.time}
                                </p>
                              </div>
                              <div className="flex gap-0.5">
                                {post.platforms.slice(0, 3).map((pid) => (
                                  <span
                                    key={pid}
                                    className={`inline-flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br ${PLATFORM_COLORS[pid] ?? 'from-gray-400 to-gray-500'} text-[8px] font-bold text-white`}
                                  >
                                    {pid.charAt(0)}
                                  </span>
                                ))}
                                {post.platforms.length > 3 && (
                                  <span className="text-[10px] text-[var(--cf-muted)]">+{post.platforms.length - 3}</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
