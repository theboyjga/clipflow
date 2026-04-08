'use client';

import { useState } from 'react';
import TopBar from '@/app/components/dashboard/TopBar';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

// Mock scheduled posts
const SCHEDULED = [
  { id: 1, date: '2026-04-08', platform: 'instagram' as PlatformId, title: 'Gaming highlight #1', status: 'scheduled' },
  { id: 2, date: '2026-04-08', platform: 'tiktok'    as PlatformId, title: 'Gaming highlight #1', status: 'scheduled' },
  { id: 3, date: '2026-04-10', platform: 'youtube'   as PlatformId, title: 'Twitch clip recap',   status: 'scheduled' },
  { id: 4, date: '2026-04-07', platform: 'instagram' as PlatformId, title: 'Studio vlog',         status: 'published' },
  { id: 5, date: '2026-04-07', platform: 'facebook'  as PlatformId, title: 'Studio vlog',         status: 'published' },
  { id: 6, date: '2026-04-05', platform: 'tiktok'    as PlatformId, title: 'Weekend edit',        status: 'published' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function CalendarPage() {
  const today = new Date(2026, 3, 7); // April 7 2026
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }

  function dateStr(d: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  const selectedPosts = selected ? SCHEDULED.filter((p) => p.date === selected) : [];

  return (
    <>
      <TopBar title="Calendar" />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
          <div className="rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] shadow-sm">
            {/* Month nav */}
            <div className="flex items-center justify-between border-b border-[var(--cf-border)] px-6 py-4">
              <button onClick={prevMonth} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--cf-section)] text-[var(--cf-muted)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <h2 className="font-bold text-[var(--cf-heading)]">{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[var(--cf-section)] text-[var(--cf-muted)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-[var(--cf-border)]">
              {DAYS.map((d) => (
                <div key={d} className="py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--cf-muted)]">{d}</div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7">
              {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} className="border-b border-r border-[var(--cf-border)] p-2 min-h-[80px]" />)}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const ds = dateStr(day);
                const posts = SCHEDULED.filter((p) => p.date === ds);
                const isToday = ds === '2026-04-07';
                const isSel   = selected === ds;
                return (
                  <div
                    key={day}
                    onClick={() => setSelected(isSel ? null : ds)}
                    className={`min-h-[80px] cursor-pointer border-b border-r border-[var(--cf-border)] p-2 transition-colors hover:bg-[var(--cf-section)] ${isSel ? 'bg-[var(--cf-section)]' : ''}`}
                  >
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${isToday ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-[var(--cf-body)]'}`}>
                      {day}
                    </span>
                    <div className="mt-1 flex flex-wrap gap-0.5">
                      {posts.map((p) => (
                        <PlatformIcon key={p.id} id={p.platform} size="sm" className="h-3.5 w-3.5 rounded-sm text-[6px]" />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected day detail */}
          {selected && selectedPosts.length > 0 && (
            <div className="mt-6 rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-5">
              <h3 className="mb-4 font-semibold text-[var(--cf-heading)]">{selected}</h3>
              <div className="space-y-3">
                {selectedPosts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <PlatformIcon id={p.platform} size="md" />
                      <span className="text-sm text-[var(--cf-heading)]">{p.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${p.status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                        {p.status}
                      </span>
                      {p.status === 'scheduled' && (
                        <button className="text-xs text-red-500 hover:underline">Cancel</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
