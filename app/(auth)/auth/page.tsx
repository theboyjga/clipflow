'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaApple } from 'react-icons/fa';

type Mode = 'login' | 'signup';

interface FieldError { email?: string; password?: string; confirm?: string }

function validate(mode: Mode, email: string, password: string, confirm: string): FieldError {
  const errors: FieldError = {};
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  if (mode === 'signup' && password !== confirm) {
    errors.confirm = 'Passwords do not match.';
  }
  return errors;
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode]               = useState<Mode>('login');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [confirm, setConfirm]         = useState('');
  const [errors, setErrors]           = useState<FieldError>({});
  const [forgotMode, setForgotMode]   = useState(false);
  const [resetSent, setResetSent]     = useState(false);
  const [resetEmail, setResetEmail]   = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading]         = useState(false);

  function switchMode(m: Mode) {
    setMode(m);
    setErrors({});
    setForgotMode(false);
    setPassword('');
    setConfirm('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(mode, email, password, confirm);
    if (mode === 'signup' && !agreedTerms) {
      setErrors({ ...errs, confirm: errs.confirm ?? 'You must agree to the terms.' });
      return;
    }
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    // Mock auth — simulate API delay
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    if (mode === 'signup') {
      router.push('/auth/verify');
    } else {
      router.push('/onboarding');
    }
  }

  function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSent(true);
  }

  function handleOAuth(provider: 'google' | 'apple') {
    // Mock OAuth — redirect to onboarding
    router.push('/onboarding');
  }

  if (forgotMode) {
    return (
      <div>
        <button
          onClick={() => setForgotMode(false)}
          className="mb-5 flex items-center gap-1.5 text-xs text-[var(--cf-muted)] hover:text-[var(--cf-heading)]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to log in
        </button>
        <h2 className="mb-1 text-xl font-bold text-[var(--cf-heading)]">Reset your password</h2>
        <p className="mb-6 text-sm text-[var(--cf-muted)]">We&apos;ll send a reset link to your email.</p>
        {resetSent ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
            ✓ Check your inbox — we sent a reset link to <strong>{resetEmail}</strong>.
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <Field label="Email" type="email" value={resetEmail} onChange={setResetEmail} placeholder="you@example.com" />
            <button type="submit" className="btn-auth-primary w-full">Send reset link</button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="mb-6 flex rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] p-1">
        {(['login', 'signup'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
              mode === m
                ? 'bg-[var(--cf-card)] text-[var(--cf-heading)] shadow-sm'
                : 'text-[var(--cf-muted)] hover:text-[var(--cf-body)]'
            }`}
          >
            {m === 'login' ? 'Log in' : 'Sign up'}
          </button>
        ))}
      </div>

      {/* OAuth */}
      <div className="space-y-2.5">
        <button
          onClick={() => handleOAuth('google')}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--cf-border)] bg-[var(--cf-card)] py-2.5 text-sm font-semibold text-[var(--cf-heading)] transition-all hover:border-[var(--cf-muted)] hover:bg-[var(--cf-section)]"
        >
          <FaGoogle className="text-base text-[#4285F4]" />
          Continue with Google
        </button>
        <button
          onClick={() => handleOAuth('apple')}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--cf-border)] bg-[var(--cf-card)] py-2.5 text-sm font-semibold text-[var(--cf-heading)] transition-all hover:border-[var(--cf-muted)] hover:bg-[var(--cf-section)]"
        >
          <FaApple className="text-base" />
          Continue with Apple
        </button>
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--cf-border)]" />
        <span className="text-xs text-[var(--cf-muted)]">or</span>
        <div className="h-px flex-1 bg-[var(--cf-border)]" />
      </div>

      {/* Email/password form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          onBlur={() => {
            const e = validate(mode, email, password, confirm);
            if (e.email) setErrors((prev) => ({ ...prev, email: e.email }));
            else setErrors((prev) => { const n = { ...prev }; delete n.email; return n; });
          }}
          placeholder="you@example.com"
          error={errors.email}
        />

        {forgotMode ? null : (
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-[var(--cf-muted)]">Password</label>
              {mode === 'login' && (
                <button type="button" onClick={() => setForgotMode(true)} className="text-xs text-[var(--cf-muted)] underline hover:text-[var(--cf-heading)]">
                  Forgot password?
                </button>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                const e = validate(mode, email, password, confirm);
                if (e.password) setErrors((prev) => ({ ...prev, password: e.password }));
                else setErrors((prev) => { const n = { ...prev }; delete n.password; return n; });
              }}
              placeholder="Min. 8 characters"
              className={`auth-field ${errors.password ? 'border-red-400' : ''}`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>
        )}

        {mode === 'signup' && (
          <>
            <Field
              label="Confirm password"
              type="password"
              value={confirm}
              onChange={setConfirm}
              onBlur={() => {
                if (password !== confirm) setErrors((prev) => ({ ...prev, confirm: 'Passwords do not match.' }));
                else setErrors((prev) => { const n = { ...prev }; delete n.confirm; return n; });
              }}
              placeholder="Re-enter password"
              error={errors.confirm}
            />
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 accent-black"
              />
              <span className="text-xs text-[var(--cf-body)]">
                I agree to the{' '}
                <a href="#" className="underline hover:text-[var(--cf-heading)]">Terms of Service</a> and{' '}
                <a href="#" className="underline hover:text-[var(--cf-heading)]">Privacy Policy</a>.
              </span>
            </label>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-auth-primary w-full disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              {mode === 'login' ? 'Signing in…' : 'Creating account…'}
            </span>
          ) : mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

// ── Field helper ──────────────────────────────────────────────────────────────
function Field({
  label, type, value, onChange, onBlur, placeholder, error,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--cf-muted)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`auth-field ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : ''}`}
      />
      {error && <p className="mt-1 text-xs text-red-500" role="alert">{error}</p>}
    </div>
  );
}
