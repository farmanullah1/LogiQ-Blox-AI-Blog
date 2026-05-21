import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 25;
    const step = (100 / (duration / interval));

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center"
    >
      <div className="relative w-24 h-24 mb-8">
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <motion.path 
            d="M10 10 L20 30 L30 10" 
            fill="none" 
            stroke="#2563EB" 
            strokeWidth="4" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M25 25 L30 30 L40 20" 
            fill="none" 
            stroke="#10B981" 
            strokeWidth="4" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="text-center">
        <h2 className="text-white font-display font-bold text-xl mb-4 tracking-widest uppercase">
          Initializing AI Engine
        </h2>
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
