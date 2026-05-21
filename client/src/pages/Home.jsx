import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingWords from '../components/animations/FloatingWords';
import FeaturesSection from '../components/layout/FeaturesSection';
import HowItWorksSection from '../components/layout/HowItWorksSection';
import LiveDemoPreview from '../components/layout/LiveDemoPreview';
import StatsBar from '../components/layout/StatsBar';
import MagneticButton from '../components/ui/MagneticButton';

const ExplosionWord = ({ children }) => (
  <motion.span
    whileHover={{ 
      scale: 1.2, 
      color: '#2563EB',
      transition: { type: "spring", stiffness: 300 }
    }}
    className="inline-block cursor-default mx-2 transition-colors duration-300"
  >
    {children}
  </motion.span>
);

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const headline = "Write Without Limits.";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-correct/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-400/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <FloatingWords />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl z-10"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-display font-bold text-slate-900 dark:text-white mb-6 leading-tight flex flex-wrap justify-center"
        >
          {headline.split(' ').map((word, i) => (
            <ExplosionWord key={i}>{word}</ExplosionWord>
          ))}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          AI-powered spelling & grammar that just works. Correct with intelligence, write with confidence.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            to="/app" 
            className="group relative px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg overflow-hidden shadow-lg hover:shadow-primary/30 transition-all"
          >
            <span className="relative z-10">Try It Free →</span>
          </MagneticButton>
          
          <MagneticButton
            to="/how-it-works" 
            className="px-8 py-4 border-2 border-primary text-primary dark:text-primary-light rounded-full font-semibold text-lg hover:bg-primary/5 transition-all"
          >
            See How It Works
          </MagneticButton>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {['Spelling Engine', 'Grammar AI', 'NLP Powered', 'Fast & Secure'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 font-display font-medium text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-primary rounded-full" />
              {badge}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <LiveDemoPreview />
      <StatsBar />
    </div>
  );
};

export default Home;
