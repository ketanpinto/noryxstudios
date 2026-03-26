import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';

const RevealElement = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => {
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

// Instagram SVG icon (monochrome outline)
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const submissionData = new FormData();
    submissionData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("message", formData.details);
    submissionData.append("subject", `New Inquiry from ${formData.name}`);
    submissionData.append("from_name", "Noryx Studios Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitError("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-black pt-28 sm:pt-40 pb-20 sm:pb-32 px-5 sm:px-6 md:px-16 lg:px-24 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-white/[0.015] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 sm:mb-24 md:mb-32">
          <RevealElement delay={0}>
            <div className="liquid-glass rounded-full px-5 py-2 text-xs font-semibold text-white/90 font-body uppercase tracking-[0.2em] inline-block mb-10">
              Contact
            </div>
          </RevealElement>

          <AnimatedText
            text="Start a conversation."
            className="text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] font-heading italic text-white tracking-tight leading-[0.85] mb-6 sm:mb-8"
          />

          <RevealElement delay={0.3}>
            <p className="text-white/50 font-body font-light text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
              We work with a select number of clients each quarter. Tell us about your project.
            </p>
          </RevealElement>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

          {/* Form — 3 columns */}
          <div className="lg:col-span-3">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-12">
                <RevealElement delay={0.1}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white/40 text-xs font-body uppercase tracking-[0.2em] block">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/15 focus:border-white/50 text-white font-body font-light text-base py-4 outline-none transition-colors duration-500 placeholder:text-white/20"
                      placeholder="Your name"
                    />
                  </div>
                </RevealElement>

                <RevealElement delay={0.2}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white/40 text-xs font-body uppercase tracking-[0.2em] block">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/15 focus:border-white/50 text-white font-body font-light text-base py-4 outline-none transition-colors duration-500 placeholder:text-white/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </RevealElement>

                <RevealElement delay={0.3}>
                  <div className="space-y-2">
                    <label htmlFor="details" className="text-white/40 text-xs font-body uppercase tracking-[0.2em] block">
                      Project Details
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      required
                      value={formData.details}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-transparent border-b border-white/15 focus:border-white/50 text-white font-body font-light text-base py-4 outline-none transition-colors duration-500 resize-none placeholder:text-white/20"
                      placeholder="Brief description of your project, goals, and timeline"
                    />
                  </div>
                </RevealElement>

                <RevealElement delay={0.4}>
                  <div className="space-y-4 mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`liquid-glass-strong font-body rounded-full px-8 sm:px-10 py-5 text-white hover:bg-white/10 active:scale-95 transition-all duration-500 flex items-center gap-3 group min-h-[48px] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                      {!isSubmitting && <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />}
                    </button>

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-400 text-sm font-body"
                      >
                        {submitError}
                      </motion.p>
                    )}
                  </div>
                </RevealElement>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col items-start justify-center min-h-[400px]"
              >
                <h3 className="text-4xl md:text-5xl font-heading italic text-white mb-6">
                  Received.
                </h3>
                <p className="text-white/50 font-body font-light text-lg max-w-md leading-relaxed">
                  We'll review your inquiry and respond within 48 hours. Only projects that align with our current focus will receive a reply.
                </p>
              </motion.div>
            )}
          </div>

          {/* Secondary contact — 2 columns */}
          <div className="lg:col-span-2 lg:pt-2">
            <RevealElement delay={0.5}>
              <div className="space-y-16">

                <div>
                  <p className="text-white/30 text-xs font-body uppercase tracking-[0.2em] mb-8">
                    Direct
                  </p>
                  <div className="space-y-6">
                    <a
                      href="mailto:hello@noryxstudios.com"
                      className="flex items-center gap-4 text-white/60 hover:text-white transition-colors duration-500 group"
                    >
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
                        <Mail size={16} />
                      </div>
                      <span className="font-body font-light text-base">ketanpinto16@gmail.com</span>
                    </a>

                    <a
                      href="https://wa.me/+971522786730?text=Hello%20I%27d%20like%20to%20learn%20more%20about%20Noryx%20Studios..."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-white/60 hover:text-white transition-colors duration-500 group"
                    >
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
                        <MessageCircle size={16} />
                      </div>
                      <span className="font-body font-light text-base">WhatsApp</span>
                    </a>

                    <a
                      href="https://instagram.com/noryxstudios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-white/60 hover:text-white transition-colors duration-500 group"
                    >
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
                        <InstagramIcon />
                      </div>
                      <span className="font-body font-light text-base">@noryxstudios</span>
                    </a>
                  </div>
                </div>

                <div className="border-t border-white/[0.06] pt-10">
                  <p className="text-white/30 text-xs font-body uppercase tracking-[0.2em] mb-4">
                    Availability
                  </p>
                  <p className="text-white/50 font-body font-light text-sm leading-relaxed">
                    Currently accepting projects for Q2 2026. Response within 48 hours.
                  </p>
                </div>

              </div>
            </RevealElement>
          </div>

        </div>

        {/* Bottom bar */}
        <RevealElement delay={0.6}>
          <div className="mt-16 sm:mt-32 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs font-body">
              &copy; 2026 Noryx Studios
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors text-xs font-body">Privacy</a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors text-xs font-body">Terms</a>
            </div>
          </div>
        </RevealElement>

      </div>
    </section>
  );
};
