import React from 'react';
import { motion } from 'motion/react';

interface SectionDividerProps {
  className?: string;
  glow?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  glow = true,
}) => {
  return (
    <div className={`relative w-full h-[1px] overflow-hidden ${className}`}>
      {/* Base neutral hairline fading to edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

      {/* Subtle animated sweeping crimson gradient accent */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 4.8,
          ease: 'easeInOut',
          repeatDelay: 0.5,
        }}
        className="absolute inset-0 w-2/5 bg-gradient-to-r from-transparent via-[#C8282D]/60 to-transparent"
      />

      {/* Soft atmospheric center glow */}
      {glow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-3 bg-[#C8282D]/15 blur-sm pointer-events-none" />
      )}
    </div>
  );
};
