interface ClipFlowLogoProps {
  size?: number;
  className?: string;
}

/**
 * ClipFlow brand logo — play button with two flowing wave cuts
 * through the lower-left of the white mark on a dark rounded square.
 */
export default function ClipFlowLogo({ size = 32, className = '' }: ClipFlowLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dark rounded-square background */}
      <rect width="100" height="100" rx="23" fill="#0a0a0a" />

      {/*
        White mark — outer shape:
        Play button pointing right whose lower-left body sweeps
        down and curves into a tail before the wave cuts are applied.
      */}
      <path
        d="
          M 28 21
          L 71 45
          Q 76 48 71 51
          C 61 59 45 68 30 74
          C 23 77 17 77 17 74
          C 17 71 21 66 27 60
          Z
        "
        fill="white"
      />

      {/* Black wave cut 1 — main flowing line */}
      <path
        d="M 21 60 C 33 47 51 62 68 55"
        stroke="#0a0a0a"
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Black wave cut 2 — secondary echo */}
      <path
        d="M 17 70 C 29 57 47 72 64 65"
        stroke="#0a0a0a"
        strokeWidth="6.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
