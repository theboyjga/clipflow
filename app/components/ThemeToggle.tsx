'use client';

import { useTheme } from '@/app/components/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative flex h-8 w-14 items-center rounded-full border border-[var(--cf-border)] bg-[var(--cf-section)] p-0.5 transition-all duration-300 hover:border-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {/* Track icons */}
      <span aria-hidden="true" className={`absolute left-1.5 text-[11px] transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        ☀️
      </span>
      <span aria-hidden="true" className={`absolute right-1.5 text-[11px] transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        🌙
      </span>

      {/* Sliding knob */}
      <span
        className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 ${
          isDark ? 'translate-x-[22px] bg-violet-600' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-500" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}
