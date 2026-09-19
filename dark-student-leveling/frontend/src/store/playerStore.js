import { create } from 'zustand';
import soundEngine from '../services/soundEngine';
import { useCharacterStore, CharacterStates } from './characterStore';
import confetti from 'canvas-confetti';

export const calculateRank = (xp) => {
  if (xp >= 10000) return { rank: 'S', name: 'Shadow Sovereign', min: 10000, next: 20000, color: '#FFD700', badgeColor: 'from-amber-500 to-yellow-300' };
  if (xp >= 6001) return { rank: 'A', name: 'Grandmaster Mage', min: 6001, next: 10000, color: '#8B5CF6', badgeColor: 'from-purple-600 to-indigo-400' };
  if (xp >= 3001) return { rank: 'B', name: 'Elite Vanguard', min: 3001, next: 6000, color: '#3862F6', badgeColor: 'from-blue-600 to-cyan-400' };
  if (xp >= 1501) return { rank: 'C', name: 'Ascendant Seeker', min: 1501, next: 3000, color: '#00E5FF', badgeColor: 'from-cyan-600 to-teal-400' };
  if (xp >= 501) return { rank: 'D', name: 'Novice Adept', min: 501, next: 1500, color: '#10B981', badgeColor: 'from-emerald-600 to-green-400' };
  return { rank: 'E', name: 'Initiate Scholar', min: 0, next: 500, color: '#94A3B8', badgeColor: 'from-slate-600 to-gray-400' };
};

export const calculateLevel = (totalXp) => {
  // Each level requires 500 + level * 150 XP
  // Level 12 = ~4200 XP total, current level progress 820/1200
  let level = 1;
  let remainingXp = totalXp;
  let xpForNext = 500;

  while (remainingXp >= xpForNext) {
    remainingXp -= xpForNext;
    level++;
    xpForNext = 500 + (level - 1) * 100;
  }

  return {
    level,
    currentLevelXp: remainingXp,
    xpForNextLevel: xpForNext
  };
};

export const usePlayerStore = create((set, get) => ({
  user: {
    id: 'usr_001',
    name: 'Player One',
    title: 'Code Monarch Candidate',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    email: 'player@darkacademy.edu',
    role: 'student'
  },
  totalXp: 4820,
  level: 12,
  currentLevelXp: 820,
  xpForNextLevel: 1200,
  rankInfo: calculateRank(4820),
  
  // RPG Stats
  stats: {
    intelligence: 78,
    coding: 65,
    logic: 82,
    knowledge: 71,
    problemSolving: 76
  },
  
  streak: 7,
  completedQuestsCount: 18,
  solvedProblemsCount: 24,
  answeredAptitudeCount: 85,
  
  // Notification states
  activeNotification: null,
  showLevelUpModal: false,
  showRankUpModal: false,
  unlockedLevel: 12,
  unlockedRank: 'B',

  // Daily Quests list
  quests: [
    { id: 'q1', title: 'Solve 5 coding problems in Dungeon', category: 'Coding', xp: 100, progress: 3, total: 5, completed: false },
    { id: 'q2', title: 'Complete 20 aptitude questions', category: 'Aptitude', xp: 75, progress: 14, total: 20, completed: false },
    { id: 'q3', title: 'Study DSA module for 30 minutes', category: 'Library', xp: 50, progress: 30, total: 30, completed: true },
    { id: 'q4', title: 'Complete today\'s algorithm assignment', category: 'Assignment', xp: 100, progress: 1, total: 1, completed: true },
    { id: 'q5', title: 'Maintain study streak & check-in', category: 'Streak', xp: 50, progress: 1, total: 1, completed: true },
  ],

  // Add XP with animation & sound
  addXP: (amount, reason = 'Challenge Solved', statBoost = null) => {
    const prevTotal = get().totalXp;
    const newTotal = prevTotal + amount;
    const prevLevel = get().level;
    const prevRank = get().rankInfo.rank;

    const { level, currentLevelXp, xpForNextLevel } = calculateLevel(newTotal);
    const newRankInfo = calculateRank(newTotal);

    // Apply stat boosts if any
    const newStats = { ...get().stats };
    if (statBoost) {
      Object.keys(statBoost).forEach(key => {
        if (newStats[key] !== undefined) {
          newStats[key] = Math.min(100, newStats[key] + statBoost[key]);
        }
      });
    }

    set({
      totalXp: newTotal,
      level,
      currentLevelXp,
      xpForNextLevel,
      rankInfo: newRankInfo,
      stats: newStats,
      activeNotification: {
        id: Date.now(),
        message: `+${amount} XP Earned!`,
        detail: reason,
        type: 'xp'
      }
    });

    // Sound FX
    soundEngine.playXP();

    // Check for level up
    if (level > prevLevel) {
      setTimeout(() => {
        get().triggerLevelUp(level);
      }, 500);
    } else if (newRankInfo.rank !== prevRank) {
      setTimeout(() => {
        get().triggerRankUp(newRankInfo);
      }, 600);
    } else {
      useCharacterStore.getState().triggerReaction(CharacterStates.HAPPY, 2500);
    }
  },

  triggerLevelUp: (newLevel) => {
    set({
      showLevelUpModal: true,
      unlockedLevel: newLevel
    });
    soundEngine.playLevelUp();
    useCharacterStore.getState().triggerReaction(CharacterStates.LEVEL_UP, 4500);

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00E5FF', '#3862F6', '#8B5CF6', '#FFFFFF']
    });
  },

  triggerRankUp: (newRank) => {
    set({
      showRankUpModal: true,
      unlockedRank: newRank.rank
    });
    soundEngine.playRankUp();
    useCharacterStore.getState().triggerReaction(CharacterStates.RANK_UP, 5000);

    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#8B5CF6', '#3862F6', '#00E5FF', '#FFD700']
    });
  },

  closeLevelUpModal: () => set({ showLevelUpModal: false }),
  closeRankUpModal: () => set({ showRankUpModal: false }),
  clearNotification: () => set({ activeNotification: null }),

  // Complete a quest
  completeQuest: (questId) => {
    const quests = get().quests.map(q => {
      if (q.id === questId && !q.completed) {
        get().addXP(q.xp, `Quest Completed: ${q.title}`);
        soundEngine.playQuestComplete();
        return { ...q, completed: true, progress: q.total };
      }
      return q;
    });

    const completedCount = quests.filter(q => q.completed).length;
    set({ 
      quests, 
      completedQuestsCount: get().completedQuestsCount + 1 
    });

    // If all 5 completed, award huge daily bonus
    if (completedCount === quests.length) {
      setTimeout(() => {
        get().addXP(250, 'All Daily Quests Cleared! Bonus XP Awarded');
        soundEngine.playQuestComplete();
      }, 1000);
    }
  },

  incrementCodingProgress: () => {
    set(state => ({
      solvedProblemsCount: state.solvedProblemsCount + 1,
      stats: {
        ...state.stats,
        coding: Math.min(100, state.stats.coding + 1),
        problemSolving: Math.min(100, state.stats.problemSolving + 1)
      }
    }));
  },

  incrementAptitudeProgress: () => {
    set(state => ({
      answeredAptitudeCount: state.answeredAptitudeCount + 1,
      stats: {
        ...state.stats,
        logic: Math.min(100, state.stats.logic + 1),
        intelligence: Math.min(100, state.stats.intelligence + 1)
      }
    }));
  }
}));
