import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  tags: string[];
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "The Grit City",
    tags: ["Website Development", "UI/UX Design"],
    image: "/Work/hawk.png",
    link: "https://thegritcity.com"
  },
  {
    id: 2,
    title: "Hardwired Solutions",
    tags: ["Business", "Website Design & Development"],
    image: "/Work/mw.png",
    link: "https://hardwiredsolutions.in"
  },
  {
    id: 3,
    title: "FLYTE",
    tags: ["BRANDING", "TECHNOLOGY"],
    image: "/Work/flyte.png"
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  const CardContent = (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      className="w-full max-w-[94vw] md:max-w-6xl mx-auto mb-20 md:mb-64 relative group cursor-pointer"
    >
      <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden ios-glass shadow-2xl border border-white/5 flex items-center justify-center">
        {/* Project Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h3 className="text-white text-3xl sm:text-5xl md:text-8xl lg:text-[10rem] font-heading tracking-tighter opacity-80 group-hover:opacity-100 transition-all duration-700 text-center px-6">
                {project.title}
            </h3>
        </div>

        {/* Action Indicator on hover (Top Right) */}
        <div className="absolute top-8 right-8 overflow-hidden pointer-events-none">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="flex items-center gap-2 text-white/90"
            >
                <div className="w-12 h-12 rounded-full ios-glass flex items-center justify-center">
                    <ArrowUpRight size={24} />
                </div>
            </motion.div>
        </div>

        {/* Tags (Bottom Left) */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-wrap gap-2 md:gap-3 pointer-events-none">
            {project.tags.map(tag => (
              <span key={tag} className="bg-white text-black text-[9px] md:text-sm font-bold px-3 md:px-6 py-1.5 md:py-2 rounded-full tracking-wider whitespace-nowrap">
                {tag}
              </span>
            ))}
        </div>

        {/* Details (Bottom Right) */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 pointer-events-none">
            <div className="ios-glass px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-white/10 flex items-center gap-2">
                <span className="text-white text-[9px] md:text-xs font-medium tracking-[0.2em]">VIEW</span>
            </div>
        </div>
      </div>
    </motion.div>
  );

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const WorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Lock the "WORK" text to the center with a subtle entry reveal, then stay fixed
  const backgroundY = useTransform(scrollYProgress, [0, 0.15], ["5vh", "0vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0]);
  const blurValue = useTransform(scrollYProgress, [0.9, 1], [0, 40]);
  const blur = useMotionTemplate`blur(${blurValue}px)`;
  

  return (
    <section 
      ref={containerRef}
      className="relative bg-black py-20 md:py-32 overflow-visible min-h-[150vh]"
    >
      {/* Sticky Background Text */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <motion.div 
            style={{ opacity }}
            className="relative flex items-center justify-center w-full"
        >
            {/* Visual Decorative elements */}
            <div className="absolute left-[8%] w-1.5 h-1.5 rounded-full bg-white opacity-40 hidden md:block" />
            
            <motion.h2 
                style={{ y: backgroundY, filter: blur }}
                className="text-[35vw] md:text-[30vw] font-heading text-white select-none leading-none tracking-tighter text-center"
            >
                WORK
            </motion.h2>
            
            <div className="absolute right-[8%] w-1.5 h-1.5 rounded-full bg-white opacity-40 hidden md:block" />
        </motion.div>
      </div>

      <div className="relative z-10 px-4 sm:px-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <div className="flex justify-center mt-10 md:mt-20">
          <button className="group relative px-6 md:px-10 py-3 md:py-5 bg-white text-black rounded-full overflow-hidden transition-all duration-300 hover:pr-14">
            <span className="relative z-10 font-bold text-xs md:text-sm tracking-[0.2em]">MORE WORK</span>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ArrowUpRight size={20} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
