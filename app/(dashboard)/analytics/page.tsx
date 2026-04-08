import TopBar from '@/app/components/dashboard/TopBar';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

const STAT_CARDS = [
  { label: 'Total posts',       value: '47',   sub: 'all time',          icon: '📹' },
  { label: 'Posts this week',   value: '6',    sub: '+2 from last week', icon: '📈' },
  { label: 'Most used platform',value: 'TikTok', sub: '18 posts',        icon: '🏆' },
  { label: 'Upload streak',     value: '9 days', sub: 'keep it up!',     icon: '🔥' },
];

const PLATFORM_STATS: { id: PlatformId; label: string; posts: number; reach: string; barColor: string }[] = [
  { id: 'tiktok',    label: 'TikTok',    posts: 18, reach: '142K', barColor: 'from-zinc-600 to-zinc-800'   },
  { id: 'instagram', label: 'Instagram', posts: 14, reach: '88K',  barColor: 'from-pink-500 to-orange-400' },
  { id: 'youtube',   label: 'YouTube',   posts: 9,  reach: '52K',  barColor: 'from-red-500 to-red-700'     },
  { id: 'facebook',  label: 'Facebook',  posts: 4,  reach: '21K',  barColor: 'from-blue-600 to-blue-800'   },
  { id: 'twitter',   label: 'X / Twitter', posts: 2, reach: '8K', barColor: 'from-zinc-700 to-zinc-950'   },
];

export default function AnalyticsPage() {
  const maxPosts = Math.max(...PLATFORM_STATS.map((p) => p.posts));

  return (
    <>
      <TopBar title="Analytics" />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 space-y-8">

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STAT_CARDS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-5">
                <span className="text-2xl">{s.icon}</span>
                <p className="mt-2 text-2xl font-extrabold text-[var(--cf-heading)]">{s.value}</p>
                <p className="text-xs font-semibold text-[var(--cf-muted)]">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-[var(--cf-muted)] opacity-70">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Platform breakdown */}
          <div className="rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-6">
            <h2 className="mb-6 font-bold text-[var(--cf-heading)]">Platform breakdown</h2>
            <div className="space-y-4">
              {PLATFORM_STATS.map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <PlatformIcon id={p.id} size="md" />
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--cf-heading)]">{p.label}</span>
                      <span className="text-xs text-[var(--cf-muted)]">{p.posts} posts · {p.reach} reach</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--cf-section)]">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${p.barColor}`}
                        style={{ width: `${(p.posts / maxPosts) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade prompt for free users */}
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-800 dark:bg-orange-900/15">
            <p className="font-semibold text-orange-700 dark:text-orange-400">Want deeper insights?</p>
            <p className="mt-1 text-sm text-orange-600/80 dark:text-orange-500/80">
              Upgrade to Pro for per-post analytics, click-through rates, audience growth charts, and more.
            </p>
            <a href="/#pricing" className="mt-3 inline-block rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600">
              Upgrade to Pro →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
