import React, { useState } from 'react';

interface ClientBrand {
  slug: string;
  name: string;
  url?: string;
  isTodoLink?: boolean;
}

const clientBrands: ClientBrand[] = [
  {
    slug: 'originals-by-d-marina',
    name: 'Originals by D Marina',
    url: 'https://originalsbydmarina.com',
  },
  {
    slug: 'rais-qureshi-marble-granite',
    name: 'RQ Marble & Granite',
    url: 'https://rqmarble.com',
  },
  {
    slug: 'four-zees',
    name: 'Four Zees',
    isTodoLink: true, // TODO: Add live URL when supplied
  },
  {
    slug: 'colour-way',
    name: 'ColourWay',
    url: 'https://colourway.pk',
  },
  {
    slug: 'giftpoint',
    name: 'GiftPoint',
    url: 'https://giftpoint.com.pk',
  },
  {
    slug: 'd-marina',
    name: 'D Marina',
    url: 'https://dmarina.pk',
  },
];

export const ClientMarquee: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (slug: string) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  // Render tile for a single client brand
  const renderTile = (brand: ClientBrand, keyPrefix: string) => {
    const hasError = imageErrors[brand.slug];
    const key = `${keyPrefix}-${brand.slug}`;

    const tileContent = (
      <div className="h-14 px-6 rounded-xl bg-neutral-100 hover:bg-white text-neutral-900 border border-neutral-300/40 shadow-sm flex items-center justify-center transition-all duration-300 filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-105 shrink-0 select-none group/tile cursor-pointer">
        {!hasError ? (
          <img
            src={`/clients/${brand.slug}.svg`}
            alt={`${brand.name} logo`}
            onError={() => handleImageError(brand.slug)}
            className="h-7 w-auto max-w-[140px] object-contain transition-all"
            referrerPolicy="no-referrer"
          />
        ) : null}

        {/* Wordmark fallback if image is not yet placed in /public/clients/ */}
        {hasError && (
          <span className="font-brand-serif font-bold text-xs tracking-wider uppercase text-neutral-900 text-center whitespace-nowrap">
            {brand.name}
          </span>
        )}
      </div>
    );

    if (brand.url) {
      return (
        <a
          key={key}
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${brand.name} website`}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8282D] rounded-xl block shrink-0"
        >
          {tileContent}
        </a>
      );
    }

    return (
      <div key={key} className="shrink-0" title={brand.isTodoLink ? 'TODO: Live site URL pending' : brand.name}>
        {tileContent}
      </div>
    );
  };

  return (
    <section className="py-12 bg-[#090909] border-y border-neutral-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D] mb-1">
          Brands we've worked with
        </p>
        <p className="text-xs text-neutral-400">
          Serving businesses across Pakistan and globally
        </p>
      </div>

      {/* Marquee Track with CSS mask-image gradient fade on both sides */}
      <div
        className="relative w-full overflow-hidden group"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Animated Row (respects prefers-reduced-motion via Tailwind motion-reduce) */}
        <div data-marquee="32" className="flex items-center gap-6 w-max animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center group-hover:[animation-play-state:paused]">
          {/* First set */}
          {clientBrands.map((b) => renderTile(b, 'set-1'))}
          {/* Duplicate set for seamless continuous loop */}
          {clientBrands.map((b) => renderTile(b, 'set-2'))}
          {/* Triplicate for wide/4K screens */}
          {clientBrands.map((b) => renderTile(b, 'set-3'))}
        </div>
      </div>
    </section>
  );
};
