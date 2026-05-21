import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md hover:shadow-xl transition-all group"
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 bg-opacity-10`} style={{ backgroundColor: `${color}20`, color }}>
      {icon}
    </div>
    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const ComparisonStrip = () => {
  const pairs = [
    { 
      before: "She go to store.", 
      after: "She went to the store.",
      note: "Verb tense + Missing article"
    },
    { 
      before: "I has been hear.", 
      after: "I have been here.",
      note: "Subject-verb agreement + Homophone"
    },
    { 
      before: "They is happy.", 
      after: "They are happy.",
      note: "Plural agreement"
    }
  ];

  return (
    <div className="my-32 overflow-hidden py-10">
      <h2 className="text-3xl font-display font-bold text-center mb-12">Precision in Action</h2>
      <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory px-6 hide-scrollbar">
        {pairs.map((pair, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[450px] snap-center bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-lg">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-error uppercase tracking-widest block mb-2">Original</span>
                <p className="text-xl text-slate-400 line-through decoration-error/30">{pair.before}</p>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-700 w-full" />
              <div>
                <span className="text-[10px] font-bold text-correct uppercase tracking-widest block mb-2">Corrected</span>
                <p className="text-xl font-medium text-slate-900 dark:text-white">
                  {pair.after.split(' ').map((word, j) => {
                    const isChanged = !pair.before.includes(word);
                    return isChanged ? <span key={j} className="text-correct border-b-2 border-correct/30 mx-0.5">{word} </span> : <span key={j}>{word} </span>;
                  })}
                </p>
              </div>
              <p className="text-xs text-slate-500 italic mt-4">{pair.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    { icon: "🔴", title: "Real-time Detection", description: "Catch misspellings as you type with our high-speed detection engine.", color: "#EF4444" },
    { icon: "🟢", title: "Grammar & Tense", description: "Advanced sentence restructuring to ensure perfect verb usage and syntax.", color: "#10B981" },
    { icon: "💡", title: "Smart Explanations", description: "Learn from your mistakes. Every fix comes with a clear, concise explanation.", color: "#2563EB" },
    { icon: "📋", title: "One-Click Copy", description: "Quickly grab your polished text and paste it anywhere you need.", color: "#6366F1" },
    { icon: "🔁", title: "Diff Comparison", description: "See exactly what changed with our side-by-side comparison tool.", color: "#F59E0B" },
    { icon: "⚡", title: "Sub-500ms Speed", description: "Don't wait. Get your corrections faster than you can blink.", color: "#8B5CF6" },
    { icon: "🌙", title: "Dark Mode", description: "A beautiful, eye-friendly interface for your late-night writing sessions.", color: "#1E293B" },
    { icon: "📱", title: "Mobile Ready", description: "Correct on the go. Our interface adapts perfectly to any screen size.", color: "#EC4899" },
    { icon: "🔒", title: "Session History", description: "Keep track of your corrections during your session. No account needed.", color: "#10B981" }
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            Everything you need to <br /><span className="text-primary">write perfectly.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Powerful AI-driven features designed to make your writing clear, professional, and error-free.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 0.1} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-primary rounded-[3rem] text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to write better?</h2>
          <p className="text-primary-light text-xl mb-10 max-w-lg mx-auto">Join thousands of users who trust WordWise Correctify for their daily writing.</p>
          <Link 
            to="/app" 
            className="inline-block px-10 py-5 bg-white text-primary rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-all"
          >
            Get Started Free
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
