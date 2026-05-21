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
            className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <h3 className="text-2xl font-display font-bold text-error mb-4">The Problem</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Most spell checkers just underline errors in red. They don't provide context or explain why a particular word or phrase is considered incorrect, leaving the writer guessing.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <h3 className="text-2xl font-display font-bold text-correct mb-4">The Solution</h3>
            <p className="text-slate-600 dark:text-slate-400">
              WordWise provides clear highlights and detailed tooltips for every correction. It's about empowering the writer with knowledge, not just fixing a typo.
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
