import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../content/site';
import { storageService } from '../services/storageService';

interface CartoonLampContactProps {
  onLeadSubmitted?: () => void;
}

export const CartoonLampContact: React.FC<CartoonLampContactProps> = ({ onLeadSubmitted }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [isLampOn, setIsLampOn] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string>('');
  const draggedCordRef = useRef(false);

  React.useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionPreference.matches);
      if (motionPreference.matches) setIsLampOn(true);
    };
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'E-commerce Architecture',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const turnOnLamp = () => setIsLampOn(true);
  const toggleLamp = () => setIsLampOn((lampIsOn) => !lampIsOn);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone / WhatsApp is required';
    if (!formData.message.trim()) errors.message = 'Please provide details about your project';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    storageService.saveLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      source: 'Contact Form (Cartoon Lamp Reveal)',
    });

    const waUrl = storageService.createWhatsAppUrl({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    });

    setSubmittedWhatsAppUrl(waUrl);
    setIsSubmitted(true);
    if (onLeadSubmitted) onLeadSubmitted();
  };

  return (
    <section id="contact" className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-neutral-900 transition-colors duration-700 ${isLampOn ? 'bg-[#160d0b]' : 'bg-[#070707]'}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isLampOn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(245,158,11,0.12), rgba(200,40,45,0.12) 38%, transparent 72%)',
        }}
      />
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C8282D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8282D] font-mono font-medium">
            Let's Build Something Exceptional
          </span>
          <h2 data-split className="text-2xl sm:text-4xl font-brand-serif font-bold text-white mt-3 mb-4 tracking-tight">
            Consult With Our Agency
          </h2>
          <p data-reveal className="text-[#A1A1AA] text-base leading-relaxed">
            Pull the lamp cord below to reveal the consultation form, or skip straight to the form.
          </p>
        </div>

        {/* =========================================================================
            INTERACTIVE LAMP & CARTOON MASCOT STAGE
           ========================================================================= */}
        <div className="relative mb-12 flex flex-col items-center">
          {/* Ceiling mount & cable */}
          <div className="w-1.5 h-12 bg-gradient-to-b from-neutral-600 to-neutral-400" />

          {/* Lamp fixture */}
          <div className="relative flex flex-col items-center">
            {/* Lamp shade */}
            <div
              className={`w-32 h-14 rounded-t-full transition-all duration-300 relative border border-neutral-700 shadow-2xl ${
                isLampOn
                  ? 'bg-gradient-to-b from-[#262626] to-[#C8282D] shadow-[0_0_50px_rgba(200,40,45,0.4)]'
                  : 'bg-neutral-800'
              }`}
            >
              {/* Inner bulb glow */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full transition-all duration-300 ${
                  isLampOn
                    ? 'bg-amber-100 shadow-[0_0_30px_#fde68a,0_0_60px_#ef4444]'
                    : 'bg-neutral-600'
                }`}
              />
            </div>

            {/* Hanging Pull-Cord */}
            <div className="absolute top-10 right-2 flex flex-col items-center z-30">
              <motion.button
                type="button"
                drag={prefersReducedMotion ? false : 'y'}
                dragConstraints={{ top: 0, bottom: 92 }}
                dragElastic={0.16}
                dragMomentum={false}
                dragTransition={{ bounceStiffness: 520, bounceDamping: 18 }}
                onDragStart={() => {
                  draggedCordRef.current = true;
                }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 42) turnOnLamp();
                  window.setTimeout(() => {
                    draggedCordRef.current = false;
                  }, 0);
                }}
                onClick={() => {
                  if (draggedCordRef.current) {
                    draggedCordRef.current = false;
                    return;
                  }
                  toggleLamp();
                }}
                className="flex flex-col items-center cursor-grab active:cursor-grabbing group bg-transparent border-0 p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8282D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707] rounded-lg"
                aria-label={isLampOn ? 'Turn off the light' : 'Turn on the light'}
                aria-pressed={isLampOn}
                title={isLampOn ? 'Turn off the light' : 'Turn on the light'}
              >
                {/* Thin golden chain */}
                <div className="w-0.5 h-16 bg-amber-400/80 group-hover:bg-amber-300 transition-colors" />
                {/* Brass bead handle */}
                <div className="w-4 h-6 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-lg border border-amber-200 group-hover:scale-110 transition-transform" />
                {/* Pull Hint Label */}
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/90 whitespace-nowrap mt-1 group-hover:text-amber-200 transition-colors">
                  {isLampOn ? 'Light On' : 'Pull to turn on'}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Dynamic Light Beam Casting on Cartoon Mascot */}
          <div
            className={`w-full max-w-4xl h-80 transition-opacity duration-1000 pointer-events-none relative ${
              isLampOn ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Conical light cone */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(254, 243, 199, 0.22) 0%, rgba(200, 40, 45, 0.16) 40%, rgba(10, 10, 10, 0) 75%)',
              }}
            />

            {/* Animated Cartoon Mascot */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="relative">
                {/* Speech Bubble */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isLampOn ? 1 : 0,
                    y: isLampOn ? 0 : 8,
                    scale: isLampOn ? 1 : 0.9,
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 border border-[#C8282D]/40 text-white text-xs px-3.5 py-1.5 rounded-full shadow-xl pointer-events-auto"
                >
                  <span className="text-[#E53935] font-semibold mr-1.5">Alpha Mascot:</span>
                  "Office is open! Fill the brief below."
                </motion.div>

                {/* Cartoon Mascot SVG Character */}
                <svg
                  width="130"
                  height="140"
                  viewBox="0 0 130 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-2xl"
                >
                  {/* Ears */}
                  <path d="M35 30 L45 8 L60 25 Z" fill="#C8282D" stroke="#0A0A0A" strokeWidth="2" />
                  <path d="M95 30 L85 8 L70 25 Z" fill="#C8282D" stroke="#0A0A0A" strokeWidth="2" />
                  <path d="M40 26 L46 14 L55 24 Z" fill="#F87171" />
                  <path d="M90 26 L84 14 L75 24 Z" fill="#F87171" />

                  {/* Body & Blazer */}
                  <ellipse cx="65" cy="110" rx="38" ry="32" fill="#141414" />
                  {/* Burgundy shirt collar */}
                  <path d="M54 85 L65 105 L76 85 Z" fill="#991B1B" />
                  {/* Suit Lapels */}
                  <path d="M44 86 L54 125 L40 130 Z" fill="#262626" />
                  <path d="M86 86 L76 125 L90 130 Z" fill="#262626" />
                  {/* Red pocket square */}
                  <rect x="42" y="105" width="8" height="3" rx="1" fill="#DC2626" />

                  {/* Cartoon Head */}
                  <circle cx="65" cy="58" r="34" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
                  {/* Fox/Mascot Cheek Fur Patches */}
                  <path d="M36 60 Q30 70 42 75 Z" fill="#E4E4E7" />
                  <path d="M94 60 Q100 70 88 75 Z" fill="#E4E4E7" />

                  {/* Animated Eyes */}
                  {isLampOn ? (
                    <>
                      {/* Big energetic open eyes */}
                      <circle cx="53" cy="52" r="6.5" fill="#18181B" />
                      <circle cx="55" cy="50" r="2.5" fill="#FFFFFF" />
                      <circle cx="77" cy="52" r="6.5" fill="#18181B" />
                      <circle cx="79" cy="50" r="2.5" fill="#FFFFFF" />
                    </>
                  ) : (
                    <>
                      {/* Sleepy closed eyelids */}
                      <path d="M47 54 Q53 59 59 54" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M71 54 Q77 59 83 54" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
                    </>
                  )}

                  {/* Cute Nose */}
                  <polygon points="65,62 61,67 69,67" fill="#C8282D" />

                  {/* Smiling Mouth */}
                  <path
                    d={isLampOn ? 'M58 72 Q65 79 72 72' : 'M60 74 Q65 73 70 74'}
                    stroke="#18181B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Designer Glasses */}
                  <rect x="44" y="44" width="18" height="15" rx="4" stroke="#C8282D" strokeWidth="2" fill="none" />
                  <rect x="68" y="44" width="18" height="15" rx="4" stroke="#C8282D" strokeWidth="2" fill="none" />
                  <line x1="62" y1="51" x2="68" y2="51" stroke="#C8282D" strokeWidth="2" />

                  {/* Waving Paw (when light is ON) */}
                  {isLampOn && (
                    <motion.g
                      animate={prefersReducedMotion ? undefined : { rotate: [0, 15, -10, 15, 0] }}
                      transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ originX: '95px', originY: '95px' }}
                    >
                      <circle cx="98" cy="85" r="7" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5" />
                      <circle cx="95" cy="82" r="2" fill="#E4E4E7" />
                      <circle cx="99" cy="81" r="2" fill="#E4E4E7" />
                    </motion.g>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {!isLampOn && (
          <div className="mb-8 flex justify-center">
            <button
              type="button"
              onClick={turnOnLamp}
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#E53935] hover:bg-[#C8282D]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8282D]"
            >
              Skip — show contact form
            </button>
          </div>
        )}

        <div className="relative z-10 mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href={`tel:${siteConfig.contact.formattedPhone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111111]/90 px-4 py-4 text-sm text-white transition-colors hover:border-[#C8282D]/60 hover:text-[#E53935]"
          >
            <Phone className="h-4 w-4 text-[#E53935]" />
            {siteConfig.contact.formattedPhone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111111]/90 px-4 py-4 text-sm text-white transition-colors hover:border-[#C8282D]/60 hover:text-[#E53935] break-all"
          >
            <Mail className="h-4 w-4 shrink-0 text-[#E53935]" />
            {siteConfig.contact.email}
          </a>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-[#111111]/90 px-4 py-4 text-sm text-emerald-400 transition-colors hover:bg-emerald-600/10"
          >
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        {/* =========================================================================
            CONTACT CONTENT (REVEALED BY LAMP)
           ========================================================================= */}
        <AnimatePresence>
          {isLampOn ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Form Card (7 Cols) */}
              <div className="lg:col-span-7 bg-[#111111]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl relative shadow-2xl">
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-brand-serif font-bold text-white">
                      Direct Project Inquiry
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-1">
                      Priority response within 2 hours during operating hours.
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#C8282D]/20 border border-[#C8282D] flex items-center justify-center text-[#E53935] mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-brand-serif font-bold text-white mb-2">
                      Inquiry Received & Logged
                    </h4>
                    <p className="text-[#A1A1AA] text-sm max-w-md mx-auto mb-6">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Your requirement has been saved into our director dispatch log.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <a
                        href={submittedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-black font-semibold text-sm rounded-lg hover:bg-[#20ba59] transition-colors shadow-lg"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        Chat on WhatsApp Now
                      </a>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            service: 'E-commerce Architecture',
                            budget: '$1,000 - $3,000',
                            message: '',
                          });
                        }}
                        className="px-5 py-3 text-xs text-neutral-400 hover:text-white transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} data-stagger="0.06" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          Your Name <span className="text-[#C8282D]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Shaheer Ahmed"
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
                        />
                        {formErrors.name && (
                          <span className="text-[11px] text-red-400 mt-1 block">{formErrors.name}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          Email Address <span className="text-[#C8282D]">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="shaheer@example.com"
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
                        />
                        {formErrors.email && (
                          <span className="text-[11px] text-red-400 mt-1 block">{formErrors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          Phone / WhatsApp <span className="text-[#C8282D]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0323 3748408"
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
                        />
                        {formErrors.phone && (
                          <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          Requested Service / Training
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8282D] transition-colors"
                        >
                          <option value="Shopify Store Development">Shopify Store Development</option>
                          <option value="Amazon Account & PPC">Amazon Seller Account & PPC</option>
                          <option value="TikTok Shop Management">TikTok Shop Setup & Affiliates</option>
                          <option value="Walmart Marketplace">Walmart Marketplace Management</option>
                          <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                          <option value="Search Engine Optimization">Search Engine Optimization (SEO)</option>
                          <option value="Digital & Performance Marketing">Digital & Performance Marketing</option>
                          <option value="UI/UX & Brand Design">UI/UX & Brand Design</option>
                          <option value="Training: Shopify Track">Training: Shopify E-Commerce</option>
                          <option value="Training: Amazon Track">Training: Amazon Seller Central</option>
                          <option value="Training: TikTok Shop Track">Training: TikTok Shop & Affiliates</option>
                          <option value="Training: Walmart Track">Training: Walmart Marketplace</option>
                          <option value="Other Consulting">Other Consulting</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Project Scope & Requirements <span className="text-[#C8282D]">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your brand, current challenges, or training goals..."
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
                      />
                      {formErrors.message && (
                        <span className="text-[11px] text-red-400 mt-1 block">{formErrors.message}</span>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        data-magnetic
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#C8282D] hover:bg-[#E53935] text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(200,40,45,0.4)]"
                      >
                        <Send className="w-4 h-4" />
                        Submit Project Brief
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Office Details & Direct Channels (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Contact Card */}
                <div data-reveal className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-lg font-brand-serif font-bold text-white mb-4">
                    Office & Communication
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-lg bg-neutral-800/80 text-[#E53935] shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 block font-mono">Headquarters Location</span>
                        <p className="text-white font-medium">{siteConfig.contact.address}</p>
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Chase+Up+Bosan+Road+Multan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#E53935] hover:underline mt-1"
                        >
                          Open in Google Maps <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-lg bg-neutral-800/80 text-[#E53935] shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 block font-mono">Official Email</span>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-white hover:text-[#E53935] transition-colors break-all"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-lg bg-neutral-800/80 text-[#E53935] shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 block font-mono">Call / WhatsApp</span>
                        <a
                          href={siteConfig.contact.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-[#E53935] transition-colors font-mono"
                        >
                          {siteConfig.contact.formattedPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-lg bg-neutral-800/80 text-[#E53935] shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 block font-mono">Academy & Agency Hours</span>
                        <p className="text-white">{siteConfig.contact.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Quick Button */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <a
                      href={siteConfig.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 font-medium text-xs rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Instant Chat on WhatsApp (+92 314 6077809)
                    </a>
                  </div>
                </div>

                {/* Trust guarantee badge */}
                <div data-reveal data-reveal-delay="0.1" className="bg-[#141414] border border-white/5 p-5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C8282D]/20 border border-[#C8282D] flex items-center justify-center text-[#E53935] font-bold text-xs">
                      AE
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Direct Executive Consultation</h4>
                      <p className="text-xs text-[#A1A1AA]">
                        All inquiries are personally reviewed by our lead strategists in Multan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
};
