'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

// ── Types ──────────────────────────────────────────────────────────────────────
type Period = '7d' | '30d' | '90d';
type Tab = 'overview' | 'posts' | 'platforms';

// ── Mock data ──────────────────────────────────────────────────────────────────
const PERIODS: Period[] = ['7d', '30d', '90d'];

const STATS = [
  { label: 'Total Views',    value: '2.4M',  delta: '+18.2%', up: true  },
  { label: 'Engagements',    value: '187K',  delta: '+12.4%', up: true  },
  { label: 'New Followers',  value: '12.3K', delta: '+22.1%', up: true  },
  { label: 'Est. Reach',     value: '890K',  delta: '-3.1%',  up: false },
];

const CHART_DATA: Record<Period, number[]> = {
  '7d':  [145, 189, 201, 178, 220, 267, 289],
  '30d': [120,145,132,167,189,201,178,220,245,267,234,289,312,298,334,356,345,389,412,398,445,467,423,489,512,498,534,556,589,612],
  '90d': Array.from({ length: 90 }, (_, i) =>
    Math.round(100 + Math.sin(i / 7) * 45 + i * 5.8 + (i % 13) * 4)),
};

const PLATFORM_STATS = [
  { id: 'instagram', name: 'Instagram', badge: 'IG', views: '845K', pct: 35, color: 'from-pink-500 to-orange-400' },
  { id: 'tiktok',    name: 'TikTok',    badge: 'TT', views: '623K', pct: 26, color: 'from-zinc-600 to-zinc-800'   },
  { id: 'youtube',   name: 'YouTube',   badge: 'YT', views: '489K', pct: 20, color: 'from-red-500 to-red-600'     },
  { id: 'facebook',  name: 'Facebook',  badge: 'FB', views: '312K', pct: 13, color: 'from-blue-600 to-blue-700'   },
  { id: 'linkedin',  name: 'LinkedIn',  badge: 'LI', views: '131K', pct: 6,  color: 'from-blue-700 to-cyan-600'   },
];

const RECENT_POSTS = [
  { title: 'Morning routine tips',  color: 'from-pink-400 to-orange-300',  views: '234K', likes: '12.4K', comments: '892',  shares: '3.2K', platforms: 4, ago: '2h' },
  { title: 'Kitchen hack #47',      color: 'from-violet-400 to-blue-400',  views: '189K', likes: '9.1K',  comments: '567',  shares: '2.1K', platforms: 5, ago: '1d' },
  { title: 'Travel vlog — Bali',    color: 'from-emerald-400 to-cyan-400', views: '156K', likes: '8.3K',  comments: '423',  shares: '1.8K', platforms: 3, ago: '3d' },
  { title: 'Product review 2025',   color: 'from-amber-400 to-orange-400', views: '112K', likes: '6.7K',  comments: '312',  shares: '987',  platforms: 4, ago: '5d' },
];

// ── SVG chart helpers ──────────────────────────────────────────────────────────
interface Point { x: number; y: number }

function buildChart(data: number[], W: number, H: number, pad = 14) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts: Point[] = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: pad + (1 - (v - min) / range) * (H - pad * 2),
  }));
  let line = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = ((pts[i - 1].x + pts[i].x) / 2).toFixed(2);
    line += ` C ${cx} ${pts[i - 1].y.toFixed(2)} ${cx} ${pts[i].y.toFixed(2)} ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)}`;
  }
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(2)} ${H} L ${pts[0].x.toFixed(2)} ${H} Z`;
  return { line, area, pts };
}

function fmtVal(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function StatCard({ label, value, delta, up }: { label: string; value: string; delta: string; up: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--cf-border)] p-4 transition-all hover:shadow-md" style={{ background: 'var(--cf-page)' }}>
      <p className="mb-1 text-xs font-medium text-[var(--cf-muted)]">{label}</p>
      <p className="text-2xl font-bold tracking-tight text-[var(--cf-heading)]">{value}</p>
      <span className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
          {up
            ? <path d="M5 1l4 4H6v4H4V5H1z" />
            : <path d="M5 9L1 5h3V1h2v4h3z" />}
        </svg>
        {delta}
        <span className="font-normal text-[var(--cf-muted)]">vs last period</span>
      </span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold text-[var(--cf-heading)]">{value}</p>
      <p className="text-[10px] text-[var(--cf-muted)]">{label}</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function AnalyticsSection() {
  const [period, setPeriod] = useState<Period>('30d');
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = CHART_DATA[period];
  const W = 600, H = 140;
  const { line, area, pts } = buildChart(data, W, H);

  // Reduce dots to show for dense data (max ~60 interactive circles)
  const step = data.length > 30 ? Math.ceil(data.length / 30) : 1;
  const shownPts = pts.filter((_, i) => i % step === 0 || i === pts.length - 1);
  const shownData = data.filter((_, i) => i % step === 0 || i === data.length - 1);

  return (
    <section id="analytics" className="py-28 transition-colors duration-200" style={{ background: 'var(--cf-section)' }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Section header ── */}
        <AnimateOnScroll>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-violet-600">
            Analytics
          </p>
          <h2 className="mb-3 text-center text-4xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-5xl">
            Track every view.{' '}
            <span className="gradient-text">Every interaction.</span>
          </h2>
          <p className="mb-12 text-center text-[var(--cf-body)] max-w-xl mx-auto">
            See exactly how each post performs across all platforms — engagement, reach, growth,
            and more — in one unified dashboard.
          </p>
        </AnimateOnScroll>

        {/* ── Dashboard shell ── */}
        <AnimateOnScroll delay={100}>
          <div className="overflow-hidden rounded-2xl border border-[var(--cf-border)] shadow-xl" style={{ background: 'var(--cf-card)' }}>

            {/* Title bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--cf-border)] px-6 py-4" style={{ background: 'var(--cf-section)' }}>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-sm font-semibold text-[var(--cf-heading)]">Analytics Dashboard</span>
              </div>
              <div className="flex items-center gap-1 rounded-xl border border-[var(--cf-border)] p-1" style={{ background: 'var(--cf-page)' }}>
                {(['overview', 'posts', 'platforms'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'text-[var(--cf-muted)] hover:text-[var(--cf-heading)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">

              {/* ── Stat cards ── */}
              <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {STATS.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>

              {/* ── Area chart ── */}
              <div className="mb-6 overflow-hidden rounded-xl border border-[var(--cf-border)]" style={{ background: 'var(--cf-page)' }}>
                <div className="flex items-center justify-between border-b border-[var(--cf-border)] px-4 py-3">
                  <p className="text-sm font-semibold text-[var(--cf-heading)]">Views over time</p>
                  <div className="flex gap-1">
                    {PERIODS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                          period === p ? 'bg-violet-600 text-white' : 'text-[var(--cf-muted)] hover:text-[var(--cf-heading)]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-4 pb-2 pt-4">
                  <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="w-full"
                    style={{ height: 140 }}
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Views chart"
                  >
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0.25, 0.5, 0.75].map((f) => (
                      <line
                        key={f}
                        x1={0} y1={H * f} x2={W} y2={H * f}
                        stroke="currentColor" strokeOpacity="0.06" strokeWidth="1"
                      />
                    ))}

                    <path d={area} fill="url(#areaGrad)" />
                    <path d={line} fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Interactive dots */}
                    {shownPts.map((pt, i) => (
                      <circle
                        key={i}
                        cx={pt.x} cy={pt.y}
                        r={hoveredIdx === i ? 5.5 : 3.5}
                        fill={hoveredIdx === i ? '#7c3aed' : 'transparent'}
                        stroke={hoveredIdx === i ? '#fff' : 'transparent'}
                        strokeWidth="2"
                        style={{ cursor: 'crosshair', transition: 'r 0.12s' }}
                        onMouseEnter={() => setHoveredIdx(i)}
                        onMouseLeave={() => setHoveredIdx(null)}
                      />
                    ))}

                    {/* Tooltip */}
                    {hoveredIdx !== null && (
                      <>
                        <line
                          x1={shownPts[hoveredIdx].x} y1={0}
                          x2={shownPts[hoveredIdx].x} y2={H}
                          stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5"
                        />
                        <rect
                          x={Math.min(shownPts[hoveredIdx].x - 26, W - 60)}
                          y={shownPts[hoveredIdx].y - 32}
                          width={52} height={22} rx={6}
                          fill="#7c3aed"
                        />
                        <text
                          x={Math.min(shownPts[hoveredIdx].x, W - 34)}
                          y={shownPts[hoveredIdx].y - 16}
                          textAnchor="middle" fontSize={10} fill="white" fontWeight="700"
                        >
                          {fmtVal(shownData[hoveredIdx])}
                        </text>
                      </>
                    )}
                  </svg>

                  {/* X-axis labels */}
                  <div className="mt-1 flex justify-between">
                    {Array.from({ length: 7 }, (_, i) => {
                      const idx = Math.round((i / 6) * (data.length - 1));
                      const daysAgo = data.length - 1 - idx;
                      return (
                        <span key={i} className="text-[10px] text-[var(--cf-muted)]">
                          {daysAgo === 0 ? 'Today' : `${daysAgo}d`}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Tab content ── */}
              {activeTab !== 'platforms' ? (
                /* Posts table */
                <div>
                  <p className="mb-3 text-sm font-semibold text-[var(--cf-heading)]">Recent posts</p>
                  <div className="space-y-2">
                    {RECENT_POSTS.map((post, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-[var(--cf-border)] p-3 transition-all hover:shadow-sm"
                        style={{ background: 'var(--cf-page)' }}
                      >
                        <div className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${post.color}`} />
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[var(--cf-heading)]">{post.title}</p>
                            <p className="text-xs text-[var(--cf-muted)]">{post.platforms} platforms · {post.ago} ago</p>
                          </div>
                          <div className="hidden gap-5 sm:flex">
                            <Metric label="Views"    value={post.views}    />
                            <Metric label="Likes"    value={post.likes}    />
                            <Metric label="Comments" value={post.comments} />
                            <Metric label="Shares"   value={post.shares}   />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Platform breakdown */
                <div>
                  <p className="mb-4 text-sm font-semibold text-[var(--cf-heading)]">Platform breakdown</p>
                  <div className="space-y-4">
                    {PLATFORM_STATS.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-[10px] font-bold text-white shadow-sm`}>
                          {p.badge}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-[var(--cf-heading)]">{p.name}</span>
                            <span className="text-xs text-[var(--cf-muted)]">{p.views} · {p.pct}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'var(--cf-section)' }}>
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${p.color} transition-all duration-700`}
                              style={{ width: `${p.pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Engagement metrics grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: 'Avg. watch time',   value: '1m 42s' },
                      { label: 'Click-through rate', value: '3.8%'   },
                      { label: 'Save rate',          value: '2.1%'   },
                      { label: 'Share rate',         value: '1.4%'   },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl border border-[var(--cf-border)] p-4 text-center" style={{ background: 'var(--cf-page)' }}>
                        <p className="text-xl font-bold text-[var(--cf-heading)]">{m.value}</p>
                        <p className="mt-0.5 text-xs text-[var(--cf-muted)]">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
