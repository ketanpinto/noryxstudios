
// import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HLSVideo } from '../ui/hls-video';

export const HowItWorks: React.FC = () => {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[700px] py-20 sm:py-32 px-5 sm:px-6 md:px-16 lg:px-24 flex items-center justify-center overflow-hidden">
      {/* Background HLS Video */}
      <HLSVideo
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Top + Bottom fade gradients */}
      <div
        className="absolute top-0 left-0 right-0 h-[200px] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
      <div className="z-10 text-center max-w-3xl mx-auto flex flex-col items-center min-h-[350px] sm:min-h-[500px] justify-center">
        <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white font-body inline-block mb-6">
          Process
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6 sm:mb-8">
          Brief. Build. Launch.
        </h2>

        <p className="font-body font-light text-white/60 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl">
          Share the vision. We handle the architecture, design, development, and deployment. From conversation to live — in days.
        </p>

        <Link to="/contact" className="liquid-glass-strong font-body rounded-full px-6 sm:px-8 py-4 text-white hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 min-h-[48px]">
          Begin
          {/* <ArrowUpRight size={18} /> */}
        </Link>
      </div>
    </section>
  );
};
