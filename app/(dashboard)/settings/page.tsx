'use client';

import { useState } from 'react';
import TopBar from '@/app/components/dashboard/TopBar';
import PlatformIcon from '@/app/components/ui/PlatformIcon';
import type { PlatformId } from '@/app/types/clipflow';

type Tab = 'profile' | 'password' | 'notifications' | 'billing' | 'accounts' | 'danger';
const TABS: { id: Tab; label: string }[] = [
  { id: 'profile',       label: 'Profile'           },
  { id: 'password',      label: 'Password'          },
  { id: 'notifications', label: 'Notifications'     },
  { id: 'billing',       label: 'Billing'           },
  { id: 'accounts',      label: 'Connected Accounts'},
  { id: 'danger',        label: 'Danger Zone'       },
];

const PLATFORMS: { id: PlatformId; label: string }[] = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok',   label: 'TikTok'    },
  { id: 'youtube',  label: 'YouTube'   },
  { id: 'twitter',  label: 'X / Twitter' },
  { id: 'facebook', label: 'Facebook'  },
  { id: 'linkedin', label: 'LinkedIn'  },
];

export default function SettingsPage() {
  const [tab, setTab]             = useState<Tab>('profile');
  const [name, setName]           = useState('Isaac');
  const [saved, setSaved]         = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw]         = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError]     = useState('');
  const [connected, setConnected] = useState<Set<PlatformId>>(new Set(['instagram', 'tiktok']));
  const [expired, setExpired]     = useState<Set<PlatformId>>(new Set(['youtube']));
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const NOTIF_PREFS = [
    { id: 'publish', label: 'Post published',    desc: 'When a clip goes live on any platform.' },
    { id: 'fail',    label: 'Post failed',        desc: 'When an upload or publish fails.' },
    { id: 'limit',   label: 'Daily limit warning', desc: 'When you\'re approaching your free plan limit.' },
    { id: 'tips',    label: 'Tips & product news', desc: 'Occasional tips from the ClipFlow team.' },
  ];
  const [notifPrefs, setNotifPrefs] = useState<Set<string>>(new Set(['publish', 'fail', 'limit']));

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function savePw(e: React.FormEvent) {
    e.preventDefault();
    if (newPw.length < 8) { setPwError('New password must be at least 8 characters.'); return; }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return; }
    setPwError('');
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function toggleConnect(id: PlatformId) {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setExpired((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }

  return (
    <>
      <TopBar title="Settings" />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">

          {/* Tab bar */}
          <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] p-1">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  tab === id
                    ? 'bg-[var(--cf-card)] text-[var(--cf-heading)] shadow-sm'
                    : 'text-[var(--cf-muted)] hover:text-[var(--cf-body)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] p-6 shadow-sm">
            {/* Profile */}
            {tab === 'profile' && (
              <form onSubmit={saveProfile} className="space-y-5">
                <h2 className="font-bold text-[var(--cf-heading)]">Profile</h2>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--cf-muted)]">Display name</label>
                  <input className="auth-field" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--cf-muted)]">Email</label>
                  <input className="auth-field opacity-60" value="isaac@example.com" readOnly />
                  <p className="mt-1 text-xs text-[var(--cf-muted)]">Email cannot be changed after sign-up.</p>
                </div>
                <button type="submit" className="btn-auth-primary w-full">
                  {saved ? '✓ Saved' : 'Save changes'}
                </button>
              </form>
            )}

            {/* Password */}
            {tab === 'password' && (
              <form onSubmit={savePw} className="space-y-5">
                <h2 className="font-bold text-[var(--cf-heading)]">Change password</h2>
                {(['Current password', 'New password', 'Confirm new password'] as const).map((label, i) => {
                  const vals = [currentPw, newPw, confirmPw];
                  const setters = [setCurrentPw, setNewPw, setConfirmPw];
                  return (
                    <div key={label}>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--cf-muted)]">{label}</label>
                      <input type="password" className="auth-field" value={vals[i]} onChange={(e) => setters[i](e.target.value)} />
                    </div>
                  );
                })}
                {pwError && <p className="text-xs text-red-500">{pwError}</p>}
                <button type="submit" className="btn-auth-primary w-full">Update password</button>
              </form>
            )}

            {/* Notifications */}
            {tab === 'notifications' && (
              <div className="space-y-5">
                <h2 className="font-bold text-[var(--cf-heading)]">Notification preferences</h2>
                {NOTIF_PREFS.map(({ id, label, desc }) => (
                  <label key={id} className="flex cursor-pointer items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--cf-heading)]">{label}</p>
                      <p className="text-xs text-[var(--cf-muted)]">{desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPrefs.has(id)}
                      onChange={() => setNotifPrefs((prev) => {
                        const next = new Set(prev);
                        if (next.has(id)) next.delete(id); else next.add(id);
                        return next;
                      })}
                      className="mt-0.5 accent-black"
                    />
                  </label>
                ))}
              </div>
            )}

            {/* Billing */}
            {tab === 'billing' && (
              <div className="space-y-5">
                <h2 className="font-bold text-[var(--cf-heading)]">Billing</h2>
                <div className="rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] p-4">
                  <p className="text-xs text-[var(--cf-muted)]">Current plan</p>
                  <p className="text-xl font-extrabold text-[var(--cf-heading)]">Free</p>
                  <p className="text-xs text-[var(--cf-muted)]">2 uploads/day · watermark</p>
                </div>
                <a href="/#pricing" className="btn-auth-primary block text-center">Upgrade to Pro</a>
                <p className="text-center text-xs text-[var(--cf-muted)]">No subscription yet. Nothing to cancel.</p>
              </div>
            )}

            {/* Connected accounts */}
            {tab === 'accounts' && (
              <div className="space-y-4">
                <h2 className="font-bold text-[var(--cf-heading)]">Connected accounts</h2>
                {PLATFORMS.map(({ id, label }) => {
                  const isConn = connected.has(id);
                  const isExp  = expired.has(id);
                  return (
                    <div key={id}>
                      {isExp && (
                        <div className="mb-2 flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs dark:border-orange-800 dark:bg-orange-900/20">
                          <span className="text-orange-600 dark:text-orange-400">⚠ Token expired —</span>
                          <button onClick={() => toggleConnect(id)} className="font-bold text-orange-600 underline dark:text-orange-400">Reconnect</button>
                        </div>
                      )}
                      <div className="flex items-center justify-between rounded-xl border border-[var(--cf-border)] bg-[var(--cf-section)] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <PlatformIcon id={id} size="md" />
                          <div>
                            <p className="text-sm font-semibold text-[var(--cf-heading)]">{label}</p>
                            <div className="flex items-center gap-1.5">
                              <div className={`h-1.5 w-1.5 rounded-full ${isConn && !isExp ? 'bg-emerald-400' : 'bg-[var(--cf-border)]'}`} />
                              <p className="text-xs text-[var(--cf-muted)]">{isConn && !isExp ? 'Connected' : isExp ? 'Token expired' : 'Not connected'}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleConnect(id)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                            isConn
                              ? 'border border-[var(--cf-border)] text-[var(--cf-muted)] hover:border-red-300 hover:text-red-500'
                              : 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black'
                          }`}
                        >
                          {isConn ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Danger zone */}
            {tab === 'danger' && (
              <div className="space-y-5">
                <h2 className="font-bold text-red-500">Danger Zone</h2>
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/15">
                  <p className="mb-1 font-semibold text-red-600 dark:text-red-400">Delete account</p>
                  <p className="mb-4 text-xs text-red-500">This is permanent and cannot be undone. All your posts, history, and data will be deleted.</p>
                  {!deleteConfirm ? (
                    <button onClick={() => setDeleteConfirm(true)} className="rounded-lg border border-red-300 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/30">
                      Delete my account
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setDeleteConfirm(false)} className="rounded-lg border border-[var(--cf-border)] px-4 py-2 text-xs font-bold text-[var(--cf-muted)]">
                        Cancel
                      </button>
                      <button className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700">
                        Yes, delete my account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
