import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, Search } from 'lucide-react';
import { siteConfig } from '../content/site';

interface FAQSectionProps {
  onOpenConsultation?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'services' | 'trainings'>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-5']); // Default open first in each
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = siteConfig.faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#090909] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
            Clarifying Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-2 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Everything you need to know about partnering with our digital agency or joining our hands-on training academy in Multan.
          </p>

          {/* Filter & Search Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            {/* Category Filter Tabs (Zero-Pill Discipline) */}
            <div className="inline-flex items-center p-1 bg-[#141414] border border-white/10 rounded-xl">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-[#C8282D] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All FAQs ({siteConfig.faqs.length})
              </button>
              <button
                onClick={() => setActiveCategory('services')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === 'services'
                    ? 'bg-[#C8282D] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveCategory('trainings')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === 'trainings'
                    ? 'bg-[#C8282D] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Academy Trainings
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics (e.g. COD, Multan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Collapsible Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#121212] border-[#C8282D]/40 shadow-lg'
                    : 'bg-[#0E0E0E] border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#C8282D] uppercase tracking-wider px-2 py-0.5 rounded bg-[#C8282D]/10 shrink-0">
                      {faq.category === 'services' ? 'Service' : 'Academy'}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-neutral-200 transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#C8282D] text-white rotate-180 shadow-[0_0_12px_rgba(200,40,45,0.4)]'
                        : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-white/5">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-12 text-center text-xs text-neutral-500 bg-[#121212] rounded-2xl border border-white/5">
              No questions found matching "{searchQuery}". Contact us directly on WhatsApp for immediate answers.
            </div>
          )}
        </div>

        {/* Bottom Direct Question CTA Card */}
        <div className="mt-12 p-6 rounded-2xl bg-[#111111] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-neutral-800 text-[#E53935] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a specific question not covered here?</h4>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Our directors are directly accessible via WhatsApp for immediate project or course inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] text-black font-semibold text-xs rounded-lg hover:bg-[#20ba59] transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Ask on WhatsApp</span>
            </a>
            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs rounded-lg transition-colors"
              >
                Book Call
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
