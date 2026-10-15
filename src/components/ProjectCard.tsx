import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { Project } from '../content/data';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [panDistance, setPanDistance] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Clean domain name for top bar and alt text
  const cleanDomain = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Detect user's reduced-motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Compute pan distance once the image loads or on resize
  const calculatePan = () => {
    if (containerRef.current && imgRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const imgHeight = imgRef.current.clientHeight;
      const diff = imgHeight - containerHeight;
      setPanDistance(diff > 10 ? diff : 0);
    }
  };

  useEffect(() => {
    calculatePan();
    window.addEventListener('resize', calculatePan);
    return () => window.removeEventListener('resize', calculatePan);
  }, [isLoaded]);

  const altText = `Preview of the ${project.title} ${project.category.toLowerCase()} project`;

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => {
        setIsHovered(true);
        calculatePan();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => {
        setIsHovered(true);
        calculatePan();
      }}
      onBlur={() => setIsHovered(false)}
      data-tilt="5"
      className={`ae-spot group relative bg-[#121212] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C8282D]/70 hover:shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_24px_rgba(200,40,45,0.22)] hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8282D] transition-all duration-300 ${className}`}
    >
      <div>
        {/* =========================================================================
            1. BROWSER WINDOW MOCKUP TOP BAR
           ========================================================================= */}
        <div className="bg-[#181818] px-3.5 py-2.5 flex items-center justify-between border-b border-white/5 select-none">
          {/* Three Window Controls (macOS style) */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/85" />
          </div>

          {/* Browser Address Bar with Domain */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#0D0D0D] border border-white/5 text-[11px] font-mono text-neutral-400 max-w-[210px] truncate">
            <Lock className="w-2.5 h-2.5 text-neutral-500 shrink-0" />
            <span className="truncate">{cleanDomain}</span>
          </div>

          {/* Spacer */}
          <div className="w-10" />
        </div>

        {/* =========================================================================
            2. IMAGE AREA: 16:10 Aspect Ratio with 4-Second Hover Pan
           ========================================================================= */}
        <div
          ref={containerRef}
          className="aspect-[16/10] relative overflow-hidden bg-[#141414] border-b border-white/5"
        >
          {/* Skeleton Shimmer while loading */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-[#161616] overflow-hidden z-10 flex items-center justify-center">
              <div className="w-full h-full animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          )}

          {/* Real Website Screenshot */}
          {!hasError && (
            <img
              ref={imgRef}
              src={project.image}
              alt={altText}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              onLoad={() => {
                setIsLoaded(true);
                calculatePan();
              }}
              onError={() => {
                setHasError(true);
                setIsLoaded(true);
              }}
              style={{
                transform:
                  isHovered && panDistance > 0 && !prefersReducedMotion
                    ? `translateY(-${panDistance}px)`
                    : 'translateY(0)',
                transition:
                  prefersReducedMotion
                    ? 'none'
                    : isHovered
                    ? 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    : 'transform 0.8s ease-out',
              }}
              className="w-full h-auto min-h-full object-cover object-top block will-change-transform"
            />
          )}

          {/* Fallback Branded Card if screenshot file is missing or fails */}
          {hasError && (
            <img
              src="/portfolio/placeholder.svg"
              alt={`Placeholder preview of the ${project.title} project`}
              width={1600}
              height={1000}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/85 backdrop-blur-md text-[10px] font-mono font-medium text-neutral-300 border border-white/10 z-10 shadow-sm">
            {project.category}
          </div>

          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-black/85 backdrop-blur-md text-[10px] font-mono text-neutral-400 border border-white/10 z-10 shadow-sm max-w-[160px] truncate">
            {project.platform.split('(')[0].trim()}
          </div>
        </div>

        {/* =========================================================================
            3. CARD CONTENT: Title, Platform Badge & Description
           ========================================================================= */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-brand-serif font-bold text-white group-hover:text-[#E53935] transition-colors leading-snug">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-white/5 shrink-0 mt-0.5">
              {project.category}
            </span>
          </div>

          <div className="mb-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-900 border border-white/10 text-[10px] font-mono text-neutral-300">
              Platform: {project.platform}
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* =========================================================================
          4. VISIT LIVE SITE ACTION
         ========================================================================= */}
      <div className="p-5 pt-0 mt-auto border-t border-white/5">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 bg-neutral-900 hover:bg-[#C8282D] text-white text-xs font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-white/5 hover:border-transparent shadow-sm group-hover:shadow-[0_0_15px_rgba(200,40,45,0.3)]"
          aria-label={`Visit live website for ${project.title} (${cleanDomain})`}
        >
          <span>Visit Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};
