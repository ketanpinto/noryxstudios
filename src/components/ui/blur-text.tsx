import { motion } from 'motion/react';


interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number; // basic delay multiplier
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(10px)', 
      y: 50 
    },
    visible: { 
      opacity: [0, 0.5, 1], 
      filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], 
      y: [50, -5, 0],
      transition: {
        duration: 0.35,
        times: [0, 0.5, 1],
      }
    },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={child} 
          className="inline-block mr-[2%]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
