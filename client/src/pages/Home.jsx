import React from 'react';
import { motion } from 'framer-motion';
import FloatingWords from '../components/animations/FloatingWords';
import FeaturesSection from '../components/layout/FeaturesSection';
import HowItWorksSection from '../components/layout/HowItWorksSection';
import LiveDemoPreview from '../components/layout/LiveDemoPreview';
import StatsBar from '../components/layout/StatsBar';
import MagneticButton from '../components/ui/MagneticButton';

const ExplosionWord = ({ children }) => (
  <motion.span
    whileHover={{ 
      scale: 1.15, 
      color: '#2563EB',
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }}
    className="inline-block cursor-default mx-1.5 transition-colors duration-300"
  >
    {children}
  </motion.span>
);

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const headline = "Write Without Limits.";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden premium-gradient">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-correct/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] bg-blue-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '5s' }} />
      </div>

      <FloatingWords />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
            WordWise Correctify v1.0
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-9xl font-display font-black text-slate-900 dark:text-white mb-8 leading-[0.9] flex flex-wrap justify-center tracking-tighter"
        >
          {headline.split(' ').map((word, i) => (
            <ExplosionWord key={i}>{word}</ExplosionWord>
          ))}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Precision grammar, flawless spelling, and intelligent insights. Elevate your communication with the world's most intuitive AI corrector.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton
            to="/app" 
            className="btn-primary text-sm uppercase tracking-widest px-10 py-5 shadow-2xl shadow-primary/40"
          >
            Start Correcting Free
          </MagneticButton>
          
          <MagneticButton
            to="/how-it-works" 
            className="px-10 py-5 border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
          >
            Explore Process
          </MagneticButton>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-20 flex flex-wrap justify-center gap-10 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700"
        >
          {['Context Aware', 'NLP v3.0', 'Secure Sync', 'Real-time'].map((badge) => (
            <div key={badge} className="flex items-center gap-3 font-extrabold text-[10px] text-slate-400 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              {badge}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-6 h-10 border-2 border-slate-200 dark:border-white/10 rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-1 h-1 bg-primary rounded-full shadow-lg shadow-primary/50"
          />
        </div>
      </motion.div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-base dark:bg-[#0B1120]">
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveDemoPreview />
      <StatsBar />
    </div>
  );
};

export default Home;
