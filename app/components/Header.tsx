'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '@/app/components/ThemeToggle';
import ClipFlowLogo from '@/app/components/ui/ClipFlowLogo';

const NAV_LINKS = [
  { label: 'Features',  href: '#features'   },
  { label: 'Demo',      href: '#demo'        },
  { label: 'Pricing',   href: '#pricing'     },
  { label: 'FAQ',       href: '#faq'         },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on nav-link click
  const handleNavClick = () => setMenuOpen(false);

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
          <ClipFlowLogo size={32} className="transition-transform duration-200 group-hover:scale-105" />
          <span
            className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${
              isHeroDark ? 'text-white' : 'text-[var(--cf-heading)]'
            }`}
          >
            ClipFlow
          </span>
        </a>

        {/* ── Desktop nav links ── */}
        <div className="hidden items-center gap-1 md:flex">
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
            href="/auth"
            className={`hidden text-[13px] font-semibold transition-colors md:block ${
              isHeroDark ? 'text-white/60 hover:text-white' : 'text-[var(--cf-body)] hover:text-[var(--cf-heading)]'
            }`}
          >
            Log in
          </a>
          <a
            href="/auth"
            className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-[13px] font-bold text-white shadow-md transition-all hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
          >
            Get started
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* ── Hamburger (mobile) ── */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors md:hidden ${
              isHeroDark ? 'hover:bg-white/10' : 'hover:bg-[var(--cf-section)]'
            }`}
          >
            <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ${isHeroDark ? 'bg-white/80' : 'bg-[var(--cf-heading)]'} ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ${isHeroDark ? 'bg-white/80' : 'bg-[var(--cf-heading)]'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ${isHeroDark ? 'bg-white/80' : 'bg-[var(--cf-heading)]'} ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div
          className={`border-t px-5 pb-4 md:hidden ${
            isHeroDark
              ? 'border-white/10 bg-[#07040f]/95'
              : 'border-[var(--cf-border)] bg-[var(--cf-card)]'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={handleNavClick}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isHeroDark
                    ? 'text-white/70 hover:bg-white/8 hover:text-white'
                    : 'text-[var(--cf-body)] hover:bg-[var(--cf-section)] hover:text-[var(--cf-heading)]'
                }`}
              >
                {label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t pt-3 ${isHeroDark ? 'border-white/10' : 'border-[var(--cf-border)]'}">
              <a href="/auth" onClick={handleNavClick} className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${isHeroDark ? 'text-white/60 hover:text-white' : 'text-[var(--cf-body)] hover:text-[var(--cf-heading)]'}`}>
                Log in
              </a>
              <a href="/auth" onClick={handleNavClick} className="rounded-xl bg-black px-3 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black">
                Get started free
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
