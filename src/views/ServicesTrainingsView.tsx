import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Code,
  Search,
  TrendingUp,
  Palette,
  Sparkles,
  CheckCircle,
  Clock,
  MapPin,
  Award,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Briefcase,
  Layers,
  DollarSign,
} from 'lucide-react';
import { siteConfig, TrainingCourse, MarketplaceService, GeneralService } from '../content/site';

interface ServicesTrainingsViewProps {
  initialTab?: 'services' | 'trainings';
  onEnrollCourse: (course: TrainingCourse) => void;
  onOpenConsultation: () => void;
}

export const ServicesTrainingsView: React.FC<ServicesTrainingsViewProps> = ({
  initialTab = 'services',
  onEnrollCourse,
  onOpenConsultation,
}) => {
  const [activeSegment, setActiveSegment] = useState<'services' | 'trainings'>(initialTab);
  const [expandedCurriculum, setExpandedCurriculum] = useState<Record<string, boolean>>({});

  const toggleCurriculum = (courseId: string) => {
    setExpandedCurriculum((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const iconMap: Record<string, React.ReactNode> = {
    ShoppingBag: <ShoppingBag className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Search: <Search className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    TrendingUp: <TrendingUp className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
            Capabilities & Academy
          </span>
          <h1 data-split className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-3 mb-4 tracking-tight">
            Marketplace Services & Trainings
          </h1>
          <p className="text-[#A1A1AA] text-base leading-relaxed">
            Professional marketplace management across eBay, Shopify, Amazon, TikTok Shop, and Walmart, custom digital services, and practical skill courses in Multan.
          </p>

          {/* Segmented Control (Zero-Pill Discipline) */}
          <div className="inline-flex items-center p-1.5 mt-8 bg-[#141414] border border-white/10 rounded-xl">
            <button
              onClick={() => setActiveSegment('services')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeSegment === 'services'
                  ? 'bg-[#C8282D] text-white shadow-[0_0_15px_rgba(200,40,45,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Marketplaces & Services</span>
            </button>
            <button
              onClick={() => setActiveSegment('trainings')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeSegment === 'trainings'
                  ? 'bg-[#C8282D] text-white shadow-[0_0_15px_rgba(200,40,45,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Training Academy ({siteConfig.trainings.length} Courses)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Agency Services (Group 1: Marketplace Services + Group 2: General Services) */}
        {activeSegment === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-16"
          >
            {/* GROUP 1: MARKETPLACE SERVICES */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8282D] block">
                  Core E-Commerce Channels
                </span>
                <h2 className="text-2xl sm:text-3xl font-brand-serif font-bold text-white mt-1">
                  Marketplace Services
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Dedicated operational and catalog support structured for each platform's distinct requirements.
                </p>
              </div>

              <div data-stagger="0.1" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {siteConfig.marketplaceServices.map((item) => (
                  <div
                    key={item.id}
                    data-tilt="6"
                    className="ae-spot bg-[#111111] border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-[#C8282D]/40 transition-colors duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-brand-serif font-bold text-white">
                          {item.platform}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#C8282D] bg-[#C8282D]/10 px-2.5 py-0.5 rounded">
                          {item.platform === 'eBay' ? 'Priority Marketplace' : 'Marketplace'}
                        </span>
                      </div>

                      <p className="text-xs font-mono text-[#E53935] mb-3">{item.tagline}</p>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="space-y-2 mb-8">
                        <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 block">
                          Included Scope of Work:
                        </span>
                        {item.services.map((srv, si) => (
                          <div key={si} className="flex items-start gap-2 text-xs text-neutral-300">
                            <CheckCircle className="w-3.5 h-3.5 text-[#C8282D] shrink-0 mt-0.5" />
                            <span>{srv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-neutral-500 font-mono">
                        Turnkey Setup & Ongoing Management
                      </span>
                      <button
                        onClick={onOpenConsultation}
                        data-magnetic
                        className="px-4 py-2 bg-neutral-900 hover:bg-[#C8282D] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GROUP 2: GENERAL DIGITAL SERVICES */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8282D] block">
                  Engineering & Performance
                </span>
                <h2 className="text-2xl sm:text-3xl font-brand-serif font-bold text-white mt-1">
                  Web Development, SEO & Digital Marketing
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Full-stack engineering, organic search indexation, and digital design services.
                </p>
              </div>

              <div data-stagger="0.08" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteConfig.generalServices.map((service) => (
                  <div
                    key={service.id}
                    data-tilt="6"
                    className="ae-spot bg-[#111111] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-[#C8282D]/40 transition-colors duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-[#C8282D] font-bold">
                          {service.number}
                        </span>
                        <div className="p-2 rounded-lg bg-neutral-900 text-[#E53935]">
                          {iconMap[service.iconName]}
                        </div>
                      </div>

                      <h3 className="text-xl font-brand-serif font-bold text-white mb-1.5">
                        {service.title}
                      </h3>
                      <p className="text-xs font-mono text-[#A1A1AA] mb-3">{service.tagline}</p>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-400 block">
                          Core Capabilities:
                        </span>
                        {service.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-neutral-300">
                            <CheckCircle className="w-3 h-3 text-[#C8282D] shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-500">Multan HQ & Remote</span>
                      <button
                        onClick={onOpenConsultation}
                        data-magnetic
                        className="text-xs font-semibold text-white hover:text-[#E53935] flex items-center gap-1 transition-colors"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Project Callout */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-[#141414] to-[#1a1111] border border-[#C8282D]/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-brand-serif font-bold text-white">
                  Need a Unified Multi-Channel Strategy?
                </h3>
                <p className="text-sm text-[#A1A1AA] mt-1 max-w-2xl">
                  We formulate cohesive marketplace rollouts integrating eBay, Shopify, Amazon, TikTok Shop, and Walmart operations.
                </p>
              </div>
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 bg-[#C8282D] hover:bg-[#E53935] text-white font-medium text-xs rounded-lg transition-colors whitespace-nowrap shadow-lg"
              >
                Schedule Executive Briefing
              </button>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Training Academy (With Amazon, TikTok Shop, Walmart, Shopify + TODO values) */}
        {activeSegment === 'trainings' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            <div data-stagger="0.1" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {siteConfig.trainings.map((course) => {
                const isExpanded = !!expandedCurriculum[course.id];
                return (
                  <div
                    key={course.id}
                    data-tilt="6"
                    className="ae-spot bg-[#121212] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#C8282D]/50 transition-colors"
                  >
                    <div>
                      {/* Course Header */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8282D] bg-[#C8282D]/10 px-2.5 py-1 rounded">
                          {course.platformTag || course.badge}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                          <span className="text-emerald-400 font-semibold">{course.seatsRemaining} seats open</span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-brand-serif font-bold text-white mb-3">
                        {course.title}
                      </h2>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                        {course.description}
                      </p>

                      {/* Course Meta Info with TODO markers */}
                      <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs mb-6 font-mono">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Clock className="w-4 h-4 text-[#C8282D]" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <DollarSign className="w-4 h-4 text-[#C8282D]" />
                          <span>{course.fee}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <MapPin className="w-4 h-4 text-[#C8282D]" />
                          <span>{course.mode}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Award className="w-4 h-4 text-[#C8282D]" />
                          <span>Official Certificate</span>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="space-y-2 mb-6">
                        <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 block">
                          Syllabus Highlights:
                        </span>
                        {course.highlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                            <CheckCircle className="w-3.5 h-3.5 text-[#C8282D] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Syllabus Accordion */}
                      <div className="mb-6 pt-4 border-t border-white/5">
                        <button
                          onClick={() => toggleCurriculum(course.id)}
                          className="w-full flex items-center justify-between text-xs font-mono text-[#E53935] hover:text-white transition-colors"
                        >
                          <span>{isExpanded ? 'Hide Detailed Curriculum' : 'View Week-by-Week Curriculum'}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-4 space-y-2"
                            >
                              {course.curriculum.map((week, wi) => (
                                <div
                                  key={wi}
                                  className="text-xs text-neutral-400 bg-neutral-950 p-2.5 rounded border border-neutral-800/60"
                                >
                                  {week}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Enrollment CTA */}
                    <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                      <button
                        onClick={() => onEnrollCourse(course)}
                        data-magnetic
                        className="w-full py-3 bg-[#C8282D] hover:bg-[#E53935] text-white font-medium text-xs rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(200,40,45,0.35)] flex items-center justify-center gap-2"
                      >
                        <span>Apply For Admission (Reserve Seat)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Campus Coordinates Callout */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-neutral-800 text-[#E53935]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-brand-serif font-bold text-white">
                    Physical Campus at Chase Up, Bosan Road, Multan
                  </h4>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Equipped with high-speed development lab, smart display screens, and personalized 1-on-1 mentor guidance.
                  </p>
                </div>
              </div>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Inquire Campus Timings
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
