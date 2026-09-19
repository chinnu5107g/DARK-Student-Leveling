import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Sparkles,
  PlayCircle
} from 'lucide-react';

export default function Library() {
  const { addXP } = usePlayerStore();
  const { setState } = useCharacterStore();

  const subjects = [
    'All',
    'Data Structures',
    'Operating Systems',
    'DBMS',
    'Computer Networks',
    'Algorithms',
    'AI / ML'
  ];

  const initialNotes = [
    {
      id: 'dsa_1',
      subject: 'Data Structures',
      title: 'B-Trees and B+ Trees Indexing in Modern Systems',
      readTime: '8 min read',
      xpReward: 50,
      summary: 'Comprehensive analysis of self-balancing multiway search trees. Disk page caching, logarithmic branch factors, and range scan advantages in databases.',
      keyPoints: [
        'Each node contains up to M children and M-1 keys',
        'B+ Trees store all real record pointers only at leaf nodes linked sequentially',
        'Guaranteed O(log_B N) search, insert, and delete disk I/O operations'
      ],
      bookmarked: true,
      completed: true
    },
    {
      id: 'os_1',
      subject: 'Operating Systems',
      title: 'Deadlock Detection & Prevention (Banker\'s Algorithm)',
      readTime: '10 min read',
      xpReward: 50,
      summary: 'The 4 necessary Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Banker\'s algorithm state matrix.',
      keyPoints: [
        'Safe state vs. Unsafe state transitions',
        'Resource-allocation graphs and cycle detection algorithms',
        'Resource hierarchy lock ordering to eliminate circular wait'
      ],
      bookmarked: false,
      completed: false
    },
    {
      id: 'dbms_1',
      subject: 'DBMS',
      title: 'ACID Properties and Multi-Version Concurrency (MVCC)',
      readTime: '12 min read',
      xpReward: 50,
      summary: 'Atomicity, Consistency, Isolation levels (Read Committed, Repeatable Read, Serializable) and snapshot isolation via MVCC rollbacks.',
      keyPoints: [
        'Two-Phase Locking (2PL) strict vs. rigorous protocol',
        'Write-Ahead Logging (WAL) and the ARIES recovery algorithm',
        'Handling Phantom Reads with Next-Key locking'
      ],
      bookmarked: false,
      completed: false
    },
    {
      id: 'cn_1',
      subject: 'Computer Networks',
      title: 'TCP 3-Way Handshake & Congestion Control Dynamics',
      readTime: '9 min read',
      xpReward: 50,
      summary: 'SYN, SYN-ACK, ACK packet lifecycle, TCP Tahoe vs. Reno, Slow Start, Congestion Avoidance, and Fast Retransmit.',
      keyPoints: [
        'Sequence and acknowledgment number alignment',
        'Additive Increase / Multiplicative Decrease (AIMD) equilibrium',
        'TCP sliding window flow control vs. network congestion window'
      ],
      bookmarked: true,
      completed: false
    }
  ];

  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notesList, setNotesList] = useState(initialNotes);
  const [activeReadingModal, setActiveReadingModal] = useState(null);

  const filteredNotes = notesList.filter(note => {
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleToggleBookmark = (id) => {
    soundEngine.playClick();
    setNotesList(prev => prev.map(n => n.id === id ? { ...n, bookmarked: !n.bookmarked } : n));
  };

  const handleCompleteLesson = (note) => {
    soundEngine.playSuccess();
    addXP(note.xpReward, `Finished Lesson: ${note.title}`, { knowledge: 2, intelligence: 1 });
    setState(CharacterStates.HAPPY);
    setNotesList(prev => prev.map(n => n.id === note.id ? { ...n, completed: true } : n));
    setActiveReadingModal(null);
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Library Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-[0_0_20px_#3862F6] text-white">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                KNOWLEDGE LIBRARY DOME
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-cyan-500/30 font-mono font-bold">
                HIGH-YIELD REPOSITORIES
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Access curated high-yield notes, system design guides, and core engineering concepts.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, protocols..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-cyan-400 text-xs text-white placeholder-slate-500 outline-none transition"
          />
        </div>
      </div>

      {/* Subject Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => {
              soundEngine.playClick();
              setSelectedSubject(subject);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
              selectedSubject === subject
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="holo-panel p-6 border border-blue-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-cyan-400 border border-cyan-500/30 uppercase font-bold">
                  {note.subject}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">{note.readTime}</span>
                  <button
                    onClick={() => handleToggleBookmark(note.id)}
                    className="p-1 text-slate-400 hover:text-cyan-400 transition"
                  >
                    {note.bookmarked ? <BookmarkCheck size={16} className="text-cyan-400" /> : <Bookmark size={16} />}
                  </button>
                </div>
              </div>

              <h2 className="text-base font-bold text-white mb-2">{note.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {note.summary}
              </p>

              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Core Mastery Points:</span>
                {note.keyPoints.map((pt, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-300">
                +{note.xpReward} XP
              </span>

              <button
                onClick={() => handleCompleteLesson(note)}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  note.completed
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                    : 'holo-btn'
                }`}
              >
                {note.completed ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span>LESSON MASTERED</span>
                  </>
                ) : (
                  <>
                    <PlayCircle size={14} />
                    <span>COMPLETE STUDY (+50 XP)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
