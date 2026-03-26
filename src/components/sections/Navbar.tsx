import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FluidGlass } from '../ui/fluid-glass';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-3 sm:top-6 left-0 right-0 z-50 px-3 sm:px-4 md:px-8 flex justify-center w-full pointer-events-none">
      <div
        className={`relative w-full max-w-5xl h-[56px] sm:h-[64px] pointer-events-auto rounded-full overflow-hidden shadow-2xl transition-all duration-500 border ${scrolled ? 'border-white/5 bg-black/40 shadow-black/50' : 'border-white/10 bg-transparent shadow-white/5'
          }`}
      >
        <FluidGlass
          width="100%"
          height="100%"
          borderRadius={32}
          blur={20}
          displace={scrolled ? 0.3 : 0.5}
          distortionScale={100}
          opacity={scrolled ? 0.95 : 0.8}
          redOffset={0}
          greenOffset={0}
          blueOffset={0}
        >
          <nav className="px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between w-full h-full relative z-10 transition-opacity duration-300">
            <div className="flex-1 flex justify-start">
              <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group pointer-events-auto">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-500">
                  <img
                    src="/logo.png"
                    alt="Noryx Studios Logo"
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className={`hidden sm:inline text-2xl font-medium tracking-[0.02em] font-display transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'}`}>
                  Noryx <span className="text-white/50 group-hover:text-white/80 transition-colors italic">Studios</span>
                </span>
              </Link>
            </div>

            <div className="flex-1 flex justify-end">
              <Link
                to="/contact"
                className={`
                  group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium
                  tracking-[0.1em] uppercase transition-all duration-700 pointer-events-auto min-h-[44px]
                  ${scrolled
                    ? 'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10'
                    : 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40'}
                `}
              >
                <motion.div
                  className="flex items-center gap-2 sm:gap-3 relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10">Inquire</span>
                  {/* <div className="relative overflow-hidden w-4 h-4">
                    <motion.div
                      className="flex flex-col"
                      variants={{
                        initial: { y: 0 },
                        hover: { y: -16 }
                      }}
                      initial="initial"
                      whileHover="hover"
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <ArrowUpRight size={16} className="shrink-0" />
                      <ArrowUpRight size={16} className="shrink-0" />
                    </motion.div>
                  </div> */}
                </motion.div>
              </Link>
            </div>
          </nav>
        </FluidGlass>
      </div>
    </div>
  );
};
