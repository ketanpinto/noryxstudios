import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

import { Link } from 'react-router-dom';
import { BlurText } from '../ui/blur-text';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative overflow-visible min-h-screen sm:h-[1000px] bg-black flex flex-col items-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 w-[110vw] h-[110vh] min-w-[110vw] min-h-[110vh] object-cover -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-[200px] sm:h-[300px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center pt-[120px] sm:pt-[150px] px-5 sm:px-6 max-w-5xl mx-auto w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass rounded-full pr-4 pl-1 py-1 flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">2026</span>
          <span className="text-xs sm:text-sm text-white/90 font-medium">Now accepting clients.</span>
        </motion.div>

        {/* Heading */}
        <BlurText
          text="We don't build websites. We build presence."
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-foreground leading-[0.8] tracking-[-2px] sm:tracking-[-4px] mb-6 sm:mb-8"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white/60 font-body font-light text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-12"
        >
          High-end design & development for brands that want to stand out.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link to="/contact" className="liquid-glass-strong font-body rounded-full px-8 py-4 text-white hover:bg-white/10 transition-colors flex items-center gap-2 min-h-[48px] active:scale-95 transition-transform">
            Start a Project
            {/* <ArrowUpRight size={18} /> */}
          </Link>

          {/* <button className="font-body text-white hover:text-white/80 transition-colors flex items-center gap-2 px-6 py-4">
            <Play size={18} fill="currentColor" />
            View Reel
          </button> */}
        </motion.div>
      </div>
    </section>
  );
};
