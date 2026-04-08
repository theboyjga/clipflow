'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const PANELS = [
  { caption: 'Import from anywhere',    sub: 'TikTok, Instagram, YouTube, Twitch, Kick — paste any link.' },
  { caption: 'Publish everywhere',      sub: '8 platforms, one click. No logging in separately.' },
  { caption: 'Track in real time',      sub: 'Watch every upload complete with live progress.' },
];

interface PhotoScrollProps {
  photos?: string[]; // paths like '/photo1.jpg' — optional
}

export default function PhotoScroll({ photos = [] }: PhotoScrollProps) {
  return (
    <section className="overflow-hidden bg-[#07040f]">
      {PANELS.map((panel, i) => (
        <Panel key={i} panel={panel} photo={photos[i]} index={i} />
      ))}
    </section>
  );
}

function Panel({ panel, photo, index }: { panel: typeof PANELS[0]; photo?: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y      = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative flex h-[70vh] min-h-[400px] items-center justify-center overflow-hidden">
      {/* Background image or gradient placeholder */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={`h-full w-full ${
              index === 0 ? 'bg-gradient-to-br from-purple-900/60 via-orange-900/40 to-[#07040f]' :
              index === 1 ? 'bg-gradient-to-br from-blue-900/50 via-orange-800/40 to-[#07040f]' :
              'bg-gradient-to-br from-emerald-900/50 via-orange-900/30 to-[#07040f]'
            }`}
          />
        )}
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 px-5 text-center sm:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-orange-400">
          0{index + 1}
        </p>
        <h3 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {panel.caption}
        </h3>
        <p className="mx-auto max-w-sm text-base text-white/55">
          {panel.sub}
        </p>
      </motion.div>
    </div>
  );
}
