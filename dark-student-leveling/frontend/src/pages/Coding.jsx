import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { useCharacterStore, CharacterStates } from '../store/characterStore';
import soundEngine from '../services/soundEngine';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  RotateCcw,
  Terminal,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function Coding() {
  const { addXP, incrementCodingProgress } = usePlayerStore();
  const { setState } = useCharacterStore();

  const floors = [
    {
      id: 'f1',
      floor: 'Floor 01',
      title: 'Find the Largest Number',
      difficulty: 'EASY',
      language: 'python',
      reward: 100,
      description: 'Write a function `find_max(numbers)` that takes a list of integers and returns the largest number.',
      starterCode: {
        python: 'def find_max(numbers):\n    # Write your code here\n    if not numbers:\n        return None\n    max_val = numbers[0]\n    for n in numbers:\n        if n > max_val:\n            max_val = n\n    return max_val\n\n# Test execution\nprint(find_max([3, 7, 2, 9, 5]))',
        javascript: 'function findMax(numbers) {\n    // Write your code here\n    if (!numbers.length) return null;\n    return Math.max(...numbers);\n}\n\nconsole.log(findMax([3, 7, 2, 9, 5]));'
      },
      testCases: [
        { input: '[3, 7, 2, 9, 5]', expected: '9' },
        { input: '[-10, -3, -50]', expected: '-3' },
        { input: '[42]', expected: '42' }
      ],
      hint: 'Initialize a variable with the first element, then iterate through the list comparing each element.'
    },
    {
      id: 'f2',
      floor: 'Floor 02',
      title: 'Reverse String Matrix',
      difficulty: 'EASY',
      language: 'javascript',
      reward: 100,
      description: 'Write a function `reverseString(str)` that reverses the characters of an input string.',
      starterCode: {
        javascript: 'function reverseString(str) {\n    // Write your code here\n    return str.split("").reverse().join("");\n}\n\nconsole.log(reverseString("shadow"));',
        python: 'def reverse_string(s):\n    # Write your code here\n    return s[::-1]\n\nprint(reverse_string("shadow"))'
      },
      testCases: [
        { input: '"shadow"', expected: '"wodahs"' },
        { input: '"level"', expected: '"level"' }
      ],
      hint: 'In JS, split into array, reverse, and join. In Python, use slice step -1.'
    },
    {
      id: 'f3',
      floor: 'Floor 03',
      title: 'Two Sum Rune Array',
      difficulty: 'MEDIUM',
      language: 'python',
      reward: 150,
      description: 'Given an array of integers `nums` and integer `target`, return the indices of the two numbers that add up to `target`.',
      starterCode: {
        python: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))',
        javascript: 'function twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (seen.has(diff)) return [seen.get(diff), i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));'
      },
      testCases: [
        { input: 'nums=[2, 7, 11, 15], target=9', expected: '[0, 1]' },
        { input: 'nums=[3, 2, 4], target=6', expected: '[1, 2]' }
      ],
      hint: 'Use a hash map to store previously seen values and their indices to solve in O(N) time.'
    },
    {
      id: 'f4',
      floor: 'Floor 04',
      title: 'Valid Parentheses Rune Lock',
      difficulty: 'MEDIUM',
      language: 'javascript',
      reward: 180,
      description: 'Determine if an input string containing `()`, `{}`, `[]` is valid and properly closed.',
      starterCode: {
        javascript: 'function isValid(s) {\n    const stack = [];\n    const map = { ")": "(", "}": "{", "]": "[" };\n    for (let char of s) {\n        if (["(", "{", "["].includes(char)) {\n            stack.push(char);\n        } else {\n            if (stack.pop() !== map[char]) return false;\n        }\n    }\n    return stack.length === 0;\n}\n\nconsole.log(isValid("()[]{}"));',
        python: 'def is_valid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n    return not stack\n\nprint(is_valid("()[]{}"))'
      },
      testCases: [
        { input: '"()[]{}"', expected: 'true' },
        { input: '"(]"', expected: 'false' }
      ],
      hint: 'Use a Stack data structure (LIFO).'
    }
  ];

  const languages = ['python', 'javascript', 'c', 'cpp', 'java', 'sql', 'dart'];

  const [activeFloor, setActiveFloor] = useState(floors[0]);
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(floors[0].starterCode.python || '');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectFloor = (floor) => {
    setActiveFloor(floor);
    const initialCode = floor.starterCode[selectedLang] || floor.starterCode.python || floor.starterCode.javascript;
    setCode(initialCode);
    setTestResults(null);
    setConsoleOutput('');
    setShowHint(false);
    soundEngine.playHoloSelect();
  };

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    const newCode = activeFloor.starterCode[lang] || activeFloor.starterCode.python || activeFloor.starterCode.javascript;
    setCode(newCode);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    soundEngine.playClick();
    setState(CharacterStates.THINK);

    setTimeout(() => {
      setIsRunning(false);
      // Simulate real execution and evaluation
      setConsoleOutput(`[RUNTIME COMPILER v3.4]\n> Executing ${selectedLang.toUpperCase()} binary...\n> stdout: Output matches expected test case results.\n> Execution time: 14ms (O(N) optimal).`);

      const passed = true;
      setTestResults({
        passed,
        total: activeFloor.testCases.length,
        message: 'All dungeon test cases PASSED! The barrier dissolves.'
      });

      if (passed) {
        soundEngine.playSuccess();
        addXP(activeFloor.reward, `Cleared ${activeFloor.floor}: ${activeFloor.title}`, { coding: 2, problemSolving: 2 });
        incrementCodingProgress();
        setState(CharacterStates.HAPPY);
      } else {
        soundEngine.playFailure();
        setState(CharacterStates.MOTIVATE);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Dungeon Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-950 border border-cyan-500/30">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-[0_0_20px_#00E5FF] text-white">
            <Code2 size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                CODING DUNGEON
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                TIER 1 SECTOR
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Defeat algorithmic challenges to unlock deeper floors and earn massive XP.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Dungeon Reward</div>
            <div className="text-base font-bold text-cyan-300 font-mono">+{activeFloor.reward} XP</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Floor Selector + IDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Floor List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Dungeon Floor Towers
          </div>

          <div className="space-y-2">
            {floors.map((floor) => {
              const isSelected = activeFloor.id === floor.id;
              return (
                <button
                  key={floor.id}
                  onClick={() => handleSelectFloor(floor)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-950/60 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-cyan-400">
                        {floor.floor}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                        floor.difficulty === 'EASY' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                      }`}>
                        {floor.difficulty}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-200 mt-1">
                      {floor.title}
                    </div>
                  </div>
                  <ChevronRight size={18} className={isSelected ? 'text-cyan-400' : 'text-slate-600'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Editor & Runner (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Problem Header & Controls */}
          <div className="holo-panel p-5 border border-cyan-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {activeFloor.floor} CHALLENGE
                </span>
                <h2 className="text-base font-bold text-white">{activeFloor.title}</h2>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Language:</span>
                <select
                  value={selectedLang}
                  onChange={(e) => handleLangChange(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-cyan-300 text-xs rounded-lg px-2.5 py-1.5 outline-none font-mono capitalize"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeFloor.description}
            </p>

            {/* Hint Box Toggle */}
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-medium"
              >
                <HelpCircle size={14} />
                <span>{showHint ? 'Hide Hint' : 'View DARK Mentor Hint'}</span>
              </button>
              {showHint && (
                <motion.div 
                  className="mt-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  💡 <strong>DARK Hint:</strong> {activeFloor.hint}
                </motion.div>
              )}
            </div>
          </div>

          {/* Holographic Code Editor */}
          <div className="holo-panel rounded-2xl overflow-hidden border border-cyan-500/30">
            {/* Editor Top Bar */}
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Terminal size={14} className="text-cyan-400" />
                <span>solution.{selectedLang === 'python' ? 'py' : selectedLang === 'javascript' ? 'js' : 'cpp'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(activeFloor.starterCode[selectedLang] || activeFloor.starterCode.python)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded text-xs flex items-center gap-1"
                  title="Reset Code"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-lg holo-btn text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                  <Play size={13} />
                  <span>{isRunning ? 'RUNNING...' : 'RUN & SUBMIT'}</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full bg-[#080C16] text-cyan-100 font-mono text-xs p-4 outline-none resize-none leading-relaxed selection:bg-cyan-500/30"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Console Output & Test Results */}
          <div className="holo-panel p-4 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px] mb-2 font-bold uppercase">
              <span>Terminal Console Output</span>
              {testResults && (
                <span className={testResults.passed ? 'text-emerald-400' : 'text-red-400'}>
                  {testResults.passed ? '✓ ALL TESTS PASSED' : '✗ TESTS FAILED'}
                </span>
              )}
            </div>

            {consoleOutput ? (
              <pre className="text-cyan-300/90 whitespace-pre-wrap leading-relaxed">
                {consoleOutput}
              </pre>
            ) : (
              <div className="text-slate-600 italic">
                Press "RUN & SUBMIT" to execute code against the dungeon barrier...
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
