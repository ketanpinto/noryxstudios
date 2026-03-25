
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { HLSVideo } from '../ui/hls-video';

const Counter = ({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });
  }, [springValue, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const Stats: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const stats = [
    { value: 20, decimals: 0, suffix: '+', label: 'Projects delivered' },
    { value: 98, decimals: 0, suffix: '%', label: 'Client retention' },
    { value: 3.2, decimals: 1, suffix: 'x', label: 'Conversion uplift' },
    { value: 5, decimals: 0, suffix: ' Days', label: 'Median delivery' }
  ];

  return (
    <section className="relative w-full py-20 sm:py-32 bg-black flex flex-col justify-center overflow-hidden">
      {/* Ambient Video Background */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <HLSVideo
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          className="w-full h-full object-cover blur-[8px]"
          style={{ filter: 'saturate(0)' }}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-6 mb-10 sm:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-white/40 uppercase tracking-[0.3em] text-xs font-semibold"
        >
          Measured Impact
        </motion.p>
      </div>

      {/* Raw Architecture Grid */}
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="z-10 w-full border-t border-b border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)" },
              show: { opacity: 1, filter: "blur(0px)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
            }}
            className={`flex flex-col items-center justify-center py-10 sm:py-20 px-4 sm:px-8 ${index % 2 !== 1 ? 'border-r border-white/[0.08]' : ''} ${index < 2 ? 'lg:border-r lg:border-white/[0.08]' : ''}
              `}
          >
            {/* The Number */}
            <div className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-heading italic text-white tracking-tighter leading-none mb-3 sm:mb-6 drop-shadow-2xl">
              <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </div>
            {/* The Label */}
            <div className="text-white/60 font-body text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-center">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
