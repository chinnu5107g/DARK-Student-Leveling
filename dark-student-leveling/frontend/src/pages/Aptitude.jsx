import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  BrainCircuit, 
  Clock, 
  Flame, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Zap,
  Award
} from 'lucide-react';

export default function Aptitude() {
  const { addXP, incrementAptitudeProgress } = usePlayerStore();
  const { setState } = useCharacterStore();

  const questions = [
    {
      id: 1,
      category: 'Quantitative Aptitude',
      topic: 'Time and Work',
      difficulty: 'Intermediate',
      question: 'A can complete a project in 12 days, and B can complete the same project in 18 days. If they work together for 4 days, what fraction of the project remains?',
      options: ['1/3', '4/9', '7/18', '5/9'],
      correctIndex: 1,
      explanation: 'A\'s 1 day work = 1/12, B\'s 1 day work = 1/18. Together in 1 day = 1/12 + 1/18 = 5/36. In 4 days work done = 4 * (5/36) = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9.'
    },
    {
      id: 2,
      category: 'Logical Reasoning',
      topic: 'Number Systems & Series',
      difficulty: 'Beginner',
      question: 'Identify the missing number in the rune sequence: 4, 9, 25, 49, 121, ?',
      options: ['144', '169', '196', '225'],
      correctIndex: 1,
      explanation: 'The sequence consists of squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, next prime is 13, so 13^2 = 169.'
    },
    {
      id: 3,
      category: 'Quantitative Aptitude',
      topic: 'Time, Speed & Distance',
      difficulty: 'Intermediate',
      question: 'A train 150 meters long passes a telegraph post in 10 seconds. Find the speed of the train in km/h.',
      options: ['48 km/h', '54 km/h', '60 km/h', '64 km/h'],
      correctIndex: 1,
      explanation: 'Speed = Distance / Time = 150m / 10s = 15 m/s. Convert to km/h by multiplying with (18/5): 15 * (18/5) = 54 km/h.'
    },
    {
      id: 4,
      category: 'Coding Reasoning',
      topic: 'Algorithm Analysis',
      difficulty: 'Advanced',
      question: 'What is the worst-case time complexity of finding an element in a balanced Binary Search Tree (AVL/Red-Black)?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correctIndex: 1,
      explanation: 'In a strictly balanced BST (like AVL or Red-Black tree), the maximum height is tightly bounded by O(log N), guaranteeing O(log N) worst-case lookup.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (isAnswered) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnswered]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    setSelectedAnswer(-1);
    setStreakCount(0);
    soundEngine.playFailure();
    setState(CharacterStates.MOTIVATE);
  };

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      soundEngine.playSuccess();
      const bonus = newStreak > 2 ? 10 : 0;
      addXP(25 + bonus, `Arena Trial Cleared (Streak x${newStreak})`, { logic: 2, intelligence: 1 });
      incrementAptitudeProgress();
      setState(CharacterStates.HAPPY);
    } else {
      setStreakCount(0);
      soundEngine.playFailure();
      setState(CharacterStates.MOTIVATE);
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      // Completed arena round
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-6">
      
      {/* Arena Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-500 shadow-[0_0_20px_#8B5CF6] text-white">
            <BrainCircuit size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                APTITUDE ARENA TRIALS
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 font-mono font-bold">
                SPEED DUEL
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Defeat timed quantitative and logical problems to sharpen your intellect.
            </p>
          </div>
        </div>

        {/* Realtime Streak & Timer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-orange-500/30 text-orange-400 font-mono text-sm font-bold shadow-sm">
            <Flame size={16} className="animate-pulse" />
            <span>x{streakCount} STREAK</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-sm font-bold shadow-sm">
            <Clock size={16} />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Arena Battle Card */}
      <div className="holo-panel p-6 sm:p-8 border border-purple-500/30 space-y-6">
        
        {/* Category & Progress Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
          <span className="text-purple-400 font-bold uppercase tracking-wider">
            {currentQ.category} • {currentQ.topic}
          </span>
          <span className="text-slate-400">
            TRIAL {currentIndex + 1} OF {questions.length}
          </span>
        </div>

        {/* Question Statement */}
        <div className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
          {currentQ.question}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let optionStyle = "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-purple-400 hover:text-white";

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                optionStyle = "bg-emerald-950/50 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
              } else if (idx === selectedAnswer) {
                optionStyle = "bg-red-950/50 border-red-400 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
              } else {
                optionStyle = "bg-slate-950/40 border-slate-800/40 text-slate-600";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-xl text-left border text-sm font-medium transition-all flex items-center justify-between ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center text-xs font-bold font-mono">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && idx === currentQ.correctIndex && (
                  <CheckCircle size={18} className="text-emerald-400" />
                )}
                {isAnswered && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                  <XCircle size={18} className="text-red-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Step */}
        {isAnswered && (
          <motion.div
            className="pt-4 border-t border-slate-800 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/20 text-xs leading-relaxed">
              <span className="font-bold text-purple-400 uppercase tracking-wider block mb-1">
                Logic Breakdown & Solution:
              </span>
              <p className="text-slate-300">{currentQ.explanation}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl holo-btn text-xs font-bold flex items-center gap-2"
              >
                <span>NEXT TRIAL</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
}
