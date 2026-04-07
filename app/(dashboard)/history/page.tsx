'use client';

import { useState } from 'react';
import TopBar from '@/app/components/dashboard/TopBar';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

type Status = 'published' | 'failed' | 'scheduled';

const HISTORY: { id: number; platform: PlatformId; title: string; date: string; status: Status }[] = [
  { id: 1,  platform: 'instagram', title: 'Gaming highlight reel',   date: 'Apr 7, 2026',  status: 'published' },
  { id: 2,  platform: 'tiktok',    title: 'Gaming highlight reel',   date: 'Apr 7, 2026',  status: 'published' },
  { id: 3,  platform: 'youtube',   title: 'Gaming highlight reel',   date: 'Apr 7, 2026',  status: 'failed'    },
  { id: 4,  platform: 'facebook',  title: 'Studio setup tour',       date: 'Apr 6, 2026',  status: 'published' },
  { id: 5,  platform: 'instagram', title: 'Studio setup tour',       date: 'Apr 6, 2026',  status: 'published' },
  { id: 6,  platform: 'tiktok',    title: 'Reaction video clip',     date: 'Apr 5, 2026',  status: 'published' },
  { id: 7,  platform: 'youtube',   title: 'Reaction video clip',     date: 'Apr 5, 2026',  status: 'published' },
  { id: 8,  platform: 'twitter',   title: 'Quick tip #4',            date: 'Apr 4, 2026',  status: 'failed'    },
  { id: 9,  platform: 'linkedin',  title: 'Industry insight clip',   date: 'Apr 3, 2026',  status: 'published' },
  { id: 10, platform: 'instagram', title: 'Weekend highlights',      date: 'Apr 2, 2026',  status: 'published' },
];

const STATUS_STYLES: Record<Status, string> = {
  published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  failed:    'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  scheduled: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const PER_PAGE = 10;

export default function HistoryPage() {
  const [platformFilter, setPlatformFilter] = useState<PlatformId | 'all'>('all');
  const [statusFilter, setStatusFilter]     = useState<Status | 'all'>('all');
  const [page, setPage] = useState(1);

  const filtered = HISTORY.filter((h) =>
    (platformFilter === 'all' || h.platform === platformFilter) &&
    (statusFilter   === 'all' || h.status   === statusFilter)
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const PLATFORMS_USED = ['all', ...Array.from(new Set(HISTORY.map((h) => h.platform)))] as (PlatformId | 'all')[];

  return (
    <>
      <TopBar title="History" />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">

          {/* Filters */}
          <div className="mb-5 flex flex-wrap gap-3">
            <select
              value={platformFilter}
              onChange={(e) => { setPlatformFilter(e.target.value as PlatformId | 'all'); setPage(1); }}
              className="auth-field w-auto rounded-xl text-xs"
            >
              <option value="all">All platforms</option>
              {PLATFORMS_USED.filter((p) => p !== 'all').map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as Status | 'all'); setPage(1); }}
              className="auth-field w-auto rounded-xl text-xs"
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] shadow-sm">
            <div className="hidden grid-cols-[auto_1fr_auto_auto_auto] gap-4 border-b border-[var(--cf-border)] px-5 py-3 sm:grid">
              {['Platform', 'Title', 'Date', 'Status', ''].map((h) => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cf-muted)]">{h}</span>
              ))}
            </div>
            <div className="divide-y divide-[var(--cf-border)]">
              {paginated.map((row) => (
                <div key={row.id} className="flex flex-col gap-2 px-5 py-4 sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto] sm:items-center sm:gap-4">
                  <PlatformIcon id={row.platform} size="md" />
                  <span className="text-sm font-semibold text-[var(--cf-heading)]">{row.title}</span>
                  <span className="text-xs text-[var(--cf-muted)]">{row.date}</span>
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                  {row.status === 'failed' ? (
                    <button className="text-xs font-semibold text-orange-500 hover:underline">Retry</button>
                  ) : (
                    <span />
                  )}
                </div>
              ))}
              {paginated.length === 0 && (
                <div className="px-5 py-10 text-center text-sm text-[var(--cf-muted)]">No posts match your filters.</div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg border border-[var(--cf-border)] px-3 py-1.5 text-xs font-semibold disabled:opacity-40">Prev</button>
              <span className="text-xs text-[var(--cf-muted)]">Page {page} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg border border-[var(--cf-border)] px-3 py-1.5 text-xs font-semibold disabled:opacity-40">Next</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
