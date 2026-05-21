import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeatureCard = ({ title, description, icon, color, delay }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      ref={cardRef}
      className="min-w-[300px] md:min-w-[350px] p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 shadow-md transition-all duration-200 ease-out group relative overflow-hidden"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 bg-opacity-10`} style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
      
      <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  const features = [
    {
      title: "Real-time Detection",
      description: "Misspellings and grammatical slips highlighted instantly as you type.",
      icon: "🔴",
      color: "#EF4444"
    },
    {
      title: "AI Grammar Correction",
      description: "Advanced NLP engine provides context-aware sentence restructuring.",
      icon: "🟢",
      color: "#10B981"
    },
    {
      title: "Smart Explanations",
      description: "Don't just fix it—understand why. Every correction includes a clear explanation.",
      icon: "💡",
      color: "#2563EB"
    },
    {
      title: "One-Click Copy",
      description: "Perfectly polished text ready for your next email, post, or document.",
      icon: "📋",
      color: "#6366F1"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
          Powerful <span className="text-primary">Features</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400">Everything you need for flawless communication.</p>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {features.map((feature, i) => (
          <div key={i} className="snap-center">
            <FeatureCard {...feature} delay={i * 0.1} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
