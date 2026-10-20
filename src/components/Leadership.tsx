import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../content/site';

interface LeadershipProps {
  onOpenConsultation: () => void;
}

export const Leadership: React.FC<LeadershipProps> = ({ onOpenConsultation }) => {
  return (
    <section className="bg-[#111111] border border-white/5 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
      {/* Subtle Crimson Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8282D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E53935]">
          <ShieldCheck className="w-4 h-4" />
          <span>AGENCY EXPERTISE</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-brand-serif font-bold text-white leading-tight">
          Marketplace Expertise & Strategic Direction
        </h2>

        <blockquote className="text-sm sm:text-base text-neutral-300 font-light italic border-l-2 border-[#C8282D] pl-4">
          "{siteConfig.leadership.quote}"
        </blockquote>

        <div className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed space-y-3">
          <p>
            {siteConfig.leadership.bio} Our team supports businesses with multi-channel e-commerce architecture across <strong>Shopify, Amazon, TikTok Shop, and Walmart</strong>.
          </p>
          <p>
            We emphasize operational compliance, technical catalog structuring, and hands-on skills training at our physical campus in Chase Up, Bosan Road, Multan.
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
    </section>
  );
};
