import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight, BookOpen, Check } from 'lucide-react';
import { siteConfig, BlogPost } from '../content/site';

interface BlogViewProps {
  onOpenConsultation: () => void;
  setActiveTab: (tab: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenConsultation, setActiveTab }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            /* =========================================================================
               DETAILED ARTICLE READER
               ========================================================================= */
            <motion.div
              key="post-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#E53935] hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Insights</span>
              </button>

              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
                <span className="text-[#C8282D] uppercase font-semibold">{selectedPost.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedPost.date}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedPost.readTime}</span>
              </div>

              {/* Title */}
              <h1 data-reveal className="text-2xl sm:text-4xl font-brand-serif font-bold text-white mb-6 leading-tight">
                {selectedPost.title}
              </h1>

              {/* Author & Share Bar */}
              <div className="flex items-center justify-between py-4 border-y border-neutral-800 mb-10 text-xs text-neutral-400">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                    AE
                  </div>
                  <div>
                    <span className="text-white font-medium block">Alpha Elite Research Team</span>
                    <span className="text-[11px] text-neutral-500">Multan, Pakistan</span>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>

              {/* Excerpt Lead */}
              <p className="text-lg text-neutral-300 leading-relaxed font-light mb-8 italic border-l-2 border-[#C8282D] pl-4">
                {selectedPost.excerpt}
              </p>

              {/* Article Markdown Body */}
              <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#A1A1AA] leading-relaxed space-y-6">
                {selectedPost.content.split('\n\n').map((paragraph: string, idx: number) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-xl sm:text-2xl font-brand-serif font-bold text-white pt-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-2 text-neutral-300 text-sm">
                        {paragraph.split('\n').map((item: string, ii: number) => (
                          <li key={ii}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.match(/^\d+\. /)) {
                    return (
                      <ol key={idx} className="list-decimal pl-5 space-y-2 text-neutral-300 text-sm">
                        {paragraph.split('\n').map((item: string, ii: number) => (
                          <li key={ii}>{item.replace(/^\d+\. /, '')}</li>
                        ))}
                      </ol>
                    );
                  }
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>

              {/* End-of-Article Inbound Box */}
              <div className="mt-14 p-8 rounded-2xl bg-[#121212] border border-[#C8282D]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-brand-serif font-bold text-white">
                    Ready to Execute this Strategy?
                  </h4>
                  <p className="text-xs text-[#A1A1AA] mt-1 max-w-md">
                    Our agency builds these systems for brands, while our academy trains future engineers in Multan.
                  </p>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 bg-[#C8282D] hover:bg-[#E53935] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                >
                  Consult Our Team
                </button>
              </div>
            </motion.div>
          ) : (
            /* =========================================================================
               POSTS LISTING
               ========================================================================= */
            <motion.div
              key="posts-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8282D]">
                  Market Intelligence & Guides
                </span>
                <h1 data-split className="text-3xl sm:text-5xl font-brand-serif font-bold text-white mt-3 mb-4 tracking-tight">
                  Insights on SEO, E-Commerce & Growth
                </h1>
                <p className="text-[#A1A1AA] text-base leading-relaxed">
                  Practical guides and strategies based on real execution across Pakistani and international markets.
                </p>
              </div>

              <div data-stagger="0.1" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {siteConfig.blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    data-tilt="5"
                    onClick={() => {
                      setSelectedPost(post);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="ae-spot bg-[#111111] border border-white/5 p-8 rounded-2xl flex flex-col justify-between cursor-pointer group hover:border-[#C8282D]/40 transition-all duration-300"
                  >
                    <div>
                      {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
                        <span className="text-[#C8282D] font-semibold">{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.date}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-brand-serif font-bold text-white mb-3 group-hover:text-[#E53935] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-4 h-4 text-[#C8282D] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
