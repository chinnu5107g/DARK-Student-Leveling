import { create } from 'zustand';

export const CharacterStates = {
  IDLE: 'IDLE',
  WALK: 'WALK',
  RUN: 'RUN',
  JUMP: 'JUMP',
  TALK: 'TALK',
  THINK: 'THINK',
  HAPPY: 'HAPPY',
  SURPRISED: 'SURPRISED',
  EXCITED: 'EXCITED',
  MOTIVATE: 'MOTIVATE',
  LEVEL_UP: 'LEVEL_UP',
  RANK_UP: 'RANK_UP',
  FOLLOW: 'FOLLOW',
  COMBAT_SKILL: 'COMBAT_SKILL',
  CELEBRATE: 'CELEBRATE'
};

export const useCharacterStore = create((set, get) => ({
  currentState: CharacterStates.IDLE,
  targetPosition: [0, 0, 0],
  isLookingAtTarget: false,
  lookTarget: [0, 1.5, 5],
  energyLevel: 1.0, // 1.0 normal, 2.0 high energy mode
  speechText: "",
  isSpeaking: false,
  isThinking: false,

  setState: (state) => {
    set({ currentState: state });
  },

  triggerReaction: (state, duration = 3000) => {
    const prevState = get().currentState;
    set({ currentState: state });
    setTimeout(() => {
      // Revert to IDLE if still in reaction state
      if (get().currentState === state) {
        set({ currentState: CharacterStates.IDLE });
      }
    }, duration);
  },

  setSpeaking: (isSpeaking, speechText = "") => {
    set({ 
      isSpeaking, 
      speechText, 
      currentState: isSpeaking ? CharacterStates.TALK : CharacterStates.IDLE 
    });
  },

  setThinking: (isThinking) => {
    set({ 
      isThinking, 
      currentState: isThinking ? CharacterStates.THINK : CharacterStates.IDLE 
    });
  },

  setEnergyMode: (energyLevel) => set({ energyLevel }),
  setTargetPosition: (pos) => set({ targetPosition: pos }),
}));
