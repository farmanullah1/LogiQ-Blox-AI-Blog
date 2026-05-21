import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            I built this because <br /><span className="text-primary">writing matters.</span>
          </motion.h1>
        </div>

        <section className="prose prose-lg dark:prose-invert max-w-none mb-24">
          <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
            WordWise Correctify started as a personal project to solve a simple yet persistent problem: the lack of intuitive, explanatory writing tools. While many spell checkers exist, most focus solely on pointing out errors without explaining the 'why' behind the correction.
          </p>
          <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
            As a developer and writer, I wanted a tool that didn't just fix my mistakes but helped me become a better communicator. WordWise is the result of that vision—a platform that combines advanced AI with a user-centric design to provide meaningful writing assistance.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl font-display font-bold text-error mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center text-sm">✕</span>
              The Problem
            </h3>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl mb-6 font-mono text-sm border border-slate-100 dark:border-slate-800">
              <p className="text-slate-400">
                She <span className="text-error underline decoration-wavy decoration-2">go</span> to the store...
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Traditional spell checkers just mark errors with cryptic lines. They don't explain the logic or offer context-aware improvements.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-correct/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl font-display font-bold text-correct mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-correct/10 flex items-center justify-center text-sm">✓</span>
              The Solution
            </h3>
            <div className="bg-correct/5 dark:bg-correct/10 p-4 rounded-xl mb-6 font-mono text-sm border border-correct/20">
              <p className="text-slate-800 dark:text-slate-200">
                She <span className="bg-correct/20 text-correct-dark dark:text-correct px-1 rounded">went</span> to the store...
              </p>
              <div className="mt-2 text-[10px] text-correct-dark font-bold uppercase tracking-widest">
                Explanatory Tooltip Active
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              WordWise provides high-fidelity highlights and real-time explanations. Every correction is a learning opportunity.
            </p>
          </motion.div>
        </div>

        <blockquote className="text-3xl md:text-4xl font-display font-medium text-center text-slate-900 dark:text-white mb-24 italic leading-tight">
          "WordWise Correctify exists to make clear, confident writing accessible to everyone, regardless of their first language."
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "⚡ Speed", desc: "Corrections in milliseconds, not seconds. Your flow remains uninterrupted." },
            { title: "🎓 Education", desc: "Every fix comes with a clear explanation. Learn as you write." },
            { title: "🌍 Accessibility", desc: "Designed for ESL speakers and native writers alike. Inclusive by default." }
          ].map((v, i) => (
            <div key={i} className="text-center">
              <h4 className="text-xl font-bold text-primary mb-2">{v.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/creator" 
            className="text-primary font-bold hover:underline text-lg"
          >
            Meet the person behind it →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
