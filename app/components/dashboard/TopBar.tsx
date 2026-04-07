'use client';

import { useState } from 'react';
import ThemeToggle from '@/app/components/ThemeToggle';

const NOTIFICATIONS = [
  { id: 1, text: 'Your clip was published to Instagram & TikTok.', time: '2m ago', read: false },
  { id: 2, text: 'YouTube upload failed — reconnect your account.', time: '18m ago', read: false },
  { id: 3, text: "You've reached your daily limit (2/2). Upgrade for unlimited.", time: '1h ago', read: true },
];

export default function TopBar({ title }: { title: string }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--cf-border)] bg-[var(--cf-card)] px-5 sm:px-8">
      <h1 className="text-lg font-bold text-[var(--cf-heading)]">{title}</h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--cf-border)] bg-[var(--cf-section)] text-[var(--cf-body)] transition-colors hover:text-[var(--cf-heading)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 z-50 w-80 rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] shadow-lg">
              <div className="flex items-center justify-between border-b border-[var(--cf-border)] px-4 py-3">
                <p className="text-sm font-bold text-[var(--cf-heading)]">Notifications</p>
                <button onClick={() => setNotifOpen(false)} className="text-xs text-[var(--cf-muted)] hover:text-[var(--cf-heading)]">Close</button>
              </div>
              <div className="divide-y divide-[var(--cf-border)]">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className={`px-4 py-3 ${n.read ? 'opacity-50' : ''}`}>
                    <p className="text-xs text-[var(--cf-body)]">{n.text}</p>
                    <p className="mt-1 text-[10px] text-[var(--cf-muted)]">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
          J
        </div>
      </div>
    </header>
  );
}
