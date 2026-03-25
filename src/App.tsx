
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { ShowcaseMarquee } from './components/sections/ShowcaseMarquee';
import { FeaturesChess } from './components/sections/FeaturesChess';
import { FeaturesGrid } from './components/sections/FeaturesGrid';
import { Stats } from './components/sections/Stats';
import { Testimonials } from './components/sections/Testimonials';
import { Footer } from './components/sections/Footer';
import { Contact } from './components/pages/Contact';
import { ScrollToTop } from './components/ui/ScrollToTop';

import { ReactLenis } from 'lenis/react';

const HomePage = () => (
  <>
    <Hero />
    <HowItWorks />
    <ShowcaseMarquee />
    <FeaturesChess />
    <FeaturesGrid />
    <Stats />
    <Testimonials />
    <Footer />
  </>
);

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ScrollToTop />
      <main className="bg-black min-h-screen text-white font-body selection:bg-white/20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </ReactLenis>
  );
}

export default App;
