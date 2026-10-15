import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  className = '',
  onClick,
}) => {
  const iconDimensions = {
    sm: { w: 32, h: 32 },
    md: { w: 42, h: 42 },
    lg: { w: 60, h: 60 },
    xl: { w: 84, h: 84 },
  }[size];

  const wordmarkSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-base tracking-[0.24em]',
    lg: 'text-xl tracking-[0.28em]',
    xl: 'text-3xl tracking-[0.32em]',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Precision Vector AE Monogram */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Subtle dark backdrop glow */}
        <rect width="120" height="120" rx="16" fill="#0D0D0D" stroke="#262626" strokeWidth="2" />
        
        {/* Red E top bar */}
        <path
          d="M62 26 H102 V38 H62 Z"
          fill="#C8282D"
          className="transition-colors group-hover:fill-[#E53935]"
        />

        {/* White A glyph with dynamic diagonal */}
        <path
          d="M52 26 L22 96 H38 L48 72 H74 L68 58 H54 L62 38 L68 26 H52 Z"
          fill="#FFFFFF"
        />

        {/* Red E middle bar connected to A */}
        <path
          d="M66 52 H98 V64 H60 L66 52 Z"
          fill="#C8282D"
          className="transition-colors group-hover:fill-[#E53935]"
        />

        {/* Red E bottom bar */}
        <path
          d="M58 78 H102 V90 H48 L58 78 Z"
          fill="#C8282D"
          className="transition-colors group-hover:fill-[#E53935]"
        />
      </svg>

      {/* Wordmark and Tagline */}
      {showWordmark && (
        <div className="flex flex-col justify-center">
          <span className={`font-brand-serif font-bold text-white uppercase leading-none ${wordmarkSizes}`}>
            Alpha Elite
          </span>
          {showTagline && (
            <span className="text-[10px] sm:text-xs text-[#A1A1AA] tracking-[0.18em] font-sans mt-1">
              Commitment To Excellence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
