'use client';

interface PublishButtonProps {
  selectedCount: number;
  hasSource: boolean;
  onPublish: () => void;
}

export default function PublishButton({ selectedCount, hasSource, onPublish }: PublishButtonProps) {
  const isEnabled = hasSource && selectedCount > 0;

  return (
    <button
      onClick={isEnabled ? onPublish : undefined}
      disabled={!isEnabled}
      aria-disabled={!isEnabled}
      className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
        isEnabled
          ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 hover:from-violet-500 hover:to-blue-400 active:scale-[0.99]'
          : 'cursor-not-allowed bg-gray-100 text-gray-400'
      }`}
    >
      {isEnabled
        ? `Publish to ${selectedCount} platform${selectedCount !== 1 ? 's' : ''} →`
        : 'Select a video and at least one platform'}
    </button>
  );
}
