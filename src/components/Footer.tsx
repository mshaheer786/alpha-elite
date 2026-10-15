import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, MessageSquare, Facebook } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../content/site';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenConsultation }) => {
  return (
    <footer className="bg-[#050505] border-t border-neutral-900 text-neutral-400 text-xs">
      {/* Upper Footer Action Banner */}
      <div className="border-b border-neutral-900/80 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C8282D] font-mono">
              Multi-Marketplace Growth
            </span>
            <h3 className="text-2xl sm:text-3xl font-brand-serif font-bold text-white mt-1">
              Shopify · Amazon · TikTok Shop · Walmart
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              data-magnetic
              className="px-6 py-3 bg-[#C8282D] hover:bg-[#E53935] text-white font-medium text-xs rounded-lg transition-all shadow-[0_0_20px_rgba(200,40,45,0.3)] flex items-center gap-2"
            >
              <span>Book Strategic Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-medium text-xs rounded-lg transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div data-stagger="0.08" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" showWordmark={true} showTagline={true} />
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mt-4">
              Alpha Elite Solutions & Trainings provides marketplace management across Shopify, Amazon, TikTok Shop, and Walmart, custom web development, and practical hands-on trainings in Multan.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-[#C8282D] text-white transition-colors"
                aria-label="Alpha Elite Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-emerald-600 text-white transition-colors"
                aria-label="Direct WhatsApp Contact"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="p-2.5 rounded-lg bg-neutral-900 hover:bg-[#C8282D] text-white transition-colors"
                aria-label="Official Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Marketplaces & Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase font-mono text-[11px]">
              Marketplace Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Shopify Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Amazon Account Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  TikTok Shop Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Walmart Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Full-Stack Web Dev & SEO
                </button>
              </li>
            </ul>
          </div>

          {/* Professional Trainings */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase font-mono text-[11px]">
              Training Academy
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Shopify Store Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Amazon Seller Central
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  TikTok Shop & Affiliates
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Walmart Marketplace Ops
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="ae-link hover:text-white transition-colors text-left"
                >
                  Full-Stack Web & SEO
                </button>
              </li>
            </ul>
          </div>

          {/* Multan HQ Coordinates */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase font-mono text-[11px]">
              Multan Headquarters
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8282D] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8282D] shrink-0" />
                <a
                  href={siteConfig.contact.whatsappLink}
                  className="hover:text-white font-mono"
                >
                  {siteConfig.contact.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8282D] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="pt-2 text-neutral-500">
                <span>{siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Platform Disclaimer */}
        <div className="mt-12 pt-6 border-t border-neutral-900 text-neutral-500 text-[11px] leading-relaxed">
          <p>{siteConfig.disclaimer}</p>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="mt-6 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© {new Date().getFullYear()} Alpha Elite Solutions & Trainings. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('admin')}
              className="text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Admin Backoffice
            </button>
            <span>·</span>
            <span>Chase Up, Bosan Road, Multan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
