const express = require('express');
const cors = require('cors');
const seedData = require('./data/seedData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database initialized with seed data
let db = { ...seedData };

// XP & Rank Helper Function (Server-Side Calculation)
function calculateRank(xp) {
  if (xp >= 10000) return 'S';
  if (xp >= 6001) return 'A';
  if (xp >= 3001) return 'B';
  if (xp >= 1501) return 'C';
  if (xp >= 501) return 'D';
  return 'E';
}

function calculateLevel(totalXp) {
  let level = 1;
  let remainingXp = totalXp;
  let xpForNext = 500;
  while (remainingXp >= xpForNext) {
    remainingXp -= xpForNext;
    level++;
    xpForNext = 500 + (level - 1) * 100;
  }
  return { level, currentLevelXp: remainingXp, xpForNextLevel: xpForNext };
}

// ------------------- AUTH ROUTES -------------------
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: `usr_${Date.now()}`,
    name: name || 'New Initiate',
    email: email || 'student@darkacademy.edu',
    role: 'student',
    title: 'Awakened Initiate',
    level: 1,
    xp: 0,
    rank: 'E',
    streak: 1,
    stats: {
      intelligence: 50,
      coding: 50,
      logic: 50,
      knowledge: 50,
      problemSolving: 50
    }
  };
  db.users.push(newUser);
  res.status(201).json({ success: true, user: newUser, token: 'jwt_mock_token_dark_academy' });
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const user = db.users[0]; // Returns master student profile
  res.json({ success: true, user, token: 'jwt_mock_token_dark_academy' });
});

app.get('/api/user/profile', (req, res) => {
  res.json({ success: true, user: db.users[0] });
});

app.put('/api/user/profile', (req, res) => {
  const { name, title, email } = req.body;
  if (name) db.users[0].name = name;
  if (title) db.users[0].title = title;
  if (email) db.users[0].email = email;
  res.json({ success: true, user: db.users[0] });
});

// ------------------- PROGRESS & XP ROUTES -------------------
app.get('/api/progress', (req, res) => {
  const user = db.users[0];
  const { level, currentLevelXp, xpForNextLevel } = calculateLevel(user.xp);
  const rank = calculateRank(user.xp);
  res.json({
    success: true,
    totalXp: user.xp,
    level,
    currentLevelXp,
    xpForNextLevel,
    rank,
    stats: user.stats
  });
});

app.post('/api/progress/xp', (req, res) => {
  const { amount, reason, statBoost } = req.body;
  const user = db.users[0];
  const added = Number(amount) || 0;
  user.xp += added;

  if (statBoost) {
    Object.keys(statBoost).forEach(key => {
      if (user.stats[key] !== undefined) {
        user.stats[key] = Math.min(100, user.stats[key] + statBoost[key]);
      }
    });
  }

  const { level, currentLevelXp, xpForNextLevel } = calculateLevel(user.xp);
  user.level = level;
  user.rank = calculateRank(user.xp);

  res.json({
    success: true,
    message: `+${added} XP Awarded for: ${reason}`,
    totalXp: user.xp,
    level,
    currentLevelXp,
    xpForNextLevel,
    rank: user.rank,
    stats: user.stats
  });
});

// ------------------- CODING DUNGEON ROUTES -------------------
app.get('/api/coding/problems', (req, res) => {
  res.json({ success: true, problems: db.codingProblems });
});

app.get('/api/coding/problems/:id', (req, res) => {
  const problem = db.codingProblems.find(p => p.id === req.params.id);
  if (!problem) return res.status(404).json({ success: false, message: 'Problem not found' });
  res.json({ success: true, problem });
});

app.post('/api/coding/submit', (req, res) => {
  const { problemId, code, language } = req.body;
  const problem = db.codingProblems.find(p => p.id === problemId);
  const reward = problem ? problem.reward : 100;

  // Server-side validation
  db.users[0].xp += reward;
  const { level, currentLevelXp, xpForNextLevel } = calculateLevel(db.users[0].xp);

  res.json({
    success: true,
    passed: true,
    message: 'All test cases passed. Barrier broken!',
    rewardXp: reward,
    newTotalXp: db.users[0].xp,
    level,
    rank: calculateRank(db.users[0].xp)
  });
});

// ------------------- APTITUDE ARENA ROUTES -------------------
app.get('/api/aptitude/questions', (req, res) => {
  res.json({ success: true, questions: db.aptitudeQuestions });
});

app.post('/api/aptitude/submit', (req, res) => {
  const { questionId, selectedIndex } = req.body;
  const q = db.aptitudeQuestions.find(item => item.id === questionId);
  const isCorrect = q && q.correctIndex === selectedIndex;
  const reward = isCorrect ? 25 : 0;

  if (isCorrect) {
    db.users[0].xp += reward;
  }

  res.json({
    success: true,
    correct: isCorrect,
    explanation: q ? q.explanation : '',
    rewardXp: reward
  });
});

// ------------------- QUESTS & CONTRACTS -------------------
app.get('/api/quests', (req, res) => {
  res.json({ success: true, quests: db.quests });
});

app.post('/api/quests/complete', (req, res) => {
  const { questId } = req.body;
  const quest = db.quests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.completed = true;
    db.users[0].xp += quest.xp;
  }
  res.json({ success: true, quests: db.quests, totalXp: db.users[0].xp });
});

// ------------------- LEADERBOARD & ACHIEVEMENTS -------------------
app.get('/api/leaderboard', (req, res) => {
  res.json({ success: true, leaderboard: db.leaderboard });
});

// ------------------- AI COMPANION ROUTE -------------------
app.post('/api/ai/chat', (req, res) => {
  const { message } = req.body;
  let reply = "I am DARK. Focus on deliberate practice. Each challenge solved sharpens your intellect.";
  const lower = (message || '').toLowerCase();

  if (lower.includes('code') || lower.includes('python')) {
    reply = "In coding dungeons, always inspect time complexity and handle edge bounds first.";
  } else if (lower.includes('motivat') || lower.includes('tired')) {
    reply = "Failure isn't the end, Player. It's just uncollected XP. Don't stop now; you're getting stronger.";
  }

  res.json({
    success: true,
    reply,
    companionState: 'TALK'
  });
});

// ------------------- ADMIN ROUTES -------------------
app.post('/api/admin/problems', (req, res) => {
  const newProb = { id: `cp_${Date.now()}`, ...req.body };
  db.codingProblems.push(newProb);
  res.status(201).json({ success: true, problem: newProb });
});

app.post('/api/admin/questions', (req, res) => {
  const newQ = { id: `aq_${Date.now()}`, ...req.body };
  db.aptitudeQuestions.push(newQ);
  res.status(201).json({ success: true, question: newQ });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'HEALTHY', system: 'DARK Leveling Engine', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[DARK API ENGINE] Running securely on port ${PORT}`);
});
