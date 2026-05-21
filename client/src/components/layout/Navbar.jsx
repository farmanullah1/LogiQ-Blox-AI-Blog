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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Creator', path: '/creator' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 glass-card shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <path 
                d="M10 10 L20 30 L30 10" 
                fill="none" 
                stroke="#2563EB" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="group-hover:stroke-primary-dark transition-colors"
              />
              <path 
                d="M25 25 L30 30 L40 20" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="4" 
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold text-slate-900 dark:text-white leading-none">
              WordWise <span className="text-primary">Correctify</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navUnderline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xl"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <MagneticButton
            to="/app"
            className="px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm shadow-md hover:shadow-primary/30 transition-all"
          >
            Try It Free
          </MagneticButton>
          <a 
            href="https://farmanullah1.github.io/My-Portfolio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:block text-[10px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
          >
            By Farman ↗
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-900 md:hidden flex flex-col items-center justify-center gap-8 p-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-bold text-slate-900 dark:text-white"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-3xl"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <Link
              to="/app"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-4 bg-primary text-white rounded-2xl font-bold text-lg"
            >
              Try It Free
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
