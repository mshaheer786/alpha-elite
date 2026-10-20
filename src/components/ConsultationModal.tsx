import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { storageService } from '../services/storageService';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSubmitted?: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onLeadSubmitted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'E-commerce Architecture',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone / WhatsApp is required';
    if (!formData.message.trim()) errs.message = 'Please provide details';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    storageService.saveLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      source: 'Quick Consultation Modal',
    });

    const wa = storageService.createWhatsAppUrl({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    });

    setWhatsAppUrl(wa);
    setIsSuccess(true);
    if (onLeadSubmitted) onLeadSubmitted();
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'E-commerce Architecture',
      budget: '$1,000 - $3,000',
      message: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8282D] to-[#E53935]" />

          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#C8282D]/20 border border-[#C8282D] flex items-center justify-center text-[#E53935] mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-brand-serif font-bold text-white mb-2">
                Inquiry Successfully Logged
              </h3>
              <p className="text-[#A1A1AA] text-sm mb-6 max-w-sm mx-auto">
                Thank you, <strong className="text-white">{formData.name}</strong>. Our director will review your brief.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] text-black font-semibold text-sm rounded-lg hover:bg-[#20ba59] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Connect Instantly on WhatsApp
                </a>
                <button
                  onClick={handleClose}
                  className="text-xs text-neutral-400 hover:text-white py-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-mono text-[#E53935] uppercase tracking-wider block mb-1">
                  Free Strategic Consultation
                </span>
                <h3 className="text-2xl font-brand-serif font-bold text-white leading-tight">
                  Discuss Your Project
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Name <span className="text-[#C8282D]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Shaheer Ahmed"
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D]"
                  />
                  {errors.name && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.name}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Email Address <span className="text-[#C8282D]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D]"
                    />
                    {errors.email && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Phone / WhatsApp <span className="text-[#C8282D]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0323 3748408"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D]"
                    />
                    {errors.phone && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Requested Service or Focus
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8282D]"
                  >
                    <option value="Shopify Store Development">Shopify Store Development</option>
                    <option value="Amazon Account & PPC">Amazon Seller Account & PPC</option>
                    <option value="TikTok Shop Management">TikTok Shop Setup & Affiliates</option>
                    <option value="Walmart Marketplace">Walmart Marketplace Management</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Search Engine Optimization">Search Engine Optimization (SEO)</option>
                    <option value="Digital & Performance Marketing">Digital & Performance Marketing</option>
                    <option value="UI/UX & Brand Design">UI/UX & Brand Design</option>
                    <option value="Training Academy Admission">Training Academy Admission</option>
                    <option value="Other Consulting">Other Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Project Details & Goals <span className="text-[#C8282D]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your business goals or timelines..."
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D]"
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-400 mt-0.5 block">{errors.message}</span>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-[#C8282D] hover:bg-[#E53935] text-white font-medium text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(200,40,45,0.4)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Callback</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
