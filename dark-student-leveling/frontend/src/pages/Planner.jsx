import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import soundEngine from '../services/soundEngine';
import { 
  CalendarDays, 
  Clock, 
  Plus, 
  CheckCircle, 
  Circle, 
  Sparkles, 
  Trash2, 
  Calendar,
  Zap,
  Target
} from 'lucide-react';

export default function Planner() {
  const { addXP } = usePlayerStore();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review System Design Microservices Architecture', day: 'Today', time: '14:00 - 15:30', completed: true, xp: 50 },
    { id: 2, title: 'Practice 3 Dynamic Programming problems on LeetCode', day: 'Today', time: '16:00 - 17:30', completed: false, xp: 75 },
    { id: 3, title: 'Complete Computer Networks Mock Test #2', day: 'Tomorrow', time: '10:00 - 11:30', completed: false, xp: 60 },
    { id: 4, title: 'Read Machine Learning Backpropagation Notes', day: 'This Week', time: 'Weekend', completed: false, xp: 40 },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDay, setNewTaskDay] = useState('Today');
  const [newTaskXP, setNewTaskXP] = useState(50);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    soundEngine.playClick();
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      day: newTaskDay,
      time: 'Custom Study Block',
      completed: false,
      xp: Number(newTaskXP) || 50
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const handleToggleTask = (task) => {
    soundEngine.playClick();
    if (!task.completed) {
      soundEngine.playSuccess();
      addXP(task.xp, `Custom Study Goal Cleared: ${task.title}`);
    }
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id) => {
    soundEngine.playClick();
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Planner Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-[0_0_20px_#3862F6] text-white">
            <CalendarDays size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                STUDY PLANNER & TIMELINE
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                STRATEGY MATRIX
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Set custom study targets, track your calendar routines, and earn scheduled XP.
            </p>
          </div>
        </div>

        {/* Exam Countdown Card */}
        <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-cyan-500/30">
          <Clock size={20} className="text-cyan-400 animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400">Exam Countdown</div>
            <div className="text-sm font-bold font-mono text-cyan-300">18 DAYS REMAINING</div>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Task Form + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Create Custom Quest Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="holo-panel p-5 border border-cyan-500/30">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus size={16} className="text-cyan-400" />
              Forge Custom Study Quest
            </h2>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Quest Objective
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Master React Three Fiber shaders"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Timeline
                  </label>
                  <select
                    value={newTaskDay}
                    onChange={(e) => setNewTaskDay(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300 outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Week">This Week</option>
                    <option value="Monthly Goal">Monthly Goal</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    XP Bounty
                  </label>
                  <input
                    type="number"
                    value={newTaskXP}
                    onChange={(e) => setNewTaskXP(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-cyan-400 font-mono outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg holo-btn text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.4)]"
              >
                DEPLOY STUDY QUEST
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Scheduled Study Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Active Study Operations
          </div>

          <div className="space-y-2.5">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`holo-panel p-4 border transition-all flex items-center justify-between gap-3 ${
                  task.completed
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleTask(task)}
                    className="text-slate-500 hover:text-cyan-400 transition"
                  >
                    {task.completed ? (
                      <CheckCircle size={20} className="text-cyan-400" />
                    ) : (
                      <Circle size={20} className="text-slate-600" />
                    )}
                  </button>

                  <div>
                    <div className={`text-xs font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {task.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                      <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                        {task.day}
                      </span>
                      <span>{task.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono text-cyan-300">
                    +{task.xp} XP
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 text-slate-600 hover:text-red-400 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
