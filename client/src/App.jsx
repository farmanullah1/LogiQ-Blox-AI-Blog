import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Corrector from './pages/Corrector';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Features from './pages/Features';
import Creator from './pages/Creator';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/ui/LoadingScreen';
import { Toaster } from 'react-hot-toast';
import Lenis from '@studio-freight/lenis';

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
              <Navbar />
              <Toaster position="bottom-right" />
              
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/app" element={<PageWrapper><Corrector /></PageWrapper>} />
                  <Route path="/features" element={<PageWrapper><Features /></PageWrapper>} />
                  <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/creator" element={<PageWrapper><Creator /></PageWrapper>} />
                </Routes>
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
