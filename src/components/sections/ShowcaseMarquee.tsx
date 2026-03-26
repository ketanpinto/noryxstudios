import React from 'react';

// 10 GIF showcase videos from /examplevideos
const videos = [
  "/examplevideos/examplevideo1.gif",
  "/examplevideos/examplevideo2.gif",
  "/examplevideos/examplevideo3.gif",
  "/examplevideos/examplevideo4.gif",
  "/examplevideos/examplevideo5.gif",
  "/examplevideos/examplevideo6.gif",
  "/examplevideos/examplevideo7.gif",
  "/examplevideos/examplevideo8.gif",
  "/examplevideos/examplevideo9.gif",
  "/examplevideos/examplevideo10.gif",
];

// Split into two rows for balanced marquee
const row1Videos = videos.slice(0, 5);
const row2Videos = videos.slice(5, 10);

const Row = ({ reverse = false, items }: { reverse?: boolean; items: string[] }) => {
  const rowVideos = [...items, ...items];
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
            className="w-[280px] md:w-[380px] lg:w-[480px] aspect-video shrink-0 mr-4 md:mr-6 ios-glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
          >
            <img 
              src={src} 
              alt="Showcase" 
              loading="lazy"
              className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-110"
            />
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
            className="w-[280px] md:w-[380px] lg:w-[480px] aspect-video shrink-0 mr-4 md:mr-6 ios-glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
          >
            <img 
              src={src} 
              alt="Showcase" 
              loading="lazy"
              className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 hover:scale-110"
            />
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
        <Row reverse={true} items={row1Videos} />
        <Row reverse={false} items={row2Videos} />
      </div>
    </section>
  );
};
