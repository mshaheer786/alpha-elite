import React, { useState } from 'react';
import { User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../content/site';

interface FounderProps {
  onOpenConsultation: () => void;
}

export const Founder: React.FC<FounderProps> = ({ onOpenConsultation }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="bg-[#111111] border border-white/5 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
      {/* Subtle Crimson Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8282D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Director Photo / Placeholder */}
        <div className="lg:col-span-5 relative ae-rimlight">
          <div data-reveal="mask" className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square max-w-sm mx-auto bg-neutral-900 group">
            {!imgError ? (
              <img
                src={siteConfig.founder.image}
                data-parallax="0.1"
                alt={`${siteConfig.founder.name} – Director of Alpha Elite`}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Director Photo Placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-900 to-neutral-950">
                <div className="w-20 h-20 rounded-full bg-[#C8282D]/20 border border-[#C8282D] flex items-center justify-center text-[#E53935] mb-3">
                  <User className="w-10 h-10" />
                </div>
                <span className="text-white font-brand-serif font-bold text-base">
                  {siteConfig.founder.name}
                </span>
                <span className="text-xs text-neutral-400 font-mono mt-1">
                  Director Photo Placeholder
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono text-[#E53935] uppercase tracking-wider block">
                Executive Leadership
              </span>
              <h3 className="text-xl font-brand-serif font-bold text-white">
                {siteConfig.founder.name}
              </h3>
              <p className="text-xs text-neutral-400">{siteConfig.founder.title}</p>
            </div>
          </div>
        </div>

        {/* Professional Biography & Marketplace Expertise */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E53935]">
            <ShieldCheck className="w-4 h-4" />
            <span>EXECUTIVE PROFILE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-brand-serif font-bold text-white leading-tight">
            Marketplace Architect & Strategic Director
          </h2>

          <blockquote className="text-sm sm:text-base text-neutral-300 font-light italic border-l-2 border-[#C8282D] pl-4">
            "{siteConfig.founder.quote}"
          </blockquote>

          <div className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed space-y-3">
            <p>
              As the founder and director of Alpha Elite Solutions & Trainings, Mian Abdul Raffay guides businesses through multi-channel e-commerce architecture across <strong>Shopify, Amazon, TikTok Shop, and Walmart</strong>.
            </p>
            <p>
              Under his direction, the agency emphasizes operational compliance, technical catalog structuring, and hands-on skill transference from our physical training campus at Chase Up, Bosan Road, Multan.
            </p>
          </div>

          {/* Marketplace Specialties */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {[
              'Shopify Liquid & Storefronts',
              'Amazon Seller Central & PPC',
              'TikTok Shop Merchant Setup',
              'Walmart Onboarding & Feeds',
            ].map((specialty, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8282D] shrink-0" />
                <span>{specialty}</span>
              </div>
            ))}
          </div>

          {/* Direct Link to Consultation Modal */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 bg-[#C8282D] hover:bg-[#E53935] text-white font-semibold text-xs rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(200,40,45,0.4)] flex items-center gap-2"
            >
              <span>Schedule Direct Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-neutral-500">
              Personalized Strategy Review
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
