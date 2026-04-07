export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e6ebf1] bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 shadow-md shadow-violet-200">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#0a2540]">ClipFlow</span>
        </div>

        {/* Nav links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[#425466] sm:flex">
          <a href="#features"      className="transition-colors hover:text-[#0a2540]">Features</a>
          <a href="#how-it-works"  className="transition-colors hover:text-[#0a2540]">How it works</a>
          <a href="#pricing"       className="transition-colors hover:text-[#0a2540]">Pricing</a>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <a href="#" className="hidden text-sm font-medium text-[#425466] transition-colors hover:text-[#0a2540] sm:block">
            Sign in
          </a>
          <a
            href="#try"
            className="rounded-full bg-[#0a2540] px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-[#1a3a5c] active:scale-95"
          >
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
