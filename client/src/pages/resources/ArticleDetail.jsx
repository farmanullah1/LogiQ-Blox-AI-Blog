import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articles } from '../../data/articles';
import { ChevronLeft, Share2, Clock, Hash, BookMarked } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const relatedArticles = articles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  const handleShare = () => {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
  }

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 bg-bg-base dark:bg-[#0B1120] min-h-screen premium-gradient">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Toolbar */}
        <div className="flex justify-between items-center mb-16">
            <Link 
                to="/resources" 
                className="group flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.3em] transition-all"
            >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Knowledge Hub
            </Link>
            <div className="flex gap-4">
                <button 
                    onClick={handleShare}
                    className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-400 hover:text-primary transition-all"
                    title="Share Article"
                >
                    <Share2 className="w-4 h-4" />
                </button>
            </div>
        </div>

        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Metadata Header */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
                    {article.category}
                </span>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    4 Min Read
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Hash className="w-3 h-3" />
                    Technical Guide
                </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[1.1]">
                {article.title}
            </h1>

            <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 mb-20 font-medium leading-relaxed border-l-[6px] border-primary/20 pl-10 py-2">
                {article.description}
            </p>

            {/* Main Content Body */}
            <div className="prose prose-2xl dark:prose-invert max-w-none mb-32">
                <div className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 leading-[1.8] font-medium space-y-10">
                    <p>{article.content}</p>
                    
                    <p>
                        In the modern digital age, clarity is your most valuable currency. Whether you're drafting an internal memo or a public-facing campaign, the precision of your language dictates the quality of your impact. 
                        <strong> WordWise Correctify</strong> isn't just about catching typos; it's about refining the structural integrity of your thoughts.
                    </p>

                    <div className="relative p-12 bg-slate-900 rounded-[3.5rem] text-white overflow-hidden my-20 shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <BookMarked className="w-12 h-12 text-primary mb-8" />
                        <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-primary">Strategic Insight</h3>
                        <p className="text-lg md:text-xl text-slate-300 font-medium italic leading-relaxed">
                            "Communication is the intersection of logic and empathy. Our AI engine analyzes the logic of your grammar while preserving the empathy of your unique human tone."
                        </p>
                    </div>

                    <p>
                        By leveraging multi-layered NLP models, we provide suggestions that adapt to your context. A comma is never just a comma; it's a pause, a breath, or a bridge between ideas. WordWise helps you place those bridges with architectural precision.
                    </p>
                </div>
            </div>
        </motion.article>

        {/* Footer Navigation */}
        {relatedArticles.length > 0 && (
            <section className="pt-32 border-t-2 border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-4 mb-16">
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-transparent opacity-20" />
                    <h2 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em]">Next Steps</h2>
                    <div className="h-[2px] flex-1 bg-gradient-to-l from-primary to-transparent opacity-20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {relatedArticles.map(a => (
                        <Link 
                            key={a.slug}
                            to={`/resources/${a.slug}`}
                            className="group p-10 bg-white dark:bg-white/5 rounded-[3rem] border border-slate-200/50 dark:border-white/5 shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all flex flex-col"
                        >
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-4 opacity-60">Related Article</span>
                            <h3 className="text-xl md:text-2xl font-display font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight mb-8">
                                {a.title}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mt-auto">
                                Read Guide <ArrowRight className="w-3 h-3" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        )}
      </div>
    </div>
  );
};

const ArrowRight = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14m-7-7l7 7-7 7" />
    </svg>
)

export default ArticleDetail;
