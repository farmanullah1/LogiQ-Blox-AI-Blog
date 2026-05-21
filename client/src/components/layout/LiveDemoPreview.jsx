import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

const LiveDemoPreview = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
            See the <span className="text-primary">Difference.</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">Experience real-time intelligence at your fingertips.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          {/* Mock Browser Header */}
          <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto bg-white dark:bg-slate-900 rounded-md px-4 py-1 text-xs text-slate-400 font-mono">
              wordwise-correctify.app/demo
            </div>
          </div>

          {/* Mock App Content */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 min-h-[400px] flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div className="h-4 w-1/3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-50 dark:bg-slate-800/50 rounded" />
                <div className="h-4 w-[90%] bg-slate-50 dark:bg-slate-800/50 rounded" />
                <div className="h-4 w-[95%] bg-slate-50 dark:bg-slate-800/50 rounded" />
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                <p className="text-lg text-slate-700 dark:text-slate-300 italic">
                  "She <span className="text-error underline decoration-dotted underline-offset-4 font-semibold">go</span> to the store yesterday and <span className="text-error underline decoration-dotted underline-offset-4 font-semibold">buyed</span> milk."
                </p>
              </div>
              <div className="flex justify-end">
                <div className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md animate-bounce">
                  ✨ Correct
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-6">
              <div className="w-full p-6 bg-correct/10 border border-correct/30 rounded-2xl relative">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-correct text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Corrected ✓
                </div>
                <p className="text-lg text-slate-800 dark:text-slate-100 font-medium">
                  "She <span className="bg-correct/20 text-correct-dark dark:text-correct px-1 rounded">went</span> to the store yesterday and <span className="bg-correct/20 text-correct-dark dark:text-correct px-1 rounded">bought</span> milk."
                </p>
              </div>
              
              <div className="text-center">
                <h4 className="font-display font-bold text-slate-900 dark:text-white mb-2">Smart Explanations</h4>
                <p className="text-sm text-slate-500 max-w-[250px]">
                  "Past tense required for 'yesterday'. 'went' is the past form of 'go'."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <MagneticButton 
              to="/app" 
              className="px-10 py-5 bg-primary text-white rounded-full font-bold text-xl shadow-xl hover:shadow-primary/40 transition-all"
            >
              Try It Yourself →
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoPreview;
