import AnimateOnScroll from '@/app/components/AnimateOnScroll';

const TESTIMONIALS = [
  {
    quote: "I used to spend 45 minutes manually posting to each platform. Now it's literally one click. ClipFlow saved my whole morning routine.",
    name: '@jaylen_creates',
    meta: '120K followers · Gaming',
    avatar: 'J',
    avatarBg: 'bg-orange-500',
  },
  {
    quote: "ClipFlow is the only tool I recommend to creators just starting out. It's free, it's fast, and it just works.",
    name: '@micawaves',
    meta: '38K followers · Lifestyle',
    avatar: 'M',
    avatarBg: 'bg-pink-500',
  },
  {
    quote: "The real-time progress tracker is chef's kiss. No more wondering if it posted to TikTok or got stuck somewhere.",
    name: '@taraaasaurus',
    meta: '85K followers · Comedy',
    avatar: 'T',
    avatarBg: 'bg-emerald-500',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[var(--cf-page)] py-20 transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AnimateOnScroll>
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-orange-600">
            Loved by creators
          </p>
          <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-[var(--cf-heading)] sm:text-4xl">
            What creators are saying
          </h2>
        </AnimateOnScroll>

        <div className="grid gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 100} direction="up">
              <div className="flex h-full flex-col rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-6 shadow-sm">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-orange-400">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="flex-1 text-sm leading-relaxed text-[var(--cf-body)]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-[var(--cf-border)] pt-4">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${t.avatarBg} text-sm font-bold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--cf-heading)]">{t.name}</p>
                    <p className="text-xs text-[var(--cf-muted)]">{t.meta}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
