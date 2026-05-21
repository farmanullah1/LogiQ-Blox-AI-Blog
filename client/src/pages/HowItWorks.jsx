import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TechStep = ({ title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
  >
    <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
  </motion.div>
);

const HowItWorks = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            Smart correction, <br /><span className="text-primary">explained.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            A deep dive into the technology and process behind every corrected word.
          </motion.p>
        </div>

        {/* Section 1: User Experience Walkthrough */}
        <section className="mb-32">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">The User Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="aspect-video bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center p-8">
                <div className="w-full space-y-4">
                  <div className="h-4 w-1/3 bg-primary/20 rounded" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="p-4 border-2 border-dashed border-primary/30 rounded-xl">
                    <span className="text-primary font-mono text-sm">Waiting for input...</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Input Your Text</h3>
                  <p className="text-slate-600 dark:text-slate-400">Simply paste or type your content. Our interface is designed for focus and speed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Processing</h3>
                  <p className="text-slate-600 dark:text-slate-400">Our NLP engine analyzes your text in real-time, checking for thousands of grammar rules and spelling patterns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Review & Polish</h3>
                  <p className="text-slate-600 dark:text-slate-400">Review each change, read the explanations, and copy your final text with one click.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Under the Hood */}
        <section className="mb-32 p-12 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent)]" />
          <h2 className="text-3xl font-display font-bold mb-16 text-center relative z-10">Under the Hood</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <TechStep title="React Frontend" description="Responsive UI with Framer Motion animations for a smooth user experience." delay={0.1} />
            <div className="hidden md:block w-12 h-0.5 bg-primary/30" />
            <TechStep title="Node.js API" description="Secure bridge handling session history and communicating with the AI core." delay={0.2} />
            <div className="hidden md:block w-12 h-0.5 bg-primary/30" />
            <TechStep title="Python NLP" description="The brain—using LanguageTool and PySpellChecker for deep text analysis." delay={0.3} />
            <div className="hidden md:block w-12 h-0.5 bg-primary/30" />
            <TechStep title="MongoDB" description="Cloud storage for session data and correction history." delay={0.4} />
          </div>
        </section>

        {/* Section 3: The Engine */}
        <section className="text-center">
          <h2 className="text-3xl font-display font-bold mb-6">The Power of LanguageTool</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
            WordWise Correctify is built on top of world-class open-source NLP technology, refined and optimized for speed and accuracy.
          </p>
          <div className="flex justify-center gap-12 grayscale opacity-50">
            {/* Mock logos or text labels */}
            <span className="text-2xl font-bold">LanguageTool</span>
            <span className="text-2xl font-bold">PySpellChecker</span>
            <span className="text-2xl font-bold">NLP Engine v1.0</span>
          </div>
        </section>

        <div className="mt-24 text-center">
          <Link 
            to="/app" 
            className="px-10 py-5 bg-primary text-white rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-all"
          >
            Experience It Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
