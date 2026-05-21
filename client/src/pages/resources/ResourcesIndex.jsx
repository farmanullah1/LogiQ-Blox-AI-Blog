import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles';

const Resources = () => {
  const categories = [...new Set(articles.map(a => a.category))];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base dark:bg-[#0B1120] min-h-screen premium-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-6"
          >
            Knowledge <span className="text-primary text-glow">Hub.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Explore our deep dives into grammar, professional writing, and AI technology.
          </motion.p>
        </div>

        {categories.map((cat, idx) => (
          <section key={cat} className="mb-20">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-display font-black text-slate-900 dark:text-white mb-8 uppercase tracking-[0.2em] flex items-center gap-4"
            >
              <span className="w-8 h-1 bg-primary rounded-full" />
              {cat}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.filter(a => a.category === cat).map((article, i) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    to={`/resources/${article.slug}`}
                    className="block p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-xl shadow-primary/5 hover:shadow-primary/10 hover:-translate-y-2 transition-all group h-full"
                  >
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 block">{article.category}</span>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">{article.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 line-clamp-2">{article.description}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mt-auto">
                      Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Resources;
