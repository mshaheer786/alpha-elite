import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { siteConfig } from '../content/site';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenConsultation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Scroll effect detection (transparent at top, blurred dark after 20px, height shrinks)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Six links in exact specified order
  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Close drawer on route change or click
  const handleNavClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard accessibility: Escape key closes drawer, trap focus inside mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Left: AE logo + "ALPHA ELITE" wordmark */}
            <div className="shrink-0">
              <BrandLogo
                size="md"
                showWordmark={true}
                showTagline={false}
                onClick={() => handleNavClick('home')}
              />
            </div>

            {/* Center (tablet and desktop, 768px+): Six text links with red animated underlines */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`ae-link relative py-1 group transition-colors duration-200 whitespace-nowrap ${
                      isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>

                    {/* Animated Red Underline on hover / persistent on active page */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#C8282D] transition-all duration-300 ease-out rounded-full ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right: Red pill button "Get Free Consultation" */}
            <div className="hidden lg:flex items-center shrink-0">
              <button
                onClick={onOpenConsultation}
                data-magnetic
                aria-label="Get Free Consultation"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C8282D] hover:bg-[#E53935] rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(200,40,45,0.4)] whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Get Free Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile (below 768px): Clean Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8282D]"
                aria-label="Open Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Animated Drawer (below 768px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer Window */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative ml-auto w-full max-w-sm h-full bg-[#0E0E0E] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <BrandLogo size="sm" showWordmark={true} showTagline={false} />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Six Navigation Links */}
                <nav aria-label="Mobile Drawer Navigation" className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(item.id, e)}
                        className={`ae-link flex items-center justify-between py-3 px-3.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#C8282D]/15 text-[#E53935] font-semibold border-l-2 border-[#C8282D]'
                            : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C8282D]" />}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Actions: Pill CTA & WhatsApp Contact */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  data-magnetic
                  className="w-full py-3 bg-[#C8282D] hover:bg-[#E53935] text-white text-xs font-bold rounded-full transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Get Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp: {siteConfig.contact.phone}</span>
                </a>

                <p className="text-[11px] text-neutral-500 text-center font-mono pt-1">
                  Chase Up, Bosan Road, Multan
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
