'use client';

import React from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin, FaTwitch } from 'react-icons/fa';
import { FaTiktok, FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import type { PlatformId, SourcePlatformId } from '@/app/types/clipflow';

export type AnyPlatformId = PlatformId | SourcePlatformId;

type SizeKey = 'sm' | 'md' | 'lg';

interface PlatformIconProps {
  id: AnyPlatformId;
  size?: SizeKey;
  className?: string;
}

// Kick SVG icon (inline — not in react-icons)
function KickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
      <path d="M5 3h3v7l4-7h3.5L11 10l4.5 11H12l-3-7.5L7 16v5H5V3z" />
    </svg>
  );
}

const CONFIG: Record<AnyPlatformId, { Icon: IconType | (() => React.ReactElement); bg: string }> = {
  instagram: { Icon: FaInstagram, bg: 'bg-gradient-to-br from-pink-500 to-orange-400' },
  tiktok:    { Icon: FaTiktok,    bg: 'bg-zinc-900 ring-1 ring-white/20' },
  youtube:   { Icon: FaYoutube,   bg: 'bg-red-600' },
  facebook:  { Icon: FaFacebook,  bg: 'bg-blue-700' },
  twitter:   { Icon: FaXTwitter,  bg: 'bg-zinc-950 ring-1 ring-white/20' },
  linkedin:  { Icon: FaLinkedin,  bg: 'bg-blue-800' },
  twitch:    { Icon: FaTwitch,    bg: 'bg-purple-600' },
  kick:      { Icon: KickIcon,    bg: 'bg-green-500' },
};

const SIZE_CLASSES: Record<SizeKey, string> = {
  sm: 'h-4 w-4 text-[9px]',
  md: 'h-6 w-6 text-xs',
  lg: 'h-9 w-9 text-sm',
};

// Abbreviation → PlatformId lookup (for legacy badge string usage)
export const ABBR_TO_ID: Record<string, PlatformId> = {
  IG: 'instagram',
  TT: 'tiktok',
  YT: 'youtube',
  FB: 'facebook',
  X:  'twitter',
  TW: 'twitter',
  in: 'linkedin',
  LI: 'linkedin',
};

export default function PlatformIcon({ id, size = 'md', className = '' }: PlatformIconProps) {
  const cfg = CONFIG[id];
  if (!cfg) return null;
  const { Icon, bg } = cfg;
  const dims = SIZE_CLASSES[size];
  return (
    <div className={`${dims} ${bg} flex shrink-0 items-center justify-center rounded-lg text-white ${className}`}>
      <Icon />
    </div>
  );
}
