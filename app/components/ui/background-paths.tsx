'use client';

import { motion } from 'framer-motion';

/**
 * Animated flowing SVG path lines — adapted for ClipFlow's dark burnt-orange hero.
 * The paths pulse along their length infinitely, creating an organic "data flowing"
 * visual that feels distinct and premium.
 */

function FloatingPaths({ position, color }: { position: number; color: string }) {
  const paths = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.025,
    opacity: 0.06 + i * 0.018,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={color}
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.2, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, path.opacity, path.opacity * 0.5, path.opacity],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + path.id * 0.6,
              repeat: Infinity,
              ease: 'linear',
              delay: path.id * 0.15,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Drop this inside any relatively-positioned container.
 * It renders two mirrored sets of animated path lines.
 */
export function BackgroundPaths({
  colorA = '#ea580c',
  colorB = '#fb923c',
}: {
  colorA?: string;
  colorB?: string;
}) {
  return (
    <>
      <FloatingPaths position={1}  color={colorA} />
      <FloatingPaths position={-1} color={colorB} />
    </>
  );
}
