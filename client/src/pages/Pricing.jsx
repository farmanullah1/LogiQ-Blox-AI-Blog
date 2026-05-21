import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for students and casual writers.",
      features: ["500 chars per request", "Basic grammar & spelling", "Tone analysis", "Session history"],
      cta: "Current Plan",
      primary: false
    },
    {
      name: "Premium",
      price: "$12",
      period: "/mo",
      desc: "For professionals who need maximum impact.",
      features: ["2000+ chars per request", "Advanced AI Paraphraser", "Professional Markdown reports", "Priority NLP core access", "Custom style guides"],
      cta: "Upgrade to Pro",
      primary: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Writing intelligence for entire teams.",
      features: ["Unlimited requests", "Admin dashboard", "Team tone consistency", "API access", "SSO integration"],
      cta: "Contact Sales",
      primary: false
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base dark:bg-[#0B1120] min-h-screen premium-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-6"
          >
            Simple <span className="text-primary text-glow">Pricing.</span>
          </motion.h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Invest in clarity. Write with confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] border-2 transition-all ${
                plan.primary 
                  ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/30 scale-105' 
                  : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-900 dark:text-white'
              }`}
            >
              <h3 className="text-2xl font-display font-black mb-2 uppercase tracking-widest">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black">{plan.price}</span>
                {plan.period && <span className="text-sm opacity-60 font-bold">{plan.period}</span>}
              </div>
              <p className={`mb-10 text-sm font-medium ${plan.primary ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                {plan.desc}
              </p>
              
              <ul className="space-y-4 mb-12">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-bold">
                    <span className={plan.primary ? 'text-white' : 'text-primary'}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <MagneticButton
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                  plan.primary 
                    ? 'bg-white text-primary hover:shadow-xl' 
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                {plan.cta}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
