import React from 'react';

/**
 * Exact Moby Tek Logo component as seen on the official brand image:
 * Minimalist Smartphone outline + Tech Gear / Cogwheel + Typography
 * "MOBY TEK"
 * "PHONES & ACCESSOIRES"
 */
export default function MobyTekLogo({ 
  className = '', 
  variant = 'dark', // 'dark' (white text on dark bg), 'light' (dark text on light bg), 'icon-only'
  showSubtitle = true,
  size = 'md' // 'sm', 'md', 'lg', 'xl'
}) {
  const isLight = variant === 'light';

  // Size configurations
  const sizeMap = {
    sm: { icon: 'w-7 h-7', title: 'text-base', sub: 'text-[9px] tracking-[0.2em]' },
    md: { icon: 'w-10 h-10', title: 'text-xl', sub: 'text-[10px] tracking-[0.22em]' },
    lg: { icon: 'w-14 h-14', title: 'text-2xl', sub: 'text-xs tracking-[0.25em]' },
    xl: { icon: 'w-20 h-20', title: 'text-4xl', sub: 'text-sm tracking-[0.28em]' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Standalone Icon
  const IconSvg = (
    <svg 
      viewBox="0 0 100 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${currentSize.icon} shrink-0 transition-transform duration-300 group-hover:scale-105`}
    >
      {/* Smartphone Body Outline */}
      <rect 
        x="18" 
        y="12" 
        width="48" 
        height="96" 
        rx="10" 
        stroke="currentColor" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
      />

      {/* Screen Area Inner Line */}
      <line x1="23" y1="26" x2="61" y2="26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="23" y1="90" x2="61" y2="90" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

      {/* Top Speaker Pill & Camera Dot */}
      <line x1="37" y1="19" x2="47" y2="19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="31" cy="19" r="1.3" fill="currentColor" />

      {/* Bottom Home Button */}
      <circle cx="42" cy="99" r="3.4" stroke="currentColor" strokeWidth="2.2" />

      {/* Gear / Cogwheel on the Right Border */}
      <g transform="translate(66, 52)">
        {/* Gear Masking/Backing to cleanly cover the phone border */}
        <circle cx="0" cy="0" r="18" fill={isLight ? '#ffffff' : '#090d16'} />
        
        {/* 8-Tooth Cogwheel Outline */}
        <path
          d="
            M -3.5 -17.5 L 3.5 -17.5 L 4.5 -14 L 8.5 -12.5 L 12 -15 L 17 -10 L 14.5 -6.5 L 16 -2.5 L 19.5 -1.5 
            L 19.5 5.5 L 16 6.5 L 14.5 10.5 L 17 14 L 12 19 L 8.5 16.5 L 4.5 18 L 3.5 21.5 
            L -3.5 21.5 L -4.5 18 L -8.5 16.5 L -12 19 L -17 14 L -14.5 10.5 L -16 6.5 L -19.5 5.5 
            L -19.5 -1.5 L -16 -2.5 L -14.5 -6.5 L -17 -10 L -12 -15 L -8.5 -12.5 L -4.5 -14 Z
          "
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        {/* Center hole of the gear */}
        <circle cx="0" cy="0" r="6.5" stroke="currentColor" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{IconSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Icon */}
      <div className={`${isLight ? 'text-slate-900' : 'text-white'}`}>
        {IconSvg}
      </div>

      {/* Text Branding */}
      <div className="flex flex-col">
        <span 
          className={`font-heading font-black leading-tight tracking-wider uppercase ${currentSize.title} ${
            isLight ? 'text-black' : 'text-white'
          }`}
          style={{ letterSpacing: '0.08em' }}
        >
          MOBY <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>TEK</span>
        </span>

        {showSubtitle && (
          <span 
            className={`font-sans font-bold uppercase ${currentSize.sub} ${
              isLight ? 'text-zinc-500' : 'text-zinc-400'
            }`}
          >
            PHONES & ACCESSOIRES
          </span>
        )}
      </div>
    </div>
  );
}
