import type { ReactNode } from 'react';
import ClipFlowLogo from '@/app/components/ui/ClipFlowLogo';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--cf-page)] px-4 py-12 transition-colors duration-200">
        {/* Logo */}
        <a href="/" className="mb-8 flex items-center gap-2.5">
          <ClipFlowLogo size={36} />
          <span className="text-xl font-bold tracking-tight text-[var(--cf-heading)]">ClipFlow</span>
        </a>

        {/* Card */}
        <div className="w-full max-w-md rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-8 shadow-sm">
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-[var(--cf-muted)]">
          By continuing you agree to our{' '}
          <a href="#" className="underline hover:text-[var(--cf-heading)]">Terms</a> and{' '}
          <a href="#" className="underline hover:text-[var(--cf-heading)]">Privacy Policy</a>.
        </p>
      </div>
  );
}
