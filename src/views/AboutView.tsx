import React from 'react';
import {
  ShieldCheck,
  Target,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  Award,
  Users,
  Building,
} from 'lucide-react';
import { siteConfig } from '../content/site';
import { Leadership } from '../components/Leadership';

interface AboutViewProps {
  onOpenConsultation: () => void;
  setActiveTab: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenConsultation, setActiveTab }) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* =========================================================================
            1. HERO STORY
           ========================================================================= */}
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
            Our Foundation & Mission
          </span>
          <h1 data-split className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-3 mb-6 tracking-tight">
            Commitment To Excellence
          </h1>
          <p data-reveal className="text-lg text-[#A1A1AA] leading-relaxed font-light">
            Alpha Elite Solutions & Trainings was founded in Multan with a clear focus: to provide structured, multi-channel commerce management across eBay, Shopify, Amazon, TikTok Shop, and Walmart, alongside modern web development, SEO, and hands-on skill trainings.
          </p>
        </div>

        {/* =========================================================================
            2. AGENCY EXPERTISE
           ========================================================================= */}
        <Leadership onOpenConsultation={onOpenConsultation} />

        {/* =========================================================================
            3. CORE PILLARS & VALUES
           ========================================================================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-brand-serif font-bold text-white mt-2">
              The Alpha Elite Standard
            </h2>
          </div>

          <div data-stagger="0.1" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div data-tilt="6" className="ae-spot bg-[#121212] border border-white/5 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#C8282D]/10 text-[#E53935] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-brand-serif font-bold text-white mb-2">
                Conversion-First Engineering
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Design is not just how it looks; it is how it performs. Every button placement, load speed optimization, and checkout step is crafted to maximize user trust and transactional velocity.
              </p>
            </div>

            <div data-tilt="6" className="ae-spot bg-[#121212] border border-white/5 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#C8282D]/10 text-[#E53935] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-brand-serif font-bold text-white mb-2">
                Radical Transparency
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                No inflated metrics or hidden markup. Whether tracking ROAS in Meta Ads Manager or reviewing student course progress, our stakeholders enjoy direct, unobstructed data clarity.
              </p>
            </div>

            <div data-tilt="6" className="ae-spot bg-[#121212] border border-white/5 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#C8282D]/10 text-[#E53935] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-brand-serif font-bold text-white mb-2">
                Regional Pride, Global Benchmark
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Rooted firmly at Bosan Road in Multan, we engineer digital products that compete confidently on the global stage, proving the boundless technical potential of Pakistani talent.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. MULTAN LOCATION & HEADQUARTERS
           ========================================================================= */}
        <div className="bg-[#111111] border border-white/5 p-8 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E53935]">
                <MapPin className="w-4 h-4" />
                <span>MULTAN COMMERCIAL HUB</span>
              </div>
              <h2 className="text-2xl font-brand-serif font-bold text-white">
                Visit Us at Chase Up, Bosan Road, Multan
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Our modern facility houses both our agency client boardroom and our high-tech training laboratories. Conveniently situated in Multan's prime commercial district on Bosan Road with secure parking and continuous fiber connectivity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono text-neutral-300">
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-neutral-500 block text-[10px]">ADDRESS</span>
                  {siteConfig.contact.address}
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <span className="text-neutral-500 block text-[10px]">OPERATING HOURS</span>
                  {siteConfig.contact.hours}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chase+Up+Bosan+Road+Multan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#C8282D] hover:bg-[#E53935] text-white text-xs font-semibold rounded-xl text-center transition-all shadow-[0_0_20px_rgba(200,40,45,0.4)] flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps Navigation</span>
              </a>
              <button
                onClick={onOpenConsultation}
                className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-2"
              >
                <span>Schedule an In-Person Meeting</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
