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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); }
  }

  const fileValue = value?.kind === 'file' ? value.file : null;
  const urlValue  = value?.kind === 'url'  ? value       : null;

  function formatBytes(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-[#e6ebf1] bg-[#f6f9fc] p-1 gap-1">
        {(['file', 'url'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-white text-[#0a2540] shadow-sm'
                : 'text-[#697386] hover:text-[#425466]'
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
              <div className="flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="max-w-[200px] truncate text-sm font-semibold text-[#0a2540]">{fileValue.name}</p>
                    <p className="text-xs text-[#697386]">{formatBytes(fileValue.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => { onChange(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="text-sm font-medium text-[#697386] transition-colors hover:text-red-500"
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
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Drop MP4 video here or click to browse"
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-12 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  isDragging
                    ? 'border-violet-400 bg-violet-50'
                    : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50'
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isDragging ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-[#697386]'}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#0a2540]">Drop your MP4 here</p>
                  <p className="mt-1 text-sm text-[#697386]">or <span className="text-violet-600 underline underline-offset-2">click to browse</span></p>
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
                className="w-full rounded-xl border border-[#e6ebf1] bg-white px-4 py-3 text-sm text-[#0a2540] placeholder-[#697386] outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />
              {urlError && <p role="alert" className="mt-2 text-xs font-medium text-red-500">{urlError}</p>}
              {urlValue && !urlError && (
                <p className="mt-2 text-xs font-medium text-emerald-600">
                  ✓ Valid {SOURCE_PLATFORMS.find(s => s.id === urlValue.sourcePlatform)?.label} link
                </p>
              )}
            </div>

            {/* Platform chips */}
            <div className="flex flex-wrap gap-2">
              {SOURCE_PLATFORMS.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setHintPlatform(hintPlatform === sp.id ? null : sp.id)}
                  className={`group flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                    hintPlatform === sp.id
                      ? 'border-violet-300 bg-violet-50 text-violet-700'
                      : 'border-[#e6ebf1] bg-white text-[#697386] hover:border-violet-200 hover:text-[#425466]'
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
