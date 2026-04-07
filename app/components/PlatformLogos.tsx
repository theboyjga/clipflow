const platforms = [
  { badge: 'IG', label: 'Instagram', color: 'from-pink-500 to-orange-400' },
  { badge: 'TT', label: 'TikTok',    color: 'from-zinc-700 to-zinc-900' },
  { badge: 'YT', label: 'YouTube',   color: 'from-red-500 to-red-700' },
  { badge: 'FB', label: 'Facebook',  color: 'from-blue-600 to-blue-800' },
  { badge: 'X',  label: 'Twitter/X', color: 'from-zinc-800 to-zinc-950' },
  { badge: 'in', label: 'LinkedIn',  color: 'from-blue-700 to-blue-900' },
];

export default function PlatformLogos() {
  return (
    <div className="border-y border-[#e6ebf1] bg-[#f6f9fc] py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[#697386]">
          Publish to all your platforms at once
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {platforms.map((p) => (
            /* platform-pill triggers .platform-icon animation via CSS */
            <div
              key={p.badge}
              className="platform-pill flex cursor-default items-center gap-2.5 rounded-full border border-[#e6ebf1] bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-px"
            >
              <div className={`platform-icon flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br ${p.color} text-[9px] font-bold text-white`}>
                {p.badge}
              </div>
              <span className="text-sm font-medium text-[#425466]">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
