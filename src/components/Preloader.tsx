import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { prefersReducedMotion } from './animations/motion-utils';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const signalReady = () => {
      window.__aeReady = true;
      window.dispatchEvent(new Event('ae:ready'));
    };

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem('ae-seen') === '1';
    } catch (error) {
      console.warn('Unable to read the animation preloader session state.', error);
    }

    if (alreadySeen || prefersReducedMotion()) {
      signalReady();
      setIsDone(true);
      onComplete();
      return;
    }

    let completionTimer: number | undefined;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          completionTimer = window.setTimeout(() => {
            try {
              sessionStorage.setItem('ae-seen', '1');
            } catch (error) {
              console.warn('Unable to save the animation preloader session state.', error);
            }
            signalReady();
            setIsDone(true);
            window.setTimeout(onComplete, 400);
          }, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 35);

    return () => {
      clearInterval(timer);
      if (completionTimer !== undefined) window.clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          data-ae-preloader
          className="ae-preloader fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-center p-6"
        >
          {/* Centered Brand Emblem */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <BrandLogo size="xl" showWordmark={true} showTagline={true} />
            </motion.div>

            {/* Red Progress Indicator Bar */}
            <div className="w-56 sm:w-72 h-1 bg-neutral-900 rounded-full mt-10 overflow-hidden relative border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C8282D] to-[#E53935]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Percentage Counter */}
            <div className="flex items-center justify-between w-56 sm:w-72 mt-2.5 text-[11px] font-mono text-neutral-500">
              <span>INITIALIZING EXCELLENCE</span>
              <span className="text-[#C8282D] tabular-nums font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
