'use client';

import { useRef, useState } from 'react';
import { SOURCE_PLATFORMS } from '@/app/lib/platforms';
import type { SourcePlatformId, UploadSource } from '@/app/types/clipflow';

interface UploadZoneProps {
  value: UploadSource | null;
  onChange: (source: UploadSource | null) => void;
}

export default function UploadZone({ value, onChange }: UploadZoneProps) {
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [hintPlatform, setHintPlatform] = useState<SourcePlatformId | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (file.type === 'video/mp4' || file.name.endsWith('.mp4')) {
      onChange({ kind: 'file', file });
    } else {
      setUrlError('Only MP4 files are supported.');
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleUrlChange(raw: string) {
    setUrlInput(raw);
    setUrlError(null);
    if (!raw.trim()) { onChange(null); return; }
    const matched = SOURCE_PLATFORMS.find((sp) => sp.urlPattern.test(raw));
    if (matched) {
      onChange({ kind: 'url', url: raw.trim(), sourcePlatform: matched.id });
    } else {
      onChange(null);
      if (raw.length > 10) setUrlError('Paste a link from Facebook, Instagram, TikTok, or YouTube.');
    }
  }

  const fileValue = value?.kind === 'file' ? value.file : null;
  const urlValue  = value?.kind === 'url'  ? value       : null;

  function formatBytes(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--cf-border)] bg-[var(--cf-card)] shadow-sm transition-colors duration-200">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--cf-border)] bg-[var(--cf-section)] p-1">
        {(['file', 'url'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-[var(--cf-card)] text-[var(--cf-heading)] shadow-sm'
                : 'text-[var(--cf-muted)] hover:text-[var(--cf-body)]'
            }`}
          >
            {tab === 'file' ? 'Upload file' : 'Paste link'}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'file' ? (
          <>
            {fileValue ? (
              <div className="flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 dark:border-orange-700 dark:bg-orange-900/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-800">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="max-w-[200px] truncate text-sm font-semibold text-[var(--cf-heading)]">{fileValue.name}</p>
                    <p className="text-xs text-[var(--cf-muted)]">{formatBytes(fileValue.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => { onChange(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="text-sm font-medium text-[var(--cf-muted)] transition-colors hover:text-red-500"
                  aria-label="Remove file"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
                role="button"
                tabIndex={0}
                aria-label="Drop MP4 video here or click to browse"
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-12 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  isDragging
                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-[var(--cf-border)] hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-900/10'
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isDragging ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40' : 'bg-[var(--cf-section)] text-[var(--cf-muted)]'}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[var(--cf-heading)]">Drop your MP4 here</p>
                  <p className="mt-1 text-sm text-[var(--cf-muted)]">or <span className="text-orange-600 underline underline-offset-2">click to browse</span></p>
                </div>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="video/mp4" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} aria-hidden="true" />
          </>
        ) : (
          <div className="space-y-3">
            <div>
              <label htmlFor="video-url" className="sr-only">Video URL</label>
              <input
                id="video-url"
                type="url"
                value={urlInput}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={hintPlatform ? SOURCE_PLATFORMS.find(s => s.id === hintPlatform)?.placeholder : 'Paste a link from Facebook, Instagram, TikTok, or YouTube'}
                className="w-full rounded-xl border border-[var(--cf-border)] bg-[var(--cf-card)] px-4 py-3 text-sm text-[var(--cf-heading)] placeholder-[var(--cf-muted)] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-900/40"
              />
              {urlError && <p role="alert" className="mt-2 text-xs font-medium text-red-500">{urlError}</p>}
              {urlValue && !urlError && (
                <p className="mt-2 text-xs font-medium text-emerald-600">
                  ✓ Valid {SOURCE_PLATFORMS.find(s => s.id === urlValue.sourcePlatform)?.label} link
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {SOURCE_PLATFORMS.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setHintPlatform(hintPlatform === sp.id ? null : sp.id)}
                  className={`group flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                    hintPlatform === sp.id
                      ? 'border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                      : 'border-[var(--cf-border)] text-[var(--cf-muted)] hover:border-orange-200 hover:text-[var(--cf-body)]'
                  }`}
                >
                  <span className={`platform-icon flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${sp.badgeClass}`}>
                    {sp.badge.charAt(0)}
                  </span>
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
