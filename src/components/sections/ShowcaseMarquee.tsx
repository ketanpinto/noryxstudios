import React from 'react';
import { HLSVideo } from '../ui/hls-video';

// Mix of Mux URLs + standard video
const videos = [
  "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8",
  "/hero-bg.mp4",
  "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8",
  "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
];

const Row = ({ reverse = false }: { reverse?: boolean }) => {
  // Use 8 items per inner container (2 identical runs for seamless looping).
  const rowVideos = [...videos, ...videos];
  const marqueeClass = reverse ? 'animate-marquee-right' : 'animate-marquee-left';

  return (
    <div className="flex overflow-hidden group w-full pointer-events-auto">
      {/* First sliding track */}
      <div 
        className={`flex shrink-0 min-w-full group-hover:[animation-play-state:paused] ${marqueeClass}`}
      >
        {rowVideos.map((src, i) => (
          <div 
            key={i} 
            className="w-[250px] md:w-[350px] lg:w-[450px] h-[150px] md:h-[220px] lg:h-[280px] shrink-0 mr-4 md:mr-6 ios-glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
          >
            {src.endsWith('.mp4') ? (
              <video 
                src={src} 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
              />
            ) : (
              <HLSVideo 
                src={src} 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Second identical track that exactly trails the first */}
      <div 
        aria-hidden="true"
        className={`flex shrink-0 min-w-full group-hover:[animation-play-state:paused] ${marqueeClass}`}
      >
        {rowVideos.map((src, i) => (
          <div 
            key={i} 
            className="w-[250px] md:w-[350px] lg:w-[450px] h-[150px] md:h-[220px] lg:h-[280px] shrink-0 mr-4 md:mr-6 ios-glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
          >
            {src.endsWith('.mp4') ? (
              <video 
                src={src} 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
              />
            ) : (
              <HLSVideo 
                src={src} 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ShowcaseMarquee: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden pointer-events-auto border-t border-b border-white/5">
      {/* Glowing Accents */}
      <div className="absolute top-1/2 left-[10%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-600/30 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-[10%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-purple-600/30 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 pointer-events-none" />
      
      <div className="flex flex-col items-center text-center mb-10 relative z-10 px-6">
        <div className="ios-glass rounded-full px-4 py-1.5 text-xs font-medium text-white font-body inline-block mb-4">
          Selected Work
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Craft in motion.
        </h2>
      </div>

      <div className="flex flex-col gap-4 md:gap-6 relative z-10">
        <Row reverse={true} />
        <Row reverse={false} />
      </div>
    </section>
  );
};
