'use client';

import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaTiktok, FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import type { PlatformId } from '@/app/types/clipflow';

type SizeKey = 'sm' | 'md' | 'lg';

interface PlatformIconProps {
  id: PlatformId;
  size?: SizeKey;
  className?: string;
}

const CONFIG: Record<PlatformId, { Icon: IconType; bg: string }> = {
  instagram: { Icon: FaInstagram, bg: 'bg-gradient-to-br from-pink-500 to-orange-400' },
  tiktok:    { Icon: FaTiktok,    bg: 'bg-zinc-900 ring-1 ring-white/20' },
  youtube:   { Icon: FaYoutube,   bg: 'bg-red-600' },
  facebook:  { Icon: FaFacebook,  bg: 'bg-blue-700' },
  twitter:   { Icon: FaXTwitter,  bg: 'bg-zinc-950 ring-1 ring-white/20' },
  linkedin:  { Icon: FaLinkedin,  bg: 'bg-blue-800' },
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
