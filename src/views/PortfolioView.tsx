import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../content/data';
import { ProjectCard } from '../components/ProjectCard';

interface PortfolioViewProps {
  onOpenConsultation: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onOpenConsultation }) => {
  const [filter, setFilter] = useState<'All' | 'E-commerce' | 'Websites' | 'Branding'>('All');

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
            Verified Portfolio
          </span>
          <h1 data-split className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-3 mb-4 tracking-tight">
            Client Projects & Systems Built
          </h1>
          <p className="text-[#A1A1AA] text-base leading-relaxed">
            Real e-commerce storefronts and business websites developed and supported by Alpha Elite across Pakistan and internationally.
          </p>

          {/* Interactive Filter Tabs (Zero-Pill Discipline) */}
          <div data-reveal className="inline-flex items-center p-1.5 mt-8 bg-[#141414] border border-white/10 rounded-xl flex-wrap justify-center gap-1">
            {(['All', 'E-commerce', 'Websites', 'Branding'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  filter === cat
                    ? 'bg-[#C8282D] text-white shadow-[0_0_15px_rgba(200,40,45,0.4)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'All' ? `All Projects (${projects.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filterable Projects Grid (1 col mobile, 2 tablet, 3 desktop) */}
        <motion.div layout data-stagger="0.08" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.slug}
                className="h-full"
              >
                <ProjectCard project={project} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Notice Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-[#111111] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Have a project you want to build or migrate?</h4>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              We provide store setups, theme customization, and marketplace integrations tailored to your catalog.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-2.5 bg-[#C8282D] hover:bg-[#E53935] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  );
};
