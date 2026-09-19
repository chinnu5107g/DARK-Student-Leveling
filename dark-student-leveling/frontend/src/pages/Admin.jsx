import React, { useState } from 'react';
import soundEngine from '../services/soundEngine';
import { 
  ShieldCheck, 
  Code2, 
  BrainCircuit, 
  BookOpen, 
  CheckSquare, 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle,
  BarChart3
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('coding');
  const [statusMessage, setStatusMessage] = useState('');

  // Form states
  const [newProblem, setNewProblem] = useState({
    title: '',
    floor: 'Floor 05',
    difficulty: 'MEDIUM',
    language: 'python',
    reward: 150,
    description: ''
  });

  const [newQuestion, setNewQuestion] = useState({
    category: 'Quantitative Aptitude',
    topic: 'Probability',
    question: '',
    correctAnswer: '',
    options: ['', '', '', '']
  });

  const handleAddProblem = (e) => {
    e.preventDefault();
    if (!newProblem.title) return;
    soundEngine.playSuccess();
    setStatusMessage(`Successfully deployed coding challenge: "${newProblem.title}" into Dungeon!`);
    setNewProblem({
      title: '',
      floor: 'Floor 05',
      difficulty: 'MEDIUM',
      language: 'python',
      reward: 150,
      description: ''
    });
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question) return;
    soundEngine.playSuccess();
    setStatusMessage(`Successfully registered aptitude duel question into Arena!`);
    setNewQuestion({
      category: 'Quantitative Aptitude',
      topic: 'Probability',
      question: '',
      correctAnswer: '',
      options: ['', '', '', '']
    });
    setTimeout(() => setStatusMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-6">
      
      {/* Admin Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-700 to-amber-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                ADMINISTRATION NEXUS
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 font-mono font-bold">
                ROOT PRIVILEGES
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Deploy coding dungeons, create aptitude arena trials, upload notes, and oversee student telemetries.
            </p>
          </div>
        </div>

        {/* Global Stats Snapshot */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="text-slate-400">Total Students</div>
            <div className="text-white font-bold">1,248 Active</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="text-slate-400">Dungeon Clears</div>
            <div className="text-cyan-400 font-bold">9,420 Solved</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => { soundEngine.playClick(); setActiveTab('coding'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'coding' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Code2 size={15} />
          <span>Coding Dungeon Creator</span>
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setActiveTab('aptitude'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'aptitude' ? 'bg-purple-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BrainCircuit size={15} />
          <span>Aptitude Arena Creator</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-400/50 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle size={16} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tab 1: Coding Problem Creator */}
      {activeTab === 'coding' && (
        <div className="holo-panel p-6 border border-cyan-500/30">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Plus size={16} className="text-cyan-400" />
            Deploy New Dungeon Floor
          </h2>

          <form onSubmit={handleAddProblem} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Floor Designation
                </label>
                <input
                  type="text"
                  value={newProblem.floor}
                  onChange={(e) => setNewProblem({ ...newProblem, floor: e.target.value })}
                  placeholder="e.g. Floor 05"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Problem Title
                </label>
                <input
                  type="text"
                  value={newProblem.title}
                  onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                  placeholder="e.g. Merge K Sorted Lists"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  XP Reward
                </label>
                <input
                  type="number"
                  value={newProblem.reward}
                  onChange={(e) => setNewProblem({ ...newProblem, reward: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Problem Description & Constraints
              </label>
              <textarea
                value={newProblem.description}
                onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                rows={4}
                placeholder="Detail the algorithm specifications and input formats..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg holo-btn text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              DEPLOY TO CODING DUNGEON
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Aptitude Question Creator */}
      {activeTab === 'aptitude' && (
        <div className="holo-panel p-6 border border-purple-500/30">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Plus size={16} className="text-purple-400" />
            Register Arena Duel Question
          </h2>

          <form onSubmit={handleAddQuestion} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Category
                </label>
                <select
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-purple-300"
                >
                  <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                  <option value="Verbal Ability">Verbal Ability</option>
                  <option value="Data Interpretation">Data Interpretation</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Sub-Topic
                </label>
                <input
                  type="text"
                  value={newQuestion.topic}
                  onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                  placeholder="e.g. Permutations & Combinations"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Question Text
              </label>
              <textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                rows={3}
                placeholder="Type the multiple-choice question..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-md"
            >
              REGISTER ARENA TRIAL
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
