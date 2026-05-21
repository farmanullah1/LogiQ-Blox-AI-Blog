import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';
import ParticleBackground from '../components/animations/ParticleBackground';
import MagneticButton from '../components/ui/MagneticButton';
import api from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import confetti from 'canvas-confetti';

const Corrector = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAutoDetect, setIsAutoDetect] = useState(true);
  const [isAutoCorrect, setIsAutoCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [readingGrade, setReadingGrade] = useState(0);
  const [insights, setInsights] = useState({ tone: 'Neutral', word_count: 0, sentiment: 'Neutral' });
  const [compareMode, setCompareMode] = useState(null); // ID of message being compared
  const { isDarkMode } = useTheme();

  const sessionId = useRef(localStorage.getItem('wordwise_session_id') || uuidv4());
  const debounceTimer = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isAutoDetect && inputText.trim().length > 15) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.type !== 'bot' || lastMsg.original !== inputText) {
          handleSendMessage();
        }
      }, 5000); 
    }
    
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
        insights: data.insights,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
      setInsights(data.insights);
      fetchHistory();

      if (data.correction_count === 0 && !isAutoDetect) {
          confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#2563EB', '#10B981', '#6366F1']
          });
          toast.success("Perfect writing! No errors found.", { icon: '🎉' });
      } else if (!isAutoDetect) {
          toast.success(`Corrected! Found ${data.correction_count} issues.`);
      }
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

  const handleParaphrase = async (style) => {
      if (!inputText.trim()) return toast.error("Write something to paraphrase.");
      setIsLoading(true);
      try {
          const data = await api.paraphrase(inputText, style);
          setInputText(data.paraphrased);
          toast.success(`Rewritten in ${style} style!`, { icon: '✍️' });
      } catch (error) {
          toast.error("Paraphrase failed.");
      } finally {
          setIsLoading(false);
      }
  }

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

  const exportToMarkdown = () => {
    if (messages.length === 0) return;
    const lastBotMsg = [...messages].reverse().find(m => m.type === 'bot');
    if (!lastBotMsg) return;

    const content = `# WordWise AI Correction Report\n\n## Original Text\n${lastBotMsg.original}\n\n## Corrected Text\n${lastBotMsg.corrected}\n\n## Insights\n- **Tone:** ${lastBotMsg.insights?.tone || 'Neutral'}\n- **Word Count:** ${lastBotMsg.insights?.word_count || 0}\n- **Corrections:** ${lastBotMsg.changes.length}\n\n---\n*Generated by WordWise AI*`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wordwise-${Date.now()}.md`;
    a.click();
    toast.success("Report exported successfully!");
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
                <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-4">Engine</h3>
                <div className="space-y-4">
                  <Toggle label="Auto-detect" enabled={isAutoDetect} setEnabled={setIsAutoDetect} />
                  <Toggle label="Auto-correct" enabled={isAutoCorrect} setEnabled={setIsAutoCorrect} />
                </div>
              </section>

              <section className="flex-1 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">History</h3>
                  {history.length > 0 && (
                    <button onClick={clearHistory} className="text-[10px] text-error hover:text-error/80 uppercase font-bold tracking-widest transition-colors">Clear</button>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 hide-scrollbar">
                  {history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-30">
                      <span className="text-4xl mb-2">📄</span>
                      <p className="text-[10px] text-center font-bold uppercase tracking-widest">No entries</p>
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
                          <span className="text-[9px] font-bold uppercase tracking-tighter">{new Date(item.createdAt).toLocaleDateString()}</span>
                          <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">{item.correctionCount} fixes</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-[2rem] border border-primary/10">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Complexity</h4>
                    <span className="text-xs font-bold text-primary">Grade {readingGrade || '-'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(readingGrade / 12) * 100}%` }}
                      className="h-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                    />
                  </div>
                </div>

                <section>
                    <h3 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-3 ml-2">Linguistic Insights</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-4 bg-white/40 dark:bg-white/5 rounded-[2rem] border border-slate-200/50 dark:border-white/5 text-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tone</p>
                            <p className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase">{insights.tone}</p>
                        </div>
                        <div className="p-4 bg-white/40 dark:bg-white/5 rounded-[2rem] border border-slate-200/50 dark:border-white/5 text-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Mood</p>
                            <p className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase">{insights.sentiment}</p>
                        </div>
                    </div>
                </section>
                
                <div className="p-4 bg-correct/5 rounded-[2.5rem] border border-correct/10 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-correct animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                  <div>
                    <h4 className="text-[10px] font-extrabold text-correct uppercase tracking-widest">Cloud Sync</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Live Session Active</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 text-center">
                <a href="/creator" className="text-[9px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.3em]">
                  WordWise Intelligence ⚡
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scroll-smooth pb-64"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto">
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-28 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-[3rem] flex items-center justify-center text-5xl mb-10 shadow-[0_20px_50px_rgba(37,99,235,0.3)] border-4 border-white/10"
              >
                🖋️
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-tight">Your Writing, <br />Perfected.</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-sm mx-auto leading-relaxed font-medium">World-class AI at your service. Start typing to see the magic happen.</p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {["She go to the store.", "I has been hear.", "Their coming home."].map((ex, i) => (
                  <button key={i} onClick={() => setInputText(ex)} className="px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/5">
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage 
                key={msg.id} 
                message={msg} 
                isComparing={compareMode === msg.id}
                onCompare={() => setCompareMode(compareMode === msg.id ? null : msg.id)}
              />
            ))
          )}
          {isLoading && <LoadingBubble />}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-bg-base dark:from-[#0B1120] via-bg-base/95 dark:via-[#0B1120]/95 to-transparent z-20">
          <div className="max-w-4xl mx-auto relative group">
            <AnimatePresence>
              {inputText && (
                <div className="absolute -top-14 left-0 flex gap-2 w-full overflow-x-auto hide-scrollbar pb-2">
                   <div className="flex gap-2">
                        {['Professional', 'Creative', 'Simple'].map((style) => (
                            <motion.button
                                key={style}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => handleParaphrase(style.toLowerCase())}
                                className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-2xl text-[10px] font-black text-primary hover:bg-primary hover:text-white transition-all uppercase tracking-widest whitespace-nowrap shadow-xl"
                            >
                                {style}
                            </motion.button>
                        ))}
                   </div>
                   <div className="ml-auto flex gap-2">
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={exportToMarkdown}
                            className="px-4 py-2 bg-white dark:bg-[#131C2F] border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black text-primary hover:bg-primary/5 transition-all uppercase tracking-[0.2em] shadow-2xl"
                        >
                            Report
                        </motion.button>
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setInputText('')}
                            className="px-4 py-2 bg-white dark:bg-[#131C2F] border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black text-slate-400 hover:text-error transition-all uppercase tracking-[0.2em] shadow-2xl"
                        >
                            Reset
                        </motion.button>
                   </div>
                </div>
              )}
            </AnimatePresence>

            <div className="relative glass-card rounded-[3rem] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] transition-all group-focus-within:ring-4 ring-primary/10">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your content here..."
                className="w-full bg-transparent border-none focus:ring-0 p-5 md:p-8 pr-40 min-h-[160px] text-lg md:text-2xl font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400/40 resize-none leading-relaxed tracking-tight"
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              />
              <div className="absolute bottom-6 right-6 flex items-center gap-5">
                <span className={`text-[11px] font-black tracking-widest ${inputText.length > 1800 ? 'text-error' : 'text-slate-400/60'}`}>
                  {inputText.length} <span className="opacity-30">/</span> 2000
                </span>
                <MagneticButton
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="btn-primary flex items-center gap-3 group disabled:opacity-20 disabled:grayscale px-10 py-4"
                >
                  <span className="text-sm uppercase tracking-[0.2em]">Correct</span>
                  <span className="group-hover:translate-x-1.5 transition-transform text-lg">→</span>
                </MagneticButton>
              </div>
              <div className="absolute bottom-10 left-10 flex items-center gap-3 opacity-60">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-primary animate-ping' : 'bg-correct shadow-[0_0_8px_rgba(16,185,129,1)]'}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
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

const ChatMessage = ({ message, isComparing, onCompare }) => {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end pr-6">
        <div className="max-w-[75%] space-y-3">
          <div className="bg-primary text-white p-6 md:p-8 rounded-[3rem] rounded-tr-none shadow-2xl shadow-primary/20 border-b-4 border-primary-dark/30">
            <p className="text-lg md:text-xl font-semibold leading-relaxed tracking-tight">{message.text}</p>
          </div>
          <p className="text-[10px] font-black text-slate-400 text-right uppercase tracking-[0.2em] pr-4">{message.timestamp}</p>
        </div>
      </div>
    );
  }

  if (message.type === 'error') {
    return (
      <div className="flex justify-start pl-6">
        <div className="max-w-[80%] bg-error/5 border-2 border-error/20 p-8 rounded-[3rem] rounded-tl-none flex gap-6 items-center shadow-2xl shadow-error/5">
          <div className="w-16 h-16 rounded-3xl bg-error/10 flex items-center justify-center text-3xl border-2 border-error/10">⚠️</div>
          <div>
            <h4 className="text-base font-black text-error uppercase tracking-widest mb-1">AI Service Alert</h4>
            <p className="text-base text-slate-600 dark:text-slate-400 font-bold leading-relaxed">{message.text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start pl-6">
      <div className="max-w-[95%] space-y-6 w-full">
        <div className="flex items-center gap-4 ml-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-[1.2rem] flex items-center justify-center text-sm text-white font-black shadow-xl shadow-primary/20 border-2 border-white/10">W</div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">WordWise Intelligence</span>
            <div className="flex gap-2 items-center mt-1">
                <span className="bg-correct/10 text-correct text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-correct/20">Polished</span>
                <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-primary/20">{message.insights?.tone} Tone</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#131C2F] border-2 border-slate-200/40 dark:border-white/5 p-8 md:p-12 rounded-[3.5rem] rounded-tl-none shadow-[0_40px_100px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <AnimatePresence mode="wait">
            {isComparing ? (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
                >
                    <div className="space-y-4">
                        <span className="text-[10px] font-black text-error uppercase tracking-widest opacity-50">Original</span>
                        <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed italic">{message.original}</p>
                    </div>
                    <div className="hidden md:block w-px bg-slate-100 dark:bg-white/5" />
                    <div className="space-y-4">
                        <span className="text-[10px] font-black text-correct uppercase tracking-widest opacity-50">Corrected</span>
                        <p className="text-lg md:text-xl text-slate-800 dark:text-slate-100 font-bold leading-relaxed">{message.corrected}</p>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xl md:text-3xl text-slate-800 dark:text-slate-100 leading-[1.4] font-bold tracking-tight relative z-10"
                >
                    {renderCorrectedText(message.corrected, message.changes)}
                </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t-2 border-slate-100/50 dark:border-white/5 items-center relative z-10">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(message.corrected);
                toast.success("Copied to clipboard!", { icon: '✨' });
              }}
              className="flex items-center gap-3 text-[12px] font-black text-primary hover:text-primary-dark uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5"
            >
              <span>📋</span> Copy Result
            </button>
            <button 
              onClick={onCompare}
              className={`flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 ${isComparing ? 'text-correct' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span>🔁</span> {isComparing ? 'Exit Comparison' : 'Side-by-Side'}
            </button>
            <div className="ml-auto flex items-center gap-4">
                <div className="h-6 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {message.changes.length} Fixes Applied
                </span>
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
        <span className="bg-correct/15 text-correct-dark dark:text-correct px-2 py-0.5 rounded-xl border-b-4 border-correct/30 cursor-help transition-all group-hover:bg-correct/30 group-hover:scale-105 inline-block mx-0.5">
          {change.corrected}
        </span>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 px-5 py-4 bg-slate-900 text-white text-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all whitespace-normal min-w-[260px] z-50 pointer-events-none text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 scale-90 group-hover:scale-100 duration-300">
          <span className="block font-black text-correct mb-3 uppercase tracking-[0.2em] text-[10px]">Contextual Fix</span>
          <p className="font-medium leading-relaxed text-slate-300">{change.explanation}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-slate-900" />
        </span>
      </span>
    );
    lastIndex = change.end_index;
  });
  
  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result;
};

const LoadingBubble = () => (
  <div className="flex justify-start pl-6">
    <div className="bg-white/40 dark:bg-white/5 border-2 border-slate-200/40 dark:border-white/5 p-8 rounded-[3rem] rounded-tl-none flex items-center gap-6 shadow-xl">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
            className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          />
        ))}
      </div>
      <span className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Analyzing</span>
    </div>
  </div>
);

const Toggle = ({ label, enabled, setEnabled }) => (
  <div className="flex justify-between items-center group cursor-pointer" onClick={() => setEnabled(!enabled)}>
    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest group-hover:text-primary transition-colors">{label}</span>
    <button
      className={`relative w-12 h-7 rounded-full transition-all duration-500 ${enabled ? 'bg-primary shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-slate-200 dark:bg-white/10 shadow-inner'}`}
    >
      <motion.div
        animate={{ x: enabled ? 26 : 4, scale: enabled ? 1 : 0.8 }}
        className="absolute top-1 left-0 w-5 h-5 bg-white rounded-full shadow-2xl"
      />
    </button>
  </div>
);

export default Corrector;
