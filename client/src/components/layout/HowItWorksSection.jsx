import React from 'react';
import { motion } from 'framer-motion';

const Step = ({ number, title, description, isLast, index }) => {
  return (
    <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-display font-bold shadow-lg shrink-0"
      >
        {number}
      </motion.div>
      
      <motion.div
        initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 text-center md:text-left"
      >
        <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg">{description}</p>
      </motion.div>

      {!isLast && (
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-32 bg-dashed border-l-2 border-dashed border-primary/30" />
      )}
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Type your text",
      description: "Paste or write any sentence in the correction box. Our system supports up to 500 characters per request."
    },
    {
      number: "02",
      title: "AI analyzes it",
      description: "Our NLP engine detects spelling and grammar issues in real time, identifying potential improvements instantly."
    },
    {
      number: "03",
      title: "Review & copy",
      description: "See highlighted corrections and explanations. Review each change and copy your polished text with one click."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">Simple steps to perfect writing.</p>
        </div>

        <div className="relative flex flex-col gap-24">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute left-10 top-20 bottom-20 w-0.5 border-l-2 border-dashed border-primary/20" />
          
          {steps.map((step, i) => (
            <Step 
              key={i} 
              {...step} 
              index={i} 
              isLast={i === steps.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
