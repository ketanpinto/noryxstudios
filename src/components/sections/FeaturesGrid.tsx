
import React, { useRef, useState } from 'react';
import { Zap, Palette, BarChart3, Shield } from 'lucide-react';
import { motion, useInView } from 'motion/react';

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-4 -mb-4 mr-[2%]">
          <motion.span
            initial={{ y: "120%", rotate: 4 }}
            animate={isInView ? { y: 0, rotate: 0 } : { y: "120%", rotate: 4 }}
            transition={{
              duration: 1,
              delay: i * 0.04,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="inline-block origin-top-left"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

const SpotlightCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
      }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ios-glass rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-10 flex flex-col gap-6 md:gap-10 border border-white/5 transition-colors ${className}`}
    >
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        {children}
      </div>
    </motion.div>
  );
};

export const FeaturesGrid: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const features = [
    {
      icon: <Zap size={28} className="text-white group-hover:text-amber-300 transition-colors duration-500" />,
      title: 'Delivered in Days',
      description: 'From brief to launch without the bureaucracy. Precision moves fast when the process is refined.',
      className: 'md:col-span-2'
    },
    {
      icon: <Palette size={28} className="text-white group-hover:text-purple-400 transition-colors duration-500" />,
      title: 'Considered Craft',
      description: 'Nothing accidental. Every element placed with purpose, reviewed with discipline.',
      className: 'md:col-span-1'
    },
    {
      icon: <BarChart3 size={28} className="text-white group-hover:text-blue-400 transition-colors duration-500" />,
      title: 'Performance by Design',
      description: 'Aesthetics informed by data. Layouts shaped by behavior, not assumption.',
      className: 'md:col-span-1'
    },
    {
      icon: <Shield size={28} className="text-white group-hover:text-emerald-400 transition-colors duration-500" />,
      title: 'Built to Last',
      description: 'Enterprise-grade infrastructure as standard. Your data, handled with the gravity it deserves.',
      className: 'md:col-span-2'
    }
  ];

  return (
    <section className="py-20 sm:py-32 px-5 sm:px-6 md:px-16 lg:px-24 bg-black relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="ios-glass rounded-full px-5 py-2 text-sm font-medium text-white font-body inline-block mb-10"
          >
            Distinction
          </motion.div>
          <AnimatedText 
            text="Where detail becomes difference." 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[6rem] font-heading italic text-white tracking-tight leading-[0.9]"
          />
        </div>

        <motion.div 
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-fr"
        >
          {features.map((feature, index) => (
            <SpotlightCard key={index} className={feature.className}>
              <div className="liquid-glass-strong rounded-full w-16 h-16 flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-110 transition-transform duration-500 ease-out">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-heading italic text-white leading-tight">{feature.title}</h3>
                <p className="text-white/50 font-body font-light text-base md:text-lg leading-relaxed">{feature.description}</p>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
