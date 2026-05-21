import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Process', path: '/how-it-works' },
    { name: 'Knowledge', path: '/resources' },
    { name: 'About', path: '/about' },
    { name: 'Creator', path: '/creator' },
  ];

  const socialLinks = [
    { name: 'Portfolio', url: 'https://farmanullah1.github.io/My-Portfolio' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/farmanullah-ansari/' },
    { name: 'GitHub', url: 'https://github.com/farmanullah1' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-[#0B1120] text-slate-400 py-24 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-correct to-primary opacity-20" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-display font-black text-white mb-6 block tracking-tighter">
              WordWise <span className="text-primary">Correctify</span>
            </Link>
            <p className="max-w-sm text-lg font-medium leading-relaxed mb-8">
              The world's most intuitive AI-powered writing assistant. We don't just fix errors; we empower your unique voice.
            </p>
            <div className="flex gap-4">
                {socialLinks.map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all group">
                        <span className="text-white group-hover:scale-110 transition-transform">
                            {s.name[0]}
                        </span>
                    </a>
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-black mb-2 uppercase tracking-[0.2em] text-[10px]">Platform</h4>
            {links.slice(0, 3).map((link) => (
              <Link key={link.name} to={link.path} className="hover:text-primary transition-colors font-bold text-sm">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-black mb-2 uppercase tracking-[0.2em] text-[10px]">Resources</h4>
            {links.slice(3).map((link) => (
              <Link key={link.name} to={link.path} className="hover:text-primary transition-colors font-bold text-sm">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© {currentYear} WordWise Correctify · All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with ❤️ by <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors border-b border-primary/30">Farmanullah Ansari</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
