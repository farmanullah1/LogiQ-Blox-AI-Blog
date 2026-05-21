import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      className="min-w-[320px] md:min-w-[380px] p-10 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-2xl shadow-primary/5 transition-all duration-300 ease-out group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-8 shadow-inner`} style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{description}</p>
      
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1.5 transition-all duration-700 ease-in-out" style={{ backgroundColor: color }} />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = (el.scrollLeft / (maxScroll || 1)) * 100;
      setScrollProgress(progress);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    {
      title: "Real-time Detection",
      description: "Misspellings and grammatical slips highlighted instantly as you type with sub-100ms latency.",
      icon: "🔴",
      color: "#EF4444"
    },
    {
      title: "AI Grammar Core",
      description: "Advanced NLP engine provides context-aware sentence restructuring and stylistic advice.",
      icon: "🟢",
      color: "#10B981"
    },
    {
      title: "Smart Insights",
      description: "Don't just fix—understand. Every correction includes a detailed linguistic explanation.",
      icon: "💡",
      color: "#2563EB"
    },
    {
      title: "One-Click Sync",
      description: "Cloud-synced history and one-tap copy ensure your polished text is always ready for use.",
      icon: "📋",
      color: "#6366F1"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white tracking-tighter">
            Next-Gen <span className="text-primary">Intelligence.</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl">Everything you need for flawless professional communication, powered by cutting-edge NLP.</p>
        </motion.div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-16 snap-x snap-mandatory hide-scrollbar px-2"
      >
        {features.map((feature, i) => (
          <div key={i} className="snap-center">
            <FeatureCard {...feature} delay={i * 0.15} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            animate={{ width: `${scrollProgress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
