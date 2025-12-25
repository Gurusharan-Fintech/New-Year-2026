
import React from 'react';
import { motion } from 'framer-motion';

interface NumberReelProps {
  isScrolling: boolean;
  onComplete: () => void;
}

const NumberReel: React.FC<NumberReelProps> = ({ isScrolling, onComplete }) => {
  // We use exactly 1em height to match the standard text line height of the '202' prefix.
  // overflow-hidden ensures that the '6' below is physically impossible to see until the reel moves.
  return (
    <div className="relative h-[1em] w-[0.65em] overflow-hidden inline-flex select-none leading-none">
      <motion.div
        initial={{ y: '0%' }}
        animate={isScrolling ? { y: '-50%' } : { y: '0%' }}
        transition={{ 
          duration: 1.5, 
          ease: [0.65, 0, 0.35, 1], // Smooth mechanical reel ease
        }}
        onAnimationComplete={() => {
          if (isScrolling) {
            onComplete();
          }
        }}
        className="flex flex-col items-center h-[200%] w-full"
      >
        {/* Container for '5' - occupy exactly 50% of the 200% height (which is 100% of the parent) */}
        <div className="h-1/2 w-full flex items-center justify-center">
          <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] cursor-pointer">
            5
          </span>
        </div>
        
        {/* Container for '6' - hidden initially because it's in the bottom 50% */}
        <div className="h-1/2 w-full flex items-center justify-center">
          <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
            6
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default NumberReel;
