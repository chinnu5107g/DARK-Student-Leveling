import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, X, Code, Brain, BookOpen } from 'lucide-react';
import { useCharacterStore, CharacterStates } from '../../store/characterStore';
import soundEngine from '../../services/soundEngine';

export default function DarkAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'dark',
      text: "Welcome back, Player. What challenge shall we conquer today? Need hints for the Coding Dungeon, logic breakdown, or motivation?",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const { setState, setSpeaking, setThinking } = useCharacterStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      soundEngine.playHoloSelect();
    }
  }, [isOpen, messages]);

  // Speech Recognition (Voice Input)
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your message.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        soundEngine.playClick();
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        // Auto send voice input
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Text to Speech
  const speakText = (text) => {
    if (!ttsEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Calm, deliberate cadence
    utterance.pitch = 0.85; // Deep, confident tone

    utterance.onstart = () => {
      setSpeaking(true, text);
    };
    utterance.onend = () => {
      setSpeaking(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend = null) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    soundEngine.playClick();

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Trigger DARK Thinking Animation
    setThinking(true);

    // AI Response generation
    setTimeout(() => {
      setThinking(false);

      let reply = "";
      const lower = query.toLowerCase();

      if (lower.includes('code') || lower.includes('python') || lower.includes('javascript') || lower.includes('debug')) {
        reply = "In coding dungeons, always inspect time complexity first. Break your solution into: 1. Base cases, 2. State transitions, 3. Edge conditions. Check your pointer bounds and remember: optimal code is simple code.";
        setState(CharacterStates.TALK);
      } else if (lower.includes('aptitude') || lower.includes('logic') || lower.includes('math')) {
        reply = "For quantitative and logic trials, do not calculate blindly. Identify the invariant rule or ratio formula. In speed-time trials, remember relative speed is your greatest multiplier.";
        setState(CharacterStates.TALK);
      } else if (lower.includes('motivat') || lower.includes('tired') || lower.includes('fail') || lower.includes('give up')) {
        reply = "Failure isn't the end, Player. It's just uncollected XP. Every master started as an E-Rank. Stand back up, sharpen your blade, and let's clear this floor.";
        setState(CharacterStates.MOTIVATE);
      } else if (lower.includes('quiz') || lower.includes('library') || lower.includes('dsa') || lower.includes('os')) {
        reply = "I recommend revising Deadlock Prevention and B-Tree indexing in the Knowledge Library today. Those topics frequently appear in S-Rank interview trials.";
        setState(CharacterStates.TALK);
      } else {
        reply = `Acknowledged. I have analyzed your query regarding "${query}". Focus on deliberate practice. Each challenge cleared brings you closer to S-Rank. Let's solve this together.`;
        setState(CharacterStates.TALK);
      }

      const darkMsg = {
        id: Date.now() + 1,
        sender: 'dark',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, darkMsg]);
      speakText(reply);
    }, 1200);
  };

  const quickPrompts = [
    "Give me study motivation",
    "Explain Python decorators",
    "Hints for Dungeon Floor 01",
    "Quick Aptitude tips"
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end sm:p-6 bg-black/60 backdrop-blur-sm">
        <motion.div
          className="w-full sm:max-w-md h-full sm:h-[620px] holo-panel flex flex-col border border-cyan-400/80 shadow-[0_0_40px_rgba(0,229,255,0.3)] rounded-none sm:rounded-2xl overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-700 to-cyan-400 p-0.5 shadow-[0_0_15px_#00E5FF] flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white tracking-wide">DARK</h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-400/40 font-mono">
                    AI MENTOR
                  </span>
                </div>
                <div className="text-[10px] text-cyan-400/80 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  VOICE & NEURAL LINK ACTIVE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTtsEnabled(!ttsEnabled)}
                className={`p-1.5 rounded-lg border transition ${
                  ttsEnabled 
                    ? 'text-cyan-400 border-cyan-400/40 bg-cyan-950/50' 
                    : 'text-slate-500 border-slate-700 bg-slate-900'
                }`}
                title={ttsEnabled ? "DARK Voice Speech ON" : "DARK Voice Muted"}
              >
                {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600/80 text-white border border-blue-400/50 shadow-md'
                      : 'holo-panel-cyan text-slate-100 border border-cyan-500/40'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-4 py-2 border-t border-slate-900 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-slate-900 border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-950/90 border-t border-cyan-500/30 flex items-center gap-2">
            <button
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-xl border transition ${
                isListening
                  ? 'bg-red-600/80 text-white border-red-400 animate-pulse shadow-[0_0_15px_#EF4444]'
                  : 'bg-slate-900 text-cyan-400 border-cyan-500/30 hover:border-cyan-400'
              }`}
              title="Voice Input (Microphone)"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask DARK for coding help, logic, hints..."
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition"
            />

            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white transition shadow-[0_0_12px_rgba(0,229,255,0.4)]"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
