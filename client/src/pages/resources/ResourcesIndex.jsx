import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles';
import { BookOpen, Search, ArrowRight, Sparkles } from 'lucide-react';

const ResourcesIndex = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(articles.map(a => a.category))];
  
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base dark:bg-[#0B1120] min-h-screen premium-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles className="w-3 h-3" />
            Educational Ecosystem
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tighter"
          >
            Knowledge <span className="text-primary text-glow">Hub.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Master the art of communication with our curated guides on grammar, professional writing, and AI technology.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-20 sticky top-24 z-40 py-4 backdrop-blur-md">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                        activeCategory === cat 
                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                        : 'bg-white/40 dark:bg-white/5 border-slate-200/50 dark:border-white/5 text-slate-400 hover:text-primary'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Dynamic Grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, i) => (
                <motion.div
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link 
                    to={`/resources/${article.slug}`}
                    className="group block p-10 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[3rem] border-2 border-slate-100 dark:border-white/5 shadow-2xl shadow-primary/5 hover:shadow-primary/20 hover:border-primary/20 transition-all h-full flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-primary" />
                    </div>

                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 block opacity-60 group-hover:opacity-100 transition-opacity">
                        {article.category}
                    </span>
                    <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight">
                        {article.title}
                    </h3>
                    <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 line-clamp-3">
                        {article.description}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-auto">
                      Dive Deeper <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
            <div className="py-40 text-center">
                <Search className="w-20 h-20 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-400">No articles found in this category.</h3>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesIndex;
