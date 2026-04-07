export type PlatformId =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'facebook'
  | 'twitter'
  | 'linkedin';

export type SourcePlatformId = 'facebook' | 'instagram' | 'tiktok' | 'youtube';

export interface Platform {
  id: PlatformId;
  label: string;
  badge: string;
  badgeClass: string;
  description: string;
}

export interface SourcePlatform {
  id: SourcePlatformId;
  label: string;
  badge: string;
  badgeClass: string;
  urlPattern: RegExp;
  placeholder: string;
}

export type UploadSource =
  | { kind: 'file'; file: File }
  | { kind: 'url'; url: string; sourcePlatform: SourcePlatformId };

export type PublishStepStatus = 'idle' | 'uploading' | 'done' | 'error';

export interface PublishStep {
  platformId: PlatformId;
  status: PublishStepStatus;
  progress: number;
}

export type AppPhase = 'input' | 'publishing' | 'complete';
