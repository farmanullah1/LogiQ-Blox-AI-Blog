import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../../data/articles';

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const relatedArticles = articles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base dark:bg-[#0B1120] min-h-screen premium-gradient">
      <div className="max-w-4xl mx-auto">
        <Link 
            to="/resources" 
            className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.2em] mb-12 transition-colors"
        >
            ← Back to Resources
        </Link>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 mb-8 inline-block">
                {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight">
                {article.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-16 font-medium leading-relaxed italic border-l-4 border-primary/20 pl-8">
                {article.description}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-24">
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-[1.8] font-medium">
                    {article.content}
                </p>
                {/* Additional filler content to make pages look "full" */}
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-[1.8] font-medium mt-8">
                    Writing with clarity is not just about avoiding errors; it's about respecting your reader's time. WordWise AI is built on this principle—that communication should be as frictionless as possible. By analyzing patterns across millions of professional documents, our engine provides suggestions that don't just fix grammar, but enhance the overall impact of your message.
                </p>
                <div className="bg-primary/5 dark:bg-white/5 p-10 rounded-[3rem] border border-primary/10 my-16">
                    <h3 className="text-xl font-bold text-primary mb-4">Pro Tip</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium italic">
                        "Great writing is clear thinking made visible." Always review AI suggestions through the lens of your unique voice. WordWise is your assistant, but you are the author.
                    </p>
                </div>
            </div>
        </motion.div>

        {relatedArticles.length > 0 && (
            <section className="pt-24 border-t border-slate-200 dark:border-white/5">
                <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white mb-12 uppercase tracking-widest">Related Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedArticles.map(a => (
                        <Link 
                            key={a.slug}
                            to={`/resources/${a.slug}`}
                            className="p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{a.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
