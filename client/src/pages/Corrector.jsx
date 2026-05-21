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
  const [readingGrade, setReadingGrade] = useState(0);
  const { isDarkMode } = useTheme();

  const sessionId = useRef(localStorage.getItem('wordwise_session_id') || uuidv4());
  const debounceTimer = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Debounced auto-detection
  useEffect(() => {
    if (isAutoDetect && inputText.trim().length > 15) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.type !== 'bot' || lastMsg.original !== inputText) {
          handleSendMessage();
        }
      }, 5000); // 5s debounce for better performance
    }
    
    // Calculate simple reading grade (heuristic)
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const sentences = inputText.trim() ? inputText.split(/[.!?]+/).filter(Boolean).length : 0;
    const grade = words > 5 ? Math.min(12, Math.round((words / (sentences || 1)) * 0.5 + (inputText.length / words) * 0.5)) : 0;
    setReadingGrade(grade);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [inputText, isAutoDetect]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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
      if (!isAutoDetect) toast.error("Please type something first.");
      return;
    }

    if (inputText.length > 2000) {
      toast.error("Text exceeds 2000 characters.");
      return;
    }

    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.type === 'user' && isAutoDetect) {
            return [...prev.slice(0, -1), newMessage];
        }
        return [...prev, newMessage];
    });

    const currentInput = inputText;
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
      fetchHistory();
      if (!isAutoDetect) toast.success(`Corrected! Found ${data.correction_count} issues.`);
    } catch (error) {
      const errorMsg = error.response?.data?.error || "AI service temporarily unavailable.";
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        type: 'error',
        text: errorMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    if (window.confirm("Clear your writing history?")) {
      try {
        await api.clearHistory(sessionId.current);
        setHistory([]);
        toast.success("History cleared.");
      } catch (error) {
        toast.error("Failed to clear history.");
      }
    }
  };

  return (
    <div className="flex h-screen pt-20 bg-bg-base dark:bg-[#0B1120] overflow-hidden premium-gradient">
      <ParticleBackground />
      
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            className="w-80 glass-sidebar flex flex-col gap-8 hidden lg:flex relative z-10"
          >
            <div className="p-6 space-y-8 flex-1 flex flex-col">
              <section>
                <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-4">Settings</h3>
                <div className="space-y-4">
                  <Toggle label="Auto-detection" enabled={isAutoDetect} setEnabled={setIsAutoDetect} />
                  <Toggle label="Auto-correct" enabled={isAutoCorrect} setEnabled={setIsAutoCorrect} />
                </div>
              </section>

              <section className="flex-1 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Writing History</h3>
                  {history.length > 0 && (
                    <button onClick={clearHistory} className="text-[10px] text-error hover:text-error/80 uppercase font-bold tracking-widest transition-colors">Clear</button>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 hide-scrollbar">
                  {history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-30">
                      <span className="text-4xl mb-2">📜</span>
                      <p className="text-xs text-center">No history yet</p>
                    </div>
                  ) : (
                    history.map((item) => (
                      <div 
                        key={item._id} 
                        onClick={() => setInputText(item.originalText)}
                        className="p-3 bg-white/40 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/5 cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 transition-all group"
                      >
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mb-1 font-medium">{item.correctedText}</p>
                        <div className="flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px]">{new Date(item.createdAt).toLocaleDateString()}</span>
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded-full font-bold">{item.correctionCount} fixes</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <div className="space-y-3">
                <div className="p-4 bg-primary/5 rounded-[2rem] border border-primary/10">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Readability</h4>
                    <span className="text-xs font-bold text-primary">Grade {readingGrade || '-'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(readingGrade / 12) * 100}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-correct/5 rounded-[2rem] border border-correct/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-correct animate-pulse" />
                    <div>
                      <h4 className="text-[10px] font-extrabold text-correct uppercase tracking-widest">Cloud Sync</h4>
                      <p className="text-[9px] text-slate-500 font-medium">Session backed up</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 text-center">
                <a href="/creator" className="text-[10px] font-extrabold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest">
                  Built by Farman ⚡
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scroll-smooth pb-48"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] flex items-center justify-center text-5xl mb-8 shadow-2xl shadow-primary/20"
              >
                🤖
              </motion.div>
              <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4">Master Your Writing</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">Type your sentence below. WordWise AI will polish your grammar and spelling in real-time.</p>
              
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {["She go to the store.", "I has been working hear.", "Their going home."].map((ex, i) => (
                  <button key={i} onClick={() => setInputText(ex)} className="px-4 py-2 bg-white/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-full text-xs font-bold hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm">
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          )}
          {isLoading && <LoadingBubble />}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-bg-base dark:from-[#0B1120] via-bg-base/90 dark:via-[#0B1120]/90 to-transparent z-20">
          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence>
              {inputText && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setInputText('')}
                  className="absolute -top-12 right-0 px-3 py-1.5 bg-white dark:bg-[#131C2F] border border-slate-200 dark:border-white/5 rounded-full text-[9px] font-extrabold text-slate-400 hover:text-error transition-colors uppercase tracking-widest shadow-xl"
                >
                  Reset Editor
                </motion.button>
              )}
            </AnimatePresence>

            <div className="relative glass-card rounded-[2.5rem] p-2 shadow-2xl transition-all group-focus-within:ring-2 ring-primary/20">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text..."
                className="w-full bg-transparent border-none focus:ring-0 p-4 md:p-6 pr-32 min-h-[140px] text-lg md:text-xl font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400/50 resize-none leading-relaxed"
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-4">
                <span className={`text-[10px] font-extrabold tracking-tighter ${inputText.length > 1800 ? 'text-error' : 'text-slate-400'}`}>
                  {inputText.length} / 2000
                </span>
                <MagneticButton
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="btn-primary flex items-center gap-2 group disabled:opacity-30 disabled:grayscale"
                >
                  <span className="text-sm">Correct</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </MagneticButton>
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-2 opacity-50">
                <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-primary animate-ping' : 'bg-correct'}`} />
                <span className="text-[9px] font-extrabold uppercase tracking-widest">
                  {isLoading ? 'Processing' : 'Engine Ready'}
                </span>
              </div>
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
      <div className="flex justify-end pr-4">
        <div className="max-w-[80%] space-y-2">
          <div className="bg-primary text-white p-5 rounded-[2.5rem] rounded-tr-none shadow-xl shadow-primary/10">
            <p className="text-base md:text-lg font-medium leading-relaxed">{message.text}</p>
          </div>
          <p className="text-[10px] font-bold text-slate-400 text-right uppercase tracking-widest">{message.timestamp}</p>
        </div>
      </div>
    );
  }

  if (message.type === 'error') {
    return (
      <div className="flex justify-start pl-4">
        <div className="max-w-[80%] bg-error/5 border border-error/20 p-6 rounded-[2.5rem] rounded-tl-none flex gap-4 items-center">
          <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-2xl">⚠️</div>
          <div>
            <h4 className="text-sm font-extrabold text-error uppercase tracking-widest mb-1">Service Alert</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{message.text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start pl-4">
      <div className="max-w-[90%] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-xs text-white font-bold shadow-lg">W</div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-[0.2em]">WordWise Assistant</span>
          <span className="bg-correct/10 text-correct text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest">Optimized</span>
        </div>

        <div className="bg-white dark:bg-[#131C2F] border border-slate-200/50 dark:border-white/5 p-6 md:p-8 rounded-[2.5rem] rounded-tl-none shadow-2xl">
          <div className="text-lg md:text-xl text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
            {renderCorrectedText(message.corrected, message.changes)}
          </div>

          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-white/5 items-center">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(message.corrected);
                toast.success("Copied to clipboard!");
              }}
              className="flex items-center gap-2 text-[11px] font-extrabold text-primary hover:text-primary-dark uppercase tracking-widest transition-colors"
            >
              <span>📋</span> Copy Result
            </button>
            <div className="ml-auto text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              {message.changes.length} corrections applied
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderCorrectedText = (text, changes) => {
  if (!changes || changes.length === 0) return text;
  const result = [];
  let lastIndex = 0;
  const sortedChanges = [...changes].sort((a, b) => a.start_index - b.start_index);
  
  sortedChanges.forEach((change, i) => {
    if (change.start_index > lastIndex) {
      result.push(text.slice(lastIndex, change.start_index));
    }
    result.push(
      <span key={`change-${i}`} className="relative group inline-block">
        <span className="bg-correct/15 text-correct-dark dark:text-correct px-1.5 py-0.5 rounded-lg border-b-2 border-correct/30 cursor-help transition-all group-hover:bg-correct/25">
          {change.corrected}
        </span>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-3 bg-slate-900 text-white text-xs rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-normal min-w-[220px] z-50 pointer-events-none text-center shadow-2xl border border-white/10 scale-95 group-hover:scale-100">
          <span className="block font-extrabold text-correct mb-2 uppercase tracking-tighter text-[10px]">Correction Applied</span>
          {change.explanation}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900" />
        </span>
      </span>
    );
    lastIndex = change.end_index;
  });
  
  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result;
};

const LoadingBubble = () => (
  <div className="flex justify-start pl-4">
    <div className="bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 p-6 rounded-[2rem] rounded-tl-none flex items-center gap-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        ))}
      </div>
      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Thinking</span>
    </div>
  </div>
);

const Toggle = ({ label, enabled, setEnabled }) => (
  <div className="flex justify-between items-center group cursor-pointer" onClick={() => setEnabled(!enabled)}>
    <span className="text-xs text-slate-600 dark:text-slate-400 font-bold group-hover:text-primary transition-colors">{label}</span>
    <button
      className={`relative w-11 h-6 rounded-full transition-all duration-500 ${enabled ? 'bg-primary' : 'bg-slate-200 dark:bg-white/10 shadow-inner'}`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 4, scale: enabled ? 1 : 0.8 }}
        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg"
      />
    </button>
  </div>
);

export default Corrector;
