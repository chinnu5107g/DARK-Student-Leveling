import React, { useState, useRef, useEffect } from 'react';
import AcademyWorld from '../components/3d/AcademyWorld';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Code2, 
  BrainCircuit, 
  Flame,
  MessageSquareQuote,
  Lightbulb
} from 'lucide-react';

export default function DarkAI() {
  const { currentState, setState, setSpeaking, setThinking, isSpeaking } = useCharacterStore();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'dark',
      text: "Greetings, Player. You have entered the AI Sanctum. I am DARK, your personal AI student companion. Let's analyze your code, break down aptitude logic, or construct a personalized study regimen.",
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition (Voice Input)
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Please type your message.");
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
        handleSend(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Text-to-Speech
  const speakText = (text) => {
    if (!ttsEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 0.85;

    utterance.onstart = () => setSpeaking(true, text);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    soundEngine.playClick();

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setThinking(true);

    setTimeout(() => {
      setThinking(false);

      let reply = "";
      const lower = query.toLowerCase();

      if (lower.includes('python') || lower.includes('code') || lower.includes('algorithm')) {
        reply = "When tackling algorithmic challenges, always establish your invariant and verify edge cases first. For recursion, strictly define the base case before expanding state transitions.";
        setState(CharacterStates.TALK);
      } else if (lower.includes('motivat') || lower.includes('tired') || lower.includes('hard')) {
        reply = "Don't just study... Level up. Every barrier in front of you is simply an opportunity to harvest XP. I will stand with you until we reach S-Rank.";
        setState(CharacterStates.MOTIVATE);
      } else if (lower.includes('dsa') || lower.includes('tree') || lower.includes('graph')) {
        reply = "In graphs, remember: BFS finds the shortest path on unweighted graphs, while Dijkstra handles non-negative weighted edges. Check for cycles using visited sets.";
        setState(CharacterStates.TALK);
      } else {
        reply = `I have processed your query regarding "${query}". Focus on deliberate practice. Each concept understood expands your intellect attribute. Let's solve this together.`;
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

  const expressions = [
    { label: 'Normal', state: CharacterStates.IDLE },
    { label: 'Happy', state: CharacterStates.HAPPY },
    { label: 'Thinking', state: CharacterStates.THINK },
    { label: 'Talking', state: CharacterStates.TALK },
    { label: 'Motivate', state: CharacterStates.MOTIVATE },
    { label: 'Level Up', state: CharacterStates.LEVEL_UP },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05070D] pt-14">
      {/* 3D Scene in AI Chamber */}
      <div className="absolute inset-0">
        <AcademyWorld
          cameraMode="character"
          showDark={true}
          showCompanion={true}
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#05070D] via-transparent to-[#05070D]/80" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-[#05070D]/90" />

      {/* Left Bottom Floating Character Sheet Card */}
      <div className="absolute bottom-6 left-6 z-20 max-w-sm holo-panel p-5 border border-cyan-500/30 hidden md:block">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            DARK • CHARACTER SHEET
          </h2>
        </div>
        <div className="space-y-1 text-xs text-slate-300">
          <p><strong className="text-white">Role:</strong> AI Student Companion</p>
          <p><strong className="text-white">Appearance:</strong> ~18-20 yrs, 180cm, athletic</p>
          <p><strong className="text-white">Voice:</strong> Deep, calm, confident</p>
          <p className="italic text-cyan-300/90 pt-1">"Don't just study... Level up."</p>
        </div>

        {/* Live Animation Trigger */}
        <div className="mt-3 pt-3 border-t border-slate-800">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Live Animation Trigger:</div>
          <div className="grid grid-cols-3 gap-1">
            {expressions.map(exp => (
              <button
                key={exp.label}
                onClick={() => {
                  soundEngine.playClick();
                  setState(exp.state);
                }}
                className="px-2 py-1 text-[10px] font-bold rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white"
              >
                {exp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Holographic AI Chat Terminal */}
      <div className="absolute top-18 bottom-6 right-4 sm:right-8 z-20 w-full max-w-md">
        <div className="h-full holo-panel flex flex-col border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(0,229,255,0.3)] rounded-2xl overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-700 to-cyan-400 p-0.5 shadow-[0_0_15px_#00E5FF] flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white">DARK AI SANCTUM</h2>
                <span className="text-[10px] text-cyan-400 font-mono">Neural Interface Online</span>
              </div>
            </div>

            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`p-2 rounded-lg border transition ${
                ttsEnabled ? 'text-cyan-400 border-cyan-400/40 bg-cyan-950/50' : 'text-slate-500 border-slate-700'
              }`}
              title={ttsEnabled ? "Text-to-Speech ON" : "Text-to-Speech OFF"}
            >
              {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'holo-panel-cyan text-slate-100'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-950/90 border-t border-cyan-500/30 flex items-center gap-2">
            <button
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-xl border transition ${
                isListening
                  ? 'bg-red-600 text-white border-red-400 animate-pulse'
                  : 'bg-slate-900 text-cyan-400 border-cyan-500/30'
              }`}
              title="Voice Input (Microphone)"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask DARK anything..."
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition"
            />

            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-md"
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
