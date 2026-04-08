'use client';

import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>
      <h2 className="mb-2 text-xl font-bold text-[var(--cf-heading)]">Check your inbox</h2>
      <p className="mb-6 text-sm text-[var(--cf-body)]">
        We sent a verification link to your email. Click it to activate your account — it expires in 24 hours.
      </p>
      <p className="mb-8 text-xs text-[var(--cf-muted)]">
        Didn&apos;t receive it? Check your spam folder or{' '}
        <button className="underline hover:text-[var(--cf-heading)]">resend the email</button>.
      </p>
      <button
        onClick={() => router.push('/onboarding')}
        className="btn-auth-primary w-full"
      >
        Continue to setup
      </button>
    </div>
  );
}
