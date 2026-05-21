import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import MagneticButton from '../ui/MagneticButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Process', path: '/how-it-works' },
    { name: 'Knowledge', path: '/resources' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 glass-card shadow-2xl shadow-primary/5' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex items-center justify-center perspective-1000">
            <motion.div 
              whileHover={{ rotateY: 20, rotateX: -10, scale: 1.1 }}
              className="relative w-full h-full preserve-3d transition-transform duration-500"
            >
              {/* Back Layer (Shadow) */}
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg translate-z-[-10px]" />
              
              {/* Middle Layer (Glow) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-correct opacity-20 rounded-2xl animate-pulse" />
              
              {/* Front Layer (SVG) */}
              <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-2xl relative z-10 translate-z-[10px]">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path 
                  d="M10 10 L20 30 L30 10" 
                  fill="none" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  className="group-hover:opacity-80 transition-opacity"
                />
                <path 
                  d="M25 25 L30 30 L40 20" 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
          <span className="text-xl font-display font-black text-slate-900 dark:text-white leading-none tracking-tight">
            WordWise <span className="text-primary text-glow">Correctify</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-xs font-extrabold uppercase tracking-[0.2em] transition-all hover:text-primary ${
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navUnderline"
                  className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-primary rounded-full shadow-lg shadow-primary/40"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-xl"
          >
            {isDarkMode ? '🌙' : '🌞'}
          </button>
          <MagneticButton
            to="/app"
            className="btn-primary text-xs uppercase tracking-widest px-8"
          >
            Open App
          </MagneticButton>
          <a 
            href="https://farmanullah1.github.io/My-Portfolio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:block text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.2em]"
          >
            Creator ↗
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-600 dark:text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`w-full h-[2px] bg-current rounded-full transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-full h-[2px] bg-current rounded-full transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-[2px] bg-current rounded-full transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-10 p-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tighter"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 p-6 rounded-3xl bg-slate-100 dark:bg-white/5 text-4xl"
            >
              {isDarkMode ? '🌙' : '🌞'}
            </button>
            <MagneticButton
              to="/app"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-6 bg-primary text-white rounded-3xl font-black text-xl shadow-2xl shadow-primary/20"
            >
              Get Started Free
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
