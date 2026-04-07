import type { Platform, PlatformId, SourcePlatform } from '@/app/types/clipflow';

export const PLATFORMS: Platform[] = [
  {
    id: 'instagram',
    label: 'Instagram Reels',
    badge: 'IG',
    badgeClass: 'bg-gradient-to-br from-pink-500 to-orange-400',
    description: 'Share as a Reel',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    badge: 'TT',
    badgeClass: 'bg-zinc-900 ring-1 ring-white/20',
    description: 'Post to For You',
  },
  {
    id: 'youtube',
    label: 'YouTube Shorts',
    badge: 'YT',
    badgeClass: 'bg-red-600',
    description: 'Upload as a Short',
  },
  {
    id: 'facebook',
    label: 'Facebook Reels',
    badge: 'FB',
    badgeClass: 'bg-blue-700',
    description: 'Publish to Feed',
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    badge: 'X',
    badgeClass: 'bg-zinc-950 ring-1 ring-white/20',
    description: 'Post as video',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    badge: 'in',
    badgeClass: 'bg-blue-800',
    description: 'Share with network',
  },
];

export const SOURCE_PLATFORMS: SourcePlatform[] = [
  {
    id: 'facebook',
    label: 'Facebook Reels',
    badge: 'FB',
    badgeClass: 'bg-blue-700',
    urlPattern: /facebook\.com/,
    placeholder: 'https://www.facebook.com/reel/...',
  },
  {
    id: 'instagram',
    label: 'Instagram Reels',
    badge: 'IG',
    badgeClass: 'bg-gradient-to-br from-pink-500 to-orange-400',
    urlPattern: /instagram\.com/,
    placeholder: 'https://www.instagram.com/reels/...',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    badge: 'TT',
    badgeClass: 'bg-zinc-700',
    urlPattern: /tiktok\.com/,
    placeholder: 'https://www.tiktok.com/@user/video/...',
  },
  {
    id: 'youtube',
    label: 'YouTube Shorts',
    badge: 'YT',
    badgeClass: 'bg-red-600',
    urlPattern: /youtube\.com|youtu\.be/,
    placeholder: 'https://www.youtube.com/shorts/...',
  },
  {
    id: 'twitch',
    label: 'Twitch',
    badge: 'TW',
    badgeClass: 'bg-purple-600',
    urlPattern: /clips\.twitch\.tv|twitch\.tv\/\w+\/clip/,
    placeholder: 'https://clips.twitch.tv/...',
  },
  {
    id: 'kick',
    label: 'Kick',
    badge: 'KK',
    badgeClass: 'bg-green-500',
    urlPattern: /kick\.com\/\w+\/clips|kick\.com\/\w+\?clip=/,
    placeholder: 'https://kick.com/channel/clips/...',
  },
];

export function getPlatform(id: PlatformId): Platform {
  return PLATFORMS.find((p) => p.id === id)!;
}
