import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg-base dark:bg-[#0B1120] min-h-screen premium-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tighter"
            >
              Let's <span className="text-primary text-glow">Connect.</span>
            </motion.h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 font-medium leading-relaxed">
              Have a question about our AI core? Want to suggest a feature? Our team is ready to help you write better.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">📧</div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Email Us</h4>
                  <p className="text-primary font-bold">support@wordwise-ai.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 rounded-2xl bg-correct/10 flex items-center justify-center text-2xl">🌐</div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Global HQ</h4>
                  <p className="text-slate-500 font-medium">Digital Nomad Valley, Cloud Lane 404</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 bg-white dark:bg-white/5 rounded-[3rem] border border-slate-200/50 dark:border-white/5 shadow-2xl shadow-primary/5"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Name</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-[#0B1120] border-none rounded-2xl p-4 focus:ring-2 ring-primary/20 text-slate-900 dark:text-white font-bold" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                  <input type="email" className="w-full bg-slate-50 dark:bg-[#0B1120] border-none rounded-2xl p-4 focus:ring-2 ring-primary/20 text-slate-900 dark:text-white font-bold" placeholder="email@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Subject</label>
                <select className="w-full bg-slate-50 dark:bg-[#0B1120] border-none rounded-2xl p-4 focus:ring-2 ring-primary/20 text-slate-900 dark:text-white font-bold appearance-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>Enterprise Sales</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
                <textarea rows="5" className="w-full bg-slate-50 dark:bg-[#0B1120] border-none rounded-3xl p-4 focus:ring-2 ring-primary/20 text-slate-900 dark:text-white font-bold resize-none" placeholder="How can we help?"></textarea>
              </div>
              <MagneticButton className="btn-primary w-full py-5 text-sm uppercase tracking-[0.3em]">
                Send Message
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
