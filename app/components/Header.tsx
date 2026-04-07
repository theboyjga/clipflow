'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '@/app/components/ThemeToggle';
import { useTheme } from '@/app/components/ThemeProvider';

const NAV_LINKS = [
  { label: 'Features',  href: '#features'   },
  { label: 'Demo',      href: '#demo'        },
  { label: 'Analytics', href: '#analytics'   },
  { label: 'Scheduler', href: '#scheduler'   },
  { label: 'Pricing',   href: '#try'         },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero is always dark — nav starts as dark-overlay, shifts to light glass after scroll
  const isHeroDark = !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHeroDark
          ? 'border-b border-white/10 bg-[#07040f]/80 backdrop-blur-xl'
          : 'glass border-b border-[var(--cf-border)]'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">

        {/* ── Logo ── */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30 transition-transform duration-200 group-hover:scale-105">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* glow ring */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-orange-400/0 transition-all duration-200 group-hover:ring-orange-400/40" />
          </div>
          <span
            className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${
              isHeroDark ? 'text-white' : 'text-[var(--cf-heading)]'
            }`}
          >
            Clip<span className="text-orange-400">Flow</span>
          </span>
        </a>

        {/* ── Nav links ── */}
        <div className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`nav-pill ${isHeroDark ? '' : 'light'}`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* ── Right CTAs ── */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="#"
            className={`hidden text-[13px] font-semibold transition-colors sm:block ${
              isHeroDark ? 'text-white/60 hover:text-white' : 'text-[var(--cf-body)] hover:text-[var(--cf-heading)]'
            }`}
          >
            Sign in
          </a>
          <a
            href="#try"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-600 to-orange-800 px-4 py-1.5 text-[13px] font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:from-orange-500 hover:to-orange-700 hover:shadow-orange-500/40 active:scale-95"
          >
            Get started
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
