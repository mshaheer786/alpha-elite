import React, { Suspense, lazy, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Code,
  Search,
  TrendingUp,
  Palette,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Layers,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Cpu,
} from 'lucide-react';
import { siteConfig, TrainingCourse, projects, Project } from '../content/site';
import { statsData } from '../content/stats';
import { ClientMarquee } from '../components/ClientMarquee';
import { CartoonLampContact } from '../components/CartoonLampContact';
import { SectionDivider } from '../components/SectionDivider';
import { FAQSection } from '../components/FAQSection';
import { ProjectCard } from '../components/ProjectCard';
import { HeroBackground } from '../components/animations/HeroBackground';

const Hero3DCanvas = lazy(() =>
  import('../components/Hero3DCanvas').then(({ Hero3DCanvas: Scene }) => ({
    default: Scene,
  }))
);

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onEnrollCourse: (course: TrainingCourse) => void;
  onOpenConsultation: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onEnrollCourse,
  onOpenConsultation,
}) => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const platformsSectionRef = useRef<HTMLElement | null>(null);
  const [highlightedPlatform, setHighlightedPlatform] = useState<string | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    ShoppingBag: <ShoppingBag className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Search: <Search className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    TrendingUp: <TrendingUp className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
  };

  // Recent projects from /content/data.ts for Home preview (3-column layout)
  const recentProjects = projects.slice(0, 3);

  return (
    <div className="relative bg-[#0A0A0A]">
      {/* =========================================================================
          2.a) HERO SECTION (Left-aligned, 3D visual, H1 across 4 marketplaces, 2 CTAs, worldwide line)
         ========================================================================= */}
      <section ref={heroSectionRef} className="ae-home-hero relative isolate flex min-h-[100svh] flex-col justify-center">
        <HeroBackground />
        {/* Abstract Background Ambient Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div data-float="0.2" className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#C8282D]/15 rounded-full blur-[160px]" />
          <div className="absolute top-1/2 -left-32 w-[500px] h-[500px] bg-[#141414] rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-grain opacity-40" />
        </div>

        <div className="ae-home-hero-container max-w-7xl mx-auto w-full relative z-10">
          <div className="ae-home-hero-grid grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            {/* Left-Aligned Hero Content */}
            <div className="min-w-0">
              {/* Small Eyebrow Line */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-white/10 text-xs text-[#A1A1AA] mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#C8282D] shadow-[0_0_10px_#C8282D]" />
                <span className="font-mono uppercase tracking-wider text-white">
                  Alpha Elite Solutions & Trainings
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-[#C8282D] font-medium">Commitment To Excellence</span>
              </motion.div>

              {/* Large Two-Line H1 mentioning Shopify, Amazon, TikTok Shop and Walmart */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                data-split
                className="text-3xl sm:text-5xl lg:text-6xl font-brand-serif font-extrabold text-white tracking-tight leading-[1.08] mb-6"
              >
                Grow Your Business Across <br className="hidden sm:inline" />
                <span className="text-[#C8282D]">Shopify, Amazon, TikTok Shop</span> &amp;{' '}
                <span className="text-[#C8282D]">Walmart</span>.
              </motion.h1>

              {/* One-Sentence Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                data-reveal
                data-reveal-delay="0.6"
                className="text-base sm:text-lg text-[#A1A1AA] font-light leading-relaxed max-w-2xl mb-8"
              >
                One full-service agency managing store setup, catalog optimization, and advertising across all four dominant e-commerce channels — accompanied by practical training courses in Multan.
              </motion.p>

              {/* Two Buttons: Primary "Get Free Consultation" & Ghost "View Our Work" */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4"
              >
                <button
                  onClick={onOpenConsultation}
                  data-magnetic
                  className="px-8 py-4 bg-[#C8282D] hover:bg-[#E53935] text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(200,40,45,0.45)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('portfolio')}
                  data-magnetic
                  className="px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Our Work</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C8282D]" />
                </button>
              </motion.div>

              {/* Line: "Based in Pakistan • Serving clients worldwide" */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366]" />
                <span>Based in Pakistan • Serving clients worldwide</span>
              </motion.div>

              {/* =========================================================================
                  2.b) STATS ROW DIRECTLY UNDER HERO BUTTONS (3 counters animated on scroll)
                 ========================================================================= */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statsData.map((stat, idx) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-4 rounded-xl bg-[#121212]/90 border border-white/5 hover:border-[#C8282D]/30 transition-all"
                  >
                    <div data-counter className="text-3xl sm:text-4xl font-brand-serif font-extrabold text-white tracking-tight">
                      <span data-counter className="text-[#E53935]">{stat.value}</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5 leading-snug">
                      {stat.context}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: 3D Visual & Interactive Canvas */}
            <div className="relative min-w-0">
              <div className="ae-home-hero-card relative w-full min-w-0 rounded-2xl border border-white/10 shadow-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex flex-col justify-between p-2">
                {/* Lazy-loaded 3D marketplace scene */}
                <Suspense
                  fallback={
                    <div
                      className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(200,40,45,0.32),transparent_68%)]"
                      aria-hidden="true"
                    />
                  }
                >
                  <Hero3DCanvas
                    className="ae-home-hero-scene absolute inset-0 z-0"
                    heroSectionRef={heroSectionRef}
                    platformsSectionRef={platformsSectionRef}
                    onPlatformHighlight={setHighlightedPlatform}
                  />
                </Suspense>

                {/* Floating Top Badge */}
                <div className="relative z-10 flex items-center justify-between p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 m-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8282D] animate-ping" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white">
                      Marketplace Engine 3D
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#E53935] bg-[#C8282D]/10 px-2 py-0.5 rounded">
                    Interactive
                  </span>
                </div>

                {/* Floating Bottom Card: Multan HQ & Global Scope */}
                <div className="relative z-10 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 m-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8282D] block">
                    Alpha Elite Executive Studio
                  </span>
                  <p className="text-xs text-neutral-300 font-medium mt-1 leading-snug">
                    Bosan Road, Multan · Technical Architecture for Shopify, Amazon, TikTok Shop &amp; Walmart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          2.c) & 3. MOVING CLIENT-BRAND LOGO STRIP (ClientMarquee directly below hero)
         ========================================================================= */}
      <ClientMarquee />

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          2.d) "PLATFORMS WE WORK ON" SECTION (4 CARDS: Shopify, Amazon, TikTok Shop, Walmart)
         ========================================================================= */}
      <section ref={platformsSectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
              Multi-Channel E-Commerce Architecture
            </span>
            <h2 data-reveal className="text-2xl sm:text-4xl font-brand-serif font-bold text-white mt-2 mb-3 tracking-tight">
              Platforms We Work On
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              We engineer specialized operations across the four dominant retail ecosystems to expand your customer reach and protect against single-channel platform risk.
            </p>
          </div>

          <div data-stagger="0.1" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.marketplaceServices.map((m) => (
              <div
                key={m.id}
                data-tilt="6"
                className={`ae-spot bg-[#121212] border p-6 rounded-2xl flex flex-col justify-between hover:border-[#C8282D]/40 transition-all duration-300 relative group ${
                  highlightedPlatform?.toLowerCase() === m.platform.toLowerCase()
                    ? 'border-[#C8282D] bg-[#C8282D]/10 shadow-[0_0_32px_rgba(200,40,45,0.24)]'
                    : 'border-white/5'
                }`}
              >
                <div>
                  {/* Clean text wordmark (no official copyrighted logos) */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold font-brand-serif text-white group-hover:text-[#E53935] transition-colors">
                      {m.platform}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#C8282D] bg-[#C8282D]/10 px-2 py-0.5 rounded">
                      Platform
                    </span>
                  </div>

                  <p className="text-xs text-[#A1A1AA] mb-5 leading-relaxed min-h-[36px]">
                    {m.tagline}
                  </p>

                  <div className="space-y-2 mb-6 pt-3 border-t border-white/5">
                    {m.services.slice(0, 3).map((srv, si) => (
                      <div key={si} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C8282D] shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs font-semibold text-white group-hover:text-[#E53935] transition-colors flex items-center justify-between w-full cursor-pointer"
                  >
                    <span>View Platform Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          2.e) OUR SERVICES (6 CARDS)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
                Specialized Technical Capabilities
              </span>
              <h2 data-reveal className="text-2xl sm:text-4xl font-brand-serif font-bold text-white mt-2 tracking-tight">
                Our Services
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-2 max-w-xl">
                Beyond marketplaces, we build the custom software, search visibility, conversion design, and brand foundations modern businesses demand.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="text-xs font-semibold text-[#E53935] hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>Explore All Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div data-stagger="0.08" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.generalServices.slice(0, 6).map((service) => (
              <div
                key={service.id}
                data-tilt="6"
                className="ae-spot bg-[#141414] border border-white/5 hover:border-[#C8282D]/40 p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#C8282D] bg-[#C8282D]/10 px-2 py-1 rounded">
                      {service.number}
                    </span>
                    <div className="p-2.5 rounded-lg bg-neutral-900 text-neutral-300 group-hover:text-[#E53935] transition-colors">
                      {iconMap[service.iconName] || <Sparkles className="w-5 h-5" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-brand-serif font-bold text-white mb-2 group-hover:text-[#E53935] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-medium mb-4">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    {service.capabilities.slice(0, 3).map((cap, ci) => (
                      <div key={ci} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8282D] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs font-semibold text-white group-hover:text-[#E53935] transition-colors flex items-center justify-between w-full cursor-pointer"
                  >
                    <span>Detailed Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          2.e) RECENT WORK (4 CARDS LINKING TO LIVE SITES)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
                Verified Deliverables
              </span>
              <h2 data-reveal className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-2 tracking-tight">
                Recent Work
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-2 max-w-xl">
                Real client websites and stores developed and supported by Alpha Elite.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="text-xs font-semibold text-[#E53935] hover:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View All Verified Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div data-stagger="0.1" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProjects.map((proj) => (
              <ProjectCard key={proj.slug} project={proj} />
            ))}
          </div>
        </div>
      </section>

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          2.e) WHY CHOOSE ALPHA ELITE
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
              Operational Advantage
            </span>
            <h2 data-reveal className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-2 mb-3 tracking-tight">
              Why Choose Alpha Elite
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              We eliminate the fragmentation of hiring separate agencies for development, SEO, and marketplace seller management.
            </p>
          </div>

          <div data-stagger="0.08" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '4-Marketplace Mastery',
                desc: 'Deep operational fluency across Shopify, Amazon, TikTok Shop, and Walmart under one roof.',
                icon: <Layers className="w-5 h-5 text-[#C8282D]" />,
              },
              {
                title: 'Zero Theoretical Promises',
                desc: 'We do not promise unrealistic rankings or sales. We document exact deliverable scope and technical setup.',
                icon: <ShieldCheck className="w-5 h-5 text-[#C8282D]" />,
              },
              {
                title: 'Direct Multan Presence',
                desc: 'Visit our state-of-the-art lab and boardroom at Chase Up, Bosan Road, Multan for in-person collaboration.',
                icon: <Globe className="w-5 h-5 text-[#C8282D]" />,
              },
              {
                title: 'Training-Backed Talent',
                desc: 'Our agency is powered by our in-house academy, ensuring our account managers maintain cutting-edge proficiency.',
                icon: <Cpu className="w-5 h-5 text-[#C8282D]" />,
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                data-tilt="6"
                className="ae-spot p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#C8282D]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-neutral-900 w-fit mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-brand-serif font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          2.e) PROCESS SECTION
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
              Methodology
            </span>
            <h2 data-reveal className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-2 mb-3 tracking-tight">
              Our 4-Stage Process
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              From initial audit to systematic multi-channel expansion.
            </p>
          </div>

          <div data-stagger="0.08" data-draw-section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Discovery & Audit',
                desc: 'We review existing accounts, listings, product margins, and technical infrastructure to identify bottlenecks.',
              },
              {
                step: '02',
                title: 'Store & Channel Deployment',
                desc: 'Complete storefront building, Seller Central account configurations, and payment gateway compliance.',
              },
              {
                step: '03',
                title: 'Catalog & Content Optimization',
                desc: 'A+ content, high-converting product photography specifications, and search-indexed keyword copywriting.',
              },
              {
                step: '04',
                title: 'Targeted Growth & Scaling',
                desc: 'Continuous PPC advertising, TikTok creator collaboration, inventory synchronization, and performance reporting.',
              },
            ].map((st, i) => (
              <div
                key={i}
                data-tilt="6"
                className="ae-spot bg-[#121212] border border-white/5 p-6 rounded-2xl relative group hover:border-[#C8282D]/40 transition-colors"
              >
                <span className="text-3xl font-brand-serif font-extrabold text-[#C8282D]/30 group-hover:text-[#C8282D] transition-colors block mb-3">
                  {st.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          FAQ SECTION (Collapsible accordion for client questions)
         ========================================================================= */}
      <FAQSection onOpenConsultation={onOpenConsultation} />

      {/* Animated Subtle Section Divider */}
      <SectionDivider />

      {/* =========================================================================
          FINAL CTA & INTERACTIVE CARTOON LAMP CONTACT COMPONENT
         ========================================================================= */}
      <CartoonLampContact onLeadSubmitted={() => {}} />
    </div>
  );
};
