'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'right' | 'none';
}

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transforms: Record<NonNullable<AnimateOnScrollProps['direction']>, string> = {
    up:    'translate-y-8',
    right: 'translate-x-8',
    none:  '',
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : `opacity-0 ${transforms[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
