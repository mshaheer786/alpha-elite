import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../content/site';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 select-none"
      initial={{ scale: 0.8, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 320, delay: 0.4 }}
    >
      <a
        href={siteConfig.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact with Mian Abdul Raffay"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="ae-pulse group relative flex items-center bg-[#0A0D12]/92 hover:bg-[#10151E] text-white p-2 rounded-full border border-emerald-500/30 hover:border-emerald-400/80 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(37,211,102,0.22)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_28px_rgba(37,211,102,0.45)] backdrop-blur-xl transition-all duration-300 active:scale-95"
      >
        {/* Glowing pulse ring in background */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 blur-md transition-colors duration-300 pointer-events-none" />

        {/* WhatsApp Icon Circle with Online Status Indicator */}
        <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#25D366] via-[#20BD5A] to-[#128C7E] flex items-center justify-center text-white shadow-[0_0_16px_rgba(37,211,102,0.45)] group-hover:scale-105 transition-transform duration-300 shrink-0">
          <svg
            className="w-5 h-5 fill-white drop-shadow-sm"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.49 3.68 12.04 3.68C16.59 3.68 20.28 7.37 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15ZM16.56 14.4C16.31 14.28 15.1 13.68 14.88 13.6C14.65 13.52 14.49 13.48 14.32 13.72C14.16 13.97 13.69 14.52 13.54 14.69C13.4 14.85 13.25 14.87 13 14.75C12.75 14.62 11.71 14.28 10.48 13.18C9.52 12.33 8.87 11.28 8.68 10.96C8.5 10.63 8.66 10.46 8.79 10.33C8.9 10.22 9.04 10.04 9.16 9.89C9.29 9.75 9.33 9.65 9.41 9.48C9.49 9.32 9.45 9.18 9.39 9.05C9.33 8.93 8.83 7.71 8.63 7.2C8.42 6.71 8.22 6.78 8.07 6.77C7.92 6.76 7.76 6.76 7.59 6.76C7.43 6.76 7.16 6.82 6.94 7.07C6.71 7.31 6.09 7.89 6.09 9.07C6.09 10.25 6.95 11.39 7.07 11.55C7.19 11.71 8.77 14.14 11.19 15.18C11.76 15.43 12.21 15.58 12.56 15.69C13.14 15.87 13.67 15.85 14.09 15.78C14.55 15.71 15.52 15.19 15.72 14.62C15.93 14.05 15.93 13.56 15.87 13.46C15.81 13.36 15.65 13.3 15.4 13.18H16.56Z" />
          </svg>

          {/* Active Status Beacon */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[#0A0D12]" />
          </span>
        </div>

        {/* Prominent High-End Animated Expanding Label */}
        <AnimatePresence initial={false}>
          {isHovered && (
            <motion.div
              key="whatsapp-label"
              initial={{ width: 0, opacity: 0, filter: 'blur(4px)' }}
              animate={{
                width: 'auto',
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                  width: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.28, delay: 0.06 },
                  filter: { duration: 0.28, delay: 0.06 },
                },
              }}
              exit={{
                width: 0,
                opacity: 0,
                filter: 'blur(4px)',
                transition: {
                  width: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.16 },
                  filter: { duration: 0.16 },
                },
              }}
              className="overflow-hidden whitespace-nowrap pl-3 pr-2.5"
            >
              <motion.div
                initial={{ x: -12 }}
                animate={{ x: 0 }}
                exit={{ x: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[13px] font-bold tracking-tight text-white flex items-center gap-1.5 leading-tight">
                    Chat with Director
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium tracking-wide leading-none mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>Mian Abdul Raffay • Active Now</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </motion.div>
  );
};
