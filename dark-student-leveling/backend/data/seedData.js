// DARK Academy Seed Database
module.exports = {
  users: [
    {
      id: 'usr_001',
      name: 'Player One',
      email: 'player@darkacademy.edu',
      role: 'student',
      title: 'Code Monarch Candidate',
      level: 12,
      xp: 4820,
      rank: 'B',
      streak: 7,
      stats: {
        intelligence: 78,
        coding: 65,
        logic: 82,
        knowledge: 71,
        problemSolving: 76
      }
    }
  ],
  codingProblems: [
    {
      id: 'cp_1',
      floor: 'Floor 01',
      title: 'Find the Largest Number',
      difficulty: 'EASY',
      language: 'python',
      reward: 100,
      description: 'Write a program to find the largest number in an array.',
      testCases: [
        { input: '[3, 7, 2, 9, 5]', expected: '9' },
        { input: '[-10, -3, -50]', expected: '-3' }
      ]
    },
    {
      id: 'cp_2',
      floor: 'Floor 02',
      title: 'Reverse String Matrix',
      difficulty: 'EASY',
      language: 'javascript',
      reward: 100,
      description: 'Write a function that reverses an input string.',
      testCases: [
        { input: '"shadow"', expected: '"wodahs"' }
      ]
    },
    {
      id: 'cp_3',
      floor: 'Floor 03',
      title: 'Two Sum Rune Array',
      difficulty: 'MEDIUM',
      language: 'python',
      reward: 150,
      description: 'Find two indices whose values sum up to the target number.',
      testCases: [
        { input: 'nums=[2, 7, 11, 15], target=9', expected: '[0, 1]' }
      ]
    }
  ],
  aptitudeQuestions: [
    {
      id: 'aq_1',
      category: 'Quantitative Aptitude',
      topic: 'Time and Work',
      difficulty: 'Intermediate',
      question: 'A can complete a project in 12 days, and B can complete the same project in 18 days. If they work together for 4 days, what fraction remains?',
      options: ['1/3', '4/9', '7/18', '5/9'],
      correctIndex: 1,
      explanation: 'Work done in 4 days = 4 * (1/12 + 1/18) = 5/9. Remaining = 1 - 5/9 = 4/9.'
    },
    {
      id: 'aq_2',
      category: 'Logical Reasoning',
      topic: 'Number Systems',
      difficulty: 'Beginner',
      question: 'Find the missing term: 4, 9, 25, 49, 121, ?',
      options: ['144', '169', '196', '225'],
      correctIndex: 1,
      explanation: 'Squares of consecutive prime numbers (2, 3, 5, 7, 11, 13).'
    }
  ],
  quests: [
    { id: 'q1', title: 'Solve 5 coding problems in Dungeon', category: 'Coding', xp: 100, progress: 3, total: 5, completed: false },
    { id: 'q2', title: 'Complete 20 aptitude questions', category: 'Aptitude', xp: 75, progress: 14, total: 20, completed: false },
    { id: 'q3', title: 'Study DSA module for 30 minutes', category: 'Library', xp: 50, progress: 30, total: 30, completed: true },
    { id: 'q4', title: 'Complete today\'s algorithm assignment', category: 'Assignment', xp: 100, progress: 1, total: 1, completed: true },
    { id: 'q5', title: 'Maintain study streak & check-in', category: 'Streak', xp: 50, progress: 1, total: 1, completed: true },
  ],
  leaderboard: [
    { rank: 1, name: 'Vanguard_Kael', level: 28, xp: 14850, studentRank: 'S', codingScore: 980, aptitudeScore: 940 },
    { rank: 2, name: 'Aether_Ren', level: 24, xp: 11200, studentRank: 'S', codingScore: 910, aptitudeScore: 890 },
    { rank: 3, name: 'Cipher_Elena', level: 19, xp: 8750, studentRank: 'A', codingScore: 840, aptitudeScore: 860 }
  ]
};
