import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Creator', path: '/creator' },
  ];

  const socialLinks = [
    { name: 'Portfolio', url: 'https://farmanullah1.github.io/My-Portfolio' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/farmanullah-ansari/' },
    { name: 'GitHub', url: 'https://github.com/farmanullah1' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="text-2xl font-display font-bold text-white mb-4 block">
              WordWise <span className="text-primary">Correctify</span>
            </Link>
            <p className="max-w-xs">
              Write with confidence. Correct with intelligence. The AI-powered spelling and grammar corrector for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Platform</h4>
            {links.map((link) => (
              <Link key={link.name} to={link.path} className="hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Connect</h4>
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 group"
                title={link.url}
              >
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} WordWise Correctify. All rights reserved.</p>
          <p>Built with ❤️ by <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">Farmanullah Ansari</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
