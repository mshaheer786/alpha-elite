import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, MessageSquare, GraduationCap, MapPin, Calendar, Clock } from 'lucide-react';
import { TrainingCourse } from '../content/site';
import { storageService } from '../services/storageService';

interface EnrollmentModalProps {
  course: TrainingCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onEnrolled?: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnrolled,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<string>('Onsite Multan (Chase Up)');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  if (!isOpen || !course) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Phone / WhatsApp is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    storageService.saveEnrollment({
      name,
      email,
      phone,
      courseId: course.id,
      courseTitle: course.title,
      mode,
    });

    const wa = storageService.createWhatsAppUrl({
      name,
      phone,
      course: `${course.title} (${mode})`,
      message: `I would like to enroll in the ${course.title}. Please share next steps and fee structure.`,
    });

    setWhatsAppUrl(wa);
    setIsSuccess(true);
    if (onEnrolled) onEnrolled();
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setPhone('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Crimson accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8282D] to-[#E53935]" />

          {/* Close button */}
          <button
            onClick={handleResetAndClose}
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
                Seat Reserved
              </h3>
              <p className="text-[#A1A1AA] text-sm mb-6 max-w-sm mx-auto">
                Your admission application for <strong className="text-white">{course.title}</strong> has been logged into our admissions office.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] text-black font-semibold text-sm rounded-lg hover:bg-[#20ba59] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Confirm Seat on WhatsApp
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="text-xs text-neutral-400 hover:text-white py-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E53935] mb-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academy Admission</span>
                  <span>·</span>
                  <span>{course.seatsRemaining} seats left</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-brand-serif font-bold text-white leading-tight">
                  {course.title}
                </h3>
              </div>

              {/* Course Meta Info */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>Chase Up, Multan / Online</span>
                </div>
              </div>

              {/* Enrollment Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Student Full Name <span className="text-[#C8282D]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shaheer Qureshi"
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
                    />
                    {errors.email && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      WhatsApp Number <span className="text-[#C8282D]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0323 3748408"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D] transition-colors"
                    />
                    {errors.phone && <span className="text-[11px] text-red-400 mt-0.5 block">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Learning Mode Preference
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8282D] transition-colors"
                  >
                    <option value="Onsite Multan (Chase Up, Bosan Road)">
                      Onsite Multan (Campus at Chase Up, Bosan Road)
                    </option>
                    <option value="Live Interactive Online (Zoom / LMS)">
                      Live Interactive Online (Zoom / LMS)
                    </option>
                    <option value="Hybrid (Physical Weekend Labs + Online)">
                      Hybrid (Physical Weekend Labs + Online)
                    </option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-[#C8282D] hover:bg-[#E53935] text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(200,40,45,0.4)]"
                  >
                    Complete Enrollment Application
                  </button>
                  <p className="text-[11px] text-neutral-500 text-center mt-2">
                    Zero application fee. Official certificate awarded upon graduation.
                  </p>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
