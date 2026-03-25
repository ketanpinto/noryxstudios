
import { Link } from 'react-router-dom';
import { HLSVideo } from '../ui/hls-video';

export const Footer: React.FC = () => {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[800px] pt-20 sm:pt-32 pb-12 flex flex-col items-center justify-end overflow-hidden bg-black">
      {/* Background HLS Video */}
      <HLSVideo 
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
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
      <div className="z-10 w-full flex flex-col items-center justify-center flex-1 px-5 sm:px-6">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading italic text-white text-center tracking-tight leading-[0.9] mb-6 sm:mb-8">
          Let’s build something that matters.
        </h2>
        <p className="text-white/60 font-body font-light text-base sm:text-lg md:text-xl text-center max-w-xl mb-8 sm:mb-12">
          Reserved for those ready to elevate. Let’s have a conversation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link to="/contact" className="liquid-glass-strong font-body rounded-full px-6 sm:px-8 py-4 text-white hover:bg-white/10 active:scale-95 transition-all min-h-[48px]">
            Schedule a Call
          </Link>
          <button className="bg-white text-black font-body rounded-full px-6 sm:px-8 py-4 hover:bg-white/90 active:scale-95 transition-all min-h-[48px]">
            View Pricing
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="z-10 w-full max-w-7xl mx-auto mt-16 sm:mt-32 pt-8 border-t border-white/10 px-5 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-xs font-body">
          &copy; 2026 Noryx Studios
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/40 hover:text-white/80 transition-colors text-xs font-body">Privacy</a>
          <a href="#" className="text-white/40 hover:text-white/80 transition-colors text-xs font-body">Terms</a>
          <Link to="/contact" className="text-white/40 hover:text-white/80 transition-colors text-xs font-body">Contact</Link>
        </div>
      </div>
    </section>
  );
};
