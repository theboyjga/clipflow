import ThemeToggle from '@/app/components/ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--cf-border)] bg-[var(--cf-page)]/90 backdrop-blur-xl transition-colors duration-200">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 shadow-md shadow-violet-200 dark:shadow-violet-900/40">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[var(--cf-heading)]">ClipFlow</span>
        </div>

        {/* Nav links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[var(--cf-body)] sm:flex">
          <a href="#features"     className="transition-colors hover:text-[var(--cf-heading)]">Features</a>
          <a href="#how-it-works" className="transition-colors hover:text-[var(--cf-heading)]">How it works</a>
          <a href="#demo"         className="transition-colors hover:text-[var(--cf-heading)]">Demo</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#" className="hidden text-sm font-medium text-[var(--cf-body)] transition-colors hover:text-[var(--cf-heading)] sm:block">
            Sign in
          </a>
          <a
            href="#try"
            className="rounded-full bg-[var(--cf-heading)] px-4 py-1.5 text-sm font-semibold text-white transition-all hover:opacity-80 active:scale-95"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
