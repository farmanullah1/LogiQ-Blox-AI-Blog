import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';
import ShortcutModal from './components/ui/ShortcutModal';
import BackToTop from './components/ui/BackToTop';
import { Toaster } from 'react-hot-toast';
import Lenis from '@studio-freight/lenis';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Corrector = React.lazy(() => import('./pages/Corrector'));
const About = React.lazy(() => import('./pages/About'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const Features = React.lazy(() => import('./pages/Features'));
const Creator = React.lazy(() => import('./pages/Creator'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ResourcesIndex = React.lazy(() => import('./pages/resources/ResourcesIndex'));
const ArticleDetail = React.lazy(() => import('./pages/resources/ArticleDetail'));

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        setIsShortcutModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsShortcutModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <Router>
            <div className="min-h-screen bg-bg-base transition-colors duration-300 selection:bg-primary selection:text-white">
              <CustomCursor />
              <ScrollProgressBar />
              <BackToTop />
              <Navbar />
              <Toaster position="bottom-right" />
              <ShortcutModal 
                isOpen={isShortcutModalOpen} 
                onClose={() => setIsShortcutModalOpen(false)} 
              />
              
              <AnimatePresence mode="wait">
                <React.Suspense fallback={
                  <div className="h-screen w-full flex flex-col items-center justify-center bg-bg-base dark:bg-[#0B1120] premium-gradient">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4 shadow-lg shadow-primary/10" />
                    <span className="text-[10px] font-extrabold text-primary uppercase tracking-[0.3em] animate-pulse">Syncing...</span>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/app" element={<PageWrapper><Corrector /></PageWrapper>} />
                    <Route path="/features" element={<PageWrapper><Features /></PageWrapper>} />
                    <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
                    <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                    <Route path="/creator" element={<PageWrapper><Creator /></PageWrapper>} />
                    <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                    <Route path="/resources" element={<PageWrapper><ResourcesIndex /></PageWrapper>} />
                    <Route path="/resources/:slug" element={<PageWrapper><ArticleDetail /></PageWrapper>} />
                  </Routes>
                </React.Suspense>
              </AnimatePresence>
              
              <Footer />
            </div>
          </Router>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
