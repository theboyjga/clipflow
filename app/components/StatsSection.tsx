'use client';

import { useEffect, useRef, useState } from 'react';
import AnimateOnScroll from '@/app/components/AnimateOnScroll';

const STATS = [
  { value: 8,   suffix: '',   label: 'Platforms supported',    icon: '🌐' },
  { value: 1,   suffix: '-click', label: 'Publishing flow',    icon: '⚡' },
  { value: 100, suffix: '%',  label: 'Real-time progress',     icon: '📡' },
  { value: 0,   suffix: ' setup', label: 'Account needed to try', icon: '🚀' },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#07040f] py-20 transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AnimateOnScroll>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <AnimateOnScroll key={i} delay={i * 80} direction="up">
                <div className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/4 px-4 py-8 text-center backdrop-blur-sm">
                  <span className="mb-3 text-3xl">{stat.icon}</span>
                  <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                    {stat.label}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
