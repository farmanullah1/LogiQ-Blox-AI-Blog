import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';
import ParticleBackground from '../components/animations/ParticleBackground';
import MagneticButton from '../components/ui/MagneticButton';
import api from '../services/api';
import { v4 as uuidv4 } from 'uuid';

const Corrector = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAutoDetect, setIsAutoDetect] = useState(true);
  const [isAutoCorrect, setIsAutoCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const { isDarkMode } = useTheme();

  const sessionId = useRef(localStorage.getItem('wordwise_session_id') || uuidv4());

  useEffect(() => {
    localStorage.setItem('wordwise_session_id', sessionId.current);
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory(sessionId.current);
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      toast.error("Please type something first.");
      return;
    }

    if (inputText.length > 500) {
      toast.error("Text exceeds 500 characters.");
      return;
    }

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const data = await api.correctText(currentInput, sessionId.current);
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        original: data.original,
        corrected: data.corrected,
        changes: data.changes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
      fetchHistory(); // Refresh history
      toast.success(`Text corrected! ${data.correction_count} changes made.`);
    } catch (error) {
      toast.error(error.response?.data?.error || "NLP service unavailable. Please try again.");
      setInputText(currentInput); // Restore text on error
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    if (window.confirm("Are you sure you want to clear your history?")) {
      try {
        await api.clearHistory(sessionId.current);
        setHistory([]);
        toast.success("History cleared.");
      } catch (error) {
        toast.error("Failed to clear history.");
      }
    }
  };

  const ExampleChips = () => (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {[
        "She go to the store yesterday.",
        "I has been working hear for too years.",
        "Their going to the park tommorrow."
      ].map((example, i) => (
        <button
          key={i}
          onClick={() => setInputText(example)}
          className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm hover:bg-primary/20 transition-all hover:scale-105"
        >
          {example}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-80px)] mt-20 bg-bg-base overflow-hidden">
      <ParticleBackground />
      
      {/* Left Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-8 hidden lg:flex relative z-10"
          >
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Preferences</h3>
              <div className="space-y-4">
                <Toggle label="Auto-detect errors" enabled={isAutoDetect} setEnabled={setIsAutoDetect} />
                <Toggle label="Auto-correct" enabled={isAutoCorrect} setEnabled={setIsAutoCorrect} />
              </div>
            </section>

            <section className="flex-1 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">History</h3>
                {history.length > 0 && (
                  <button onClick={clearHistory} className="text-[10px] text-error hover:underline uppercase font-bold">Clear</button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {history.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No history yet.</p>
                ) : (
                  history.map((item) => (
                    <div 
                      key={item._id} 
                      onClick={() => setInputText(item.originalText)}
                      className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-primary/50 transition-colors group"
                    >
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-1 group-hover:text-primary transition-colors">{item.correctedText}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded">{item.correctionCount} fix</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
              <h4 className="text-sm font-bold text-primary mb-1">Quick Tip</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You can click any history item to reload it into the editor.
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <a 
                href="/creator" 
                className="text-[10px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-tighter"
              >
                Made with ❤️ by Farman
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth pb-32">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-inner"
              >
                ✍️
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Hi! I'm WordWise</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">Type a sentence below and I'll fix spelling and grammar errors instantly.</p>
              <ExampleChips />
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          )}
          {isLoading && <LoadingBubble />}
        </div>

        {/* Input Zone */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-bg-base via-bg-base to-transparent z-20">
          <div className="max-w-4xl mx-auto relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4 pr-32 focus:border-primary focus:ring-0 transition-all shadow-xl resize-none min-h-[120px] text-lg text-slate-800 dark:text-slate-200"
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span className={`text-xs font-bold ${inputText.length > 450 ? 'text-error' : 'text-slate-400'}`}>
                {inputText.length} / 500
              </span>
              <MagneticButton
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? '...' : '✨ Correct'}
              </MagneticButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ChatMessage = ({ message }) => {
  if (message.type === 'user') {
    return (
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tr-none shadow-sm">
          <p className="text-slate-800 dark:text-slate-200">{message.text}</p>
          <span className="text-[10px] text-slate-400 mt-2 block text-right">{message.timestamp}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl rounded-tl-none shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-[10px] text-white font-bold">W</div>
          <span className="text-xs font-bold text-slate-900 dark:text-white">WordWise Correctify</span>
          <span className="px-2 py-0.5 bg-correct/10 text-correct text-[10px] font-bold rounded-full">Corrected ✓</span>
        </div>
        
        <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
          {renderCorrectedText(message.corrected, message.changes)}
        </p>

        <div className="flex gap-4 mt-6 items-center">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(message.corrected);
              toast.success("Copied to clipboard!");
            }}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            📋 Copy
          </button>
          <button className="text-xs font-bold text-slate-400 hover:text-slate-600">🔁 Compare</button>
          <span className="ml-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {message.changes.length} changes detected
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const renderCorrectedText = (text, changes) => {
  if (!changes || changes.length === 0) return text;
  
  const result = [];
  let lastIndex = 0;
  
  // Sort changes by start_index (they should already be sorted from backend)
  const sortedChanges = [...changes].sort((a, b) => a.start_index - b.start_index);
  
  sortedChanges.forEach((change, i) => {
    // Add text before the change
    if (change.start_index > lastIndex) {
      result.push(text.slice(lastIndex, change.start_index));
    }
    
    // Add the highlighted change
    result.push(
      <span 
        key={`change-${i}`} 
        className="bg-correct/20 text-correct-dark dark:text-correct px-1 rounded cursor-help group relative inline-block mx-0.5"
      >
        {change.corrected}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal min-w-[180px] z-50 pointer-events-none text-center shadow-xl border border-white/10">
          <span className="block font-bold text-correct mb-1">Correction:</span>
          {change.explanation}
        </span>
      </span>
    );
    
    lastIndex = change.end_index;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  
  return result;
};

const LoadingBubble = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        ))}
      </div>
      <span className="text-sm text-slate-400 animate-pulse">Analyzing your text...</span>
    </div>
  </motion.div>
);

const Toggle = ({ label, enabled, setEnabled }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</span>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <motion.div
        animate={{ x: enabled ? 22 : 2 }}
        className="absolute top-0.5 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
);

export default Corrector;
