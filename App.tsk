import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AnimationStep } from './types';
import FireworkBackground from './components/FireworkBackground';
import NumberReel from './components/NumberReel';

const App: React.FC = () => {
  const [step, setStep] = useState<AnimationStep>(AnimationStep.INITIAL);
  const [showHint, setShowHint] = useState(true);

  const triggerConfetti = (particleCount = 100, spread = 70, originY = 0.6) => {
    confetti({
      particleCount,
      spread,
      origin: { y: originY },
      colors: ['#fbbf24', '#f59e0b', '#ffffff', '#ef4444'],
      disableForReducedMotion: true
    });
  };

  const handleStartScroll = () => {
    if (step === AnimationStep.INITIAL) {
      setStep(AnimationStep.SCROLLING);
      setShowHint(false);
    }
  };

  const onScrollComplete = () => {
    setStep(AnimationStep.ZOOMING);
  };

  useEffect(() => {
    if (step === AnimationStep.ZOOMING) {
      // Trigger confetti exactly when zoom starts
      triggerConfetti(150, 100);
      
      // Delay to allow zoom animation to settle before showing headline
      const timer = setTimeout(() => {
        setStep(AnimationStep.HEADLINE_REVEALED);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleRevealMessage = () => {
    triggerConfetti(300, 160, 0.5); // Bigger burst
    setStep(AnimationStep.MESSAGE_REVEALED);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0a132e] via-[#182E6F] to-[#0a132e] text-white overflow-hidden select-none">
      <FireworkBackground />

      {/* Decorative Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#182E6F]/30 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full" />
         <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-400/5 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {step !== AnimationStep.MESSAGE_REVEALED ? (
          <motion.main
            key="main-scene"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="relative z-10 flex flex-col items-center justify-center text-center w-full"
          >
            {/* The Year Display */}
            <motion.div
              layout
              initial={{ scale: 1 }}
              animate={{ 
                scale: (step === AnimationStep.ZOOMING || step === AnimationStep.HEADLINE_REVEALED) ? 0.7 : 1,
                y: step === AnimationStep.HEADLINE_REVEALED ? -40 : 0
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="font-bold text-7xl md:text-9xl flex items-center justify-center tracking-tighter leading-none"
            >
              <span className="opacity-80">202</span>
              {step === AnimationStep.INITIAL || step === AnimationStep.SCROLLING ? (
                <div onClick={handleStartScroll} className="inline-flex relative items-center justify-center overflow-hidden">
                   <NumberReel 
                    isScrolling={step === AnimationStep.SCROLLING} 
                    onComplete={onScrollComplete} 
                  />
                </div>
              ) : (
                <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">6</span>
              )}
            </motion.div>

            {/* Instructions / Hints */}
            <AnimatePresence>
              {showHint && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-12 text-white/40 text-sm md:text-base tracking-[0.3em] uppercase italic"
                >
                  Click the <span className="text-yellow-500 font-bold">5</span> to continue
                </motion.p>
              )}
            </AnimatePresence>

            {/* Headline Reveal */}
            <AnimatePresence>
              {step === AnimationStep.HEADLINE_REVEALED && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex flex-col items-center mt-6"
                >
                  <h1 className="text-4xl md:text-8xl font-display font-black tracking-widest italic text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 uppercase">
                    Happy 2026
                  </h1>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRevealMessage}
                    className="mt-16 px-10 py-5 bg-white text-[#182E6F] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    Reveal Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        ) : (
          <motion.div
            key="message-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-br from-[#0a132e] via-[#182E6F] to-[#0a132e] overflow-y-auto"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="w-full max-w-3xl px-8 py-20 text-center"
            >
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-3xl md:text-5xl font-display font-black tracking-tight text-yellow-500 mb-12 italic"
              >
                Bhagavatula Navya Agastya,
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="space-y-8 text-blue-50/90 text-lg md:text-xl leading-relaxed text-justify"
              >
                <p>
                  2025 was one wonderful year. I learnt a lot of things, I gained a lot of friends, I lost a few friends, I made mistakes, I won big and I lost big, but you were there through all of that. This year started off in the worst way possible, but you reassured me and gave me the confidence to make this year into what it has become. We have had so many wholesome moments this year together, be it on face time, our birthdays, the messages we wrote each other, the time you cried on call and so much more. Even if I was offered even the whole world, I would still choose to relive those moments of us. If anything, you made my year a TON better.
                </p>
                
                <p>
                  This year has given you a bit of a rocky path too. Be it losing your friends and crushes, be it getting bitched about, getting sick, not going on that trip and what not. But, NONE OF THAT, absolutely NONE OF THAT affected you for more than an hour. You kept fucking going. You got through more than 50% of your vision board, you scored amazing in every subject, you came through every illness, and you learned to let go. You had every reason to throw your phone away, curl up in bed and rot and you did NOT ever do that. You learned Crochet, you drew, you read, you worked out, ANYTHING BUT GIVING UP. I am VERY VERY proud of you for that. This effort of yours was rewarded to you by the gifts you got all throughout the year and is going to be rewarded by all the things next year and I am sure of it.
                </p>

                <p>
                  I hope the next year of yours goes 10X, 100X, a 10000X better than 2025. May 2026 be the year of reward for your effort. If you feel like you are not seen and your efforts are going in vain, believe me they are not and I have seen you work and BOY DO YOU WORK LIKE CRAZY! Be the Navya you always are, I cherish you and thank you for being the MOST WONDERFUL AND BEST FRIEND I COULD EVER ASK FOR in 2025. I hope this continues in 2026. May we make more memories in 2026 and may our bond grow stronger. May you get EVERYTHING you wish for and may you complete your vision board.
                </p>

                <p>
                  I have told you a ton of times that you are an integral part of my life, but you're not just another variable or changing function in the equation that changes by every problem, rather you are the "+c", the constant, that is unchanged regardless of how complicated the equation becomes and is just always there.<span className="text-white/40 italic">(a little integration joke, cuz who am I without my thoughtful unfunny jokes)</span>
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-20 space-y-4"
              >
                <h3 className="text-4xl md:text-7xl font-display font-black tracking-tighter text-yellow-500 drop-shadow-lg italic">
                  HAPPYY 2026
                </h3>
                <p className="text-xl md:text-2xl font-medium tracking-wide text-white">
                  I LOVE YOU SO MUCH GANG.
                </p>
                <p className="text-sm md:text-base text-white/30 italic tracking-widest pt-4">
                  (would lwk still sell you for food anyday idiot)
                </p>
                
                <div className="pt-12 text-right">
                  <p className="text-white/40 uppercase tracking-[0.3em] text-xs mb-1">Yours Sincerely,</p>
                  <p className="text-2xl font-display font-bold italic tracking-wider text-yellow-500/80">CALAMAR</p>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                onClick={() => setStep(AnimationStep.INITIAL)}
                className="mt-32 text-xs tracking-[0.5em] uppercase text-white/10 hover:text-white/50 transition-colors border-b border-transparent hover:border-white/20 pb-2"
              >
                — Replay —
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
