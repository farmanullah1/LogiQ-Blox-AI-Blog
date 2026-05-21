import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShortcutModal = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: "Ctrl + Enter", desc: "Submit text for correction" },
    { key: "Ctrl + /", desc: "Toggle sidebar (Corrector page)" },
    { key: "Escape", desc: "Close any modal or tooltip" },
    { key: "?", desc: "Open/Close this help menu" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">✕</button>
            </div>

            <div className="space-y-4">
              {shortcuts.map((s, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{s.desc}</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded shadow-sm text-xs font-bold text-primary font-mono">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
              <p className="text-xs text-slate-400">WordWise Correctify — Built for Efficiency</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShortcutModal;
