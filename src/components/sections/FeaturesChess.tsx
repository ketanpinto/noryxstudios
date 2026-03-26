import React, { useRef } from 'react';
// import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';

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

const RevealElement = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const RevealImage = ({ src, reverse }: { src: string, reverse?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: reverse ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", scale: 0.95 }}
      animate={isInView ? { opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="w-full aspect-[4/3] ios-glass rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl relative"
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        src={src}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />
    </motion.div>
  );
};

export const FeaturesChess: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Apply a spring for buttery smooth horizontal awwwards scrolling
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

  // Track translates from 0vw to -200vw
  const x = useTransform(smoothProgress, [0, 1], ["0vw", "-200vw"]);

  const img1 = "/FeaturesChess/img1.jpg";
  const img2 = "/FeaturesChess/img2.jpg";

  return (
    <>
      {/* Desktop: Horizontal Scroll (lg+) */}
      <section ref={targetRef} className="relative h-[300vh] bg-black hidden lg:block">
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden pointer-events-none">

          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 10% 20%, rgba(50, 100, 255, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 90% 80%, rgba(150, 0, 255, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 10%, rgba(50, 255, 200, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 10% 20%, rgba(50, 100, 255, 0.15) 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Sliding Track */}
          <motion.div style={{ x }} className="flex h-full w-[300vw] relative z-10 pointer-events-auto">

            {/* Panel 1: Header */}
            <div className="w-screen h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 shrink-0">
              <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                <RevealElement delay={0}>
                  <div className="ios-glass rounded-full px-5 py-2 text-sm font-medium text-white font-body inline-block mb-10">
                    Approach
                  </div>
                </RevealElement>
                <AnimatedText
                  text="Sophistication without complication."
                  className="text-5xl md:text-7xl lg:text-[7rem] font-heading italic text-white tracking-tight leading-[0.85]"
                />
              </div>
            </div>

            {/* Panel 2: Row 1 feature */}
            <div className="w-screen h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 shrink-0">
              <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <div className="flex-1 space-y-8">
                  <AnimatedText
                    text="Form follows function. Function drives results."
                    className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-[1]"
                  />
                  <RevealElement delay={0.2}>
                    <p className="text-white/60 font-body font-light text-lg md:text-xl leading-relaxed">
                      Every decision rooted in data. Every surface refined through rigorous analysis. The outcome is measurable, not decorative.
                    </p>
                  </RevealElement>
                  <RevealElement delay={0.3}>
                    <button className="ios-glass font-body rounded-full px-8 py-4 text-white hover:bg-white/10 transition-colors flex items-center gap-2 group mt-8">
                      Explore further
                      {/* <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> */}
                    </button>
                  </RevealElement>
                </div>
                <div className="flex-1 w-full">
                  <RevealImage src={img1} reverse={false} />
                </div>
              </div>
            </div>

            {/* Panel 3: Row 2 feature */}
            <div className="w-screen h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 shrink-0">
              <div className="max-w-7xl w-full flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
                <div className="flex-1 space-y-8">
                  <AnimatedText
                    text="Continuous refinement. Zero intervention."
                    className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-[1]"
                  />
                  <RevealElement delay={0.2}>
                    <p className="text-white/60 font-body font-light text-lg md:text-xl leading-relaxed">
                      Your digital presence adapts silently. Behavior is observed, patterns are recognized, and the experience sharpens itself over time.
                    </p>
                  </RevealElement>
                  <RevealElement delay={0.3}>
                    <button className="ios-glass font-body rounded-full px-8 py-4 text-white hover:bg-white/10 transition-colors flex items-center gap-2 group mt-8">
                      Learn the process
                      {/* <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> */}
                    </button>
                  </RevealElement>
                </div>
                <div className="flex-1 w-full">
                  <RevealImage src={img2} reverse={true} />
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Mobile: Vertical Stack (< lg) */}
      <section className="bg-black lg:hidden relative overflow-hidden">

        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 10% 20%, rgba(50, 100, 255, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 90% 80%, rgba(150, 0, 255, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 10%, rgba(50, 255, 200, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 10% 20%, rgba(50, 100, 255, 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Panel 1: Header */}
        <div className="flex flex-col items-center justify-center px-5 sm:px-6 py-20 sm:py-28 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <RevealElement delay={0}>
              <div className="ios-glass rounded-full px-5 py-2 text-sm font-medium text-white font-body inline-block mb-8">
                Approach
              </div>
            </RevealElement>
            <AnimatedText
              text="Sophistication without complication."
              className="text-3xl sm:text-5xl font-heading italic text-white tracking-tight leading-[0.85]"
            />
          </div>
        </div>

        {/* Panel 2: Feature 1 */}
        <div className="flex items-center justify-center px-5 sm:px-6 py-16 sm:py-20 relative z-10">
          <div className="max-w-7xl w-full flex flex-col items-center gap-10 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <AnimatedText
                text="Form follows function. Function drives results."
                className="text-2xl sm:text-4xl font-heading italic text-white leading-[1]"
              />
              <RevealElement delay={0.2}>
                <p className="text-white/60 font-body font-light text-base sm:text-lg leading-relaxed">
                  Every decision rooted in data. Every surface refined through rigorous analysis. The outcome is measurable, not decorative.
                </p>
              </RevealElement>
              <RevealElement delay={0.3}>
                <button className="ios-glass font-body rounded-full px-6 sm:px-8 py-4 text-white active:bg-white/10 transition-colors flex items-center gap-2 group mt-4 min-h-[48px]">
                  Explore further
                  {/* <ArrowUpRight size={18} /> */}
                </button>
              </RevealElement>
            </div>
            <div className="w-full">
              <RevealImage src={img1} reverse={false} />
            </div>
          </div>
        </div>

        {/* Panel 3: Feature 2 */}
        <div className="flex items-center justify-center px-5 sm:px-6 py-16 sm:py-20 relative z-10">
          <div className="max-w-7xl w-full flex flex-col items-center gap-10 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <AnimatedText
                text="Continuous refinement. Zero intervention."
                className="text-2xl sm:text-4xl font-heading italic text-white leading-[1]"
              />
              <RevealElement delay={0.2}>
                <p className="text-white/60 font-body font-light text-base sm:text-lg leading-relaxed">
                  Your digital presence adapts silently. Behavior is observed, patterns are recognized, and the experience sharpens itself over time.
                </p>
              </RevealElement>
              <RevealElement delay={0.3}>
                <button className="ios-glass font-body rounded-full px-6 sm:px-8 py-4 text-white active:bg-white/10 transition-colors flex items-center gap-2 group mt-4 min-h-[48px]">
                  Learn the process
                  {/* <ArrowUpRight size={18} /> */}
                </button>
              </RevealElement>
            </div>
            <div className="w-full">
              <RevealImage src={img2} reverse={true} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
