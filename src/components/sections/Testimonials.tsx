

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Five days from brief to launch. We expected compromise. Instead, we received something our previous agency couldn't deliver in six months.",
      name: "Sarah Chen",
      role: "CEO, Luminary"
    },
    {
      quote: "Conversions increased fourfold in the first week. This wasn't decoration — it was architecture built around intent.",
      name: "Marcus Webb",
      role: "Head of Growth, Arcline"
    },
    {
      quote: "They didn't redesign our site. They redefined how our brand feels in a browser. The result is something that belongs to the future.",
      name: "Elena Voss",
      role: "Brand Director, Helix"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentIndex, testimonials.length]);

  return (
    <section className="py-20 sm:py-32 px-5 sm:px-6 md:px-16 lg:px-24 bg-black relative flex items-center justify-center min-h-[60vh] sm:min-h-[80vh] overflow-hidden">

      {/* Background Aesthetic Glows */}
      <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[600px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col justify-center relative z-10">

        <div className="mb-12 sm:mb-24 md:mb-32 flex justify-between items-end border-b border-white/10 pb-6">
          <div className="liquid-glass rounded-full px-5 py-2 text-xs font-semibold text-white/90 font-body uppercase tracking-[0.2em]">
            Testimonials
          </div>
          <div className="text-white/30 font-heading text-base sm:text-xl italic">
            0{currentIndex + 1} / 0{testimonials.length}
          </div>
        </div>

        <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[320px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full flex flex-col justify-center"
            >
              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[1.1] mb-8 sm:mb-12 max-w-4xl">
                {`"${testimonials[currentIndex].quote}"`.split(' ').map((word, wordIndex, array) => {
                  const previousCharsCount = array.slice(0, wordIndex).join(' ').length;
                  return (
                    <span key={`${currentIndex}-w-${wordIndex}`} className="inline-block mr-[0.25em]">
                      {word.split('').map((char, charIndex) => {
                        const globalIndex = previousCharsCount + charIndex + (wordIndex > 0 ? 1 : 0);
                        return (
                          <motion.span
                            key={`${currentIndex}-c-${globalIndex}`}
                            initial={{ opacity: 0, filter: 'blur(10px)', y: 4 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            transition={{ duration: 0.4, delay: globalIndex * 0.015 + 0.1, ease: "easeOut" }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  );
                })}
              </h3>

              <div className="flex items-center gap-4 sm:gap-5 mt-8 sm:mt-12">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-lg sm:text-xl font-heading italic text-white shadow-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-body font-semibold text-base sm:text-lg tracking-wide mb-0.5">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-white/40 font-body text-xs uppercase tracking-[0.15em]">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 10s Loader Progress Indicators */}
        <div className="flex items-center gap-3 mt-12 sm:mt-24 md:mt-32 w-full sm:w-2/3 md:w-1/3">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="relative h-[6px] sm:h-[3px] flex-1 bg-white/10 overflow-hidden cursor-pointer group rounded-full"
            >
              {/* Completed or actively loading state */}
              {index === currentIndex && (
                <motion.div
                  key={`progress-${currentIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="absolute top-0 left-0 h-full bg-white"
                />
              )}
              {/* Previous tabs stay filled subtly, next tabs are empty */}
              {index < currentIndex && (
                <div className="absolute top-0 left-0 h-full w-full bg-white/40 group-hover:bg-white/60 transition-colors" />
              )}
              {index > currentIndex && (
                <div className="absolute top-0 left-0 h-full w-full bg-transparent group-hover:bg-white/20 transition-colors" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
