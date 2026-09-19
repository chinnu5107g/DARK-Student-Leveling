# ⚡ DARK - Student Leveling System

> An immersive 3D RPG-inspired gamified learning platform where students level up their coding, aptitude, logic, and problem-solving skills alongside **DARK**, an interactive 3D AI companion.

---

## 🌟 Live Demo
The application is deployed and hosted on GitHub Pages:
- 🚀 **Live Website**: [https://chinnu5107g.github.io/DARK-Student-Leveling/](https://chinnu5107g.github.io/DARK-Student-Leveling/)

---

## 🎮 Key Features

- **🗡️ 3D Academy World & Sky Vortex**: Interactive 3D floating island world powered by `@react-three/fiber` and `@react-three/drei`.
- **🤖 Live 3D AI Companion (DARK)**: Real-time animated character rig supporting Idle, Walk, Run, Jump, Think, Talk, Celebrate, and Level-Up animations.
- **💻 Coding Dungeon**: Interactive code editor for solving algorithm challenges with real-time XP and rank gains.
- **🧠 Aptitude Arena**: Gamified multiple-choice quizzes with instant feedback, explanations, and stat progression.
- **📜 Daily Quests & Contracts**: Daily learning objectives awarding XP, streak boosts, and completion bonuses.
- **📊 RPG Player Stats & Ascension**: Dynamic Radar stats (Intelligence, Coding, Logic, Knowledge, Problem Solving) with Rank tiers (E ➔ D ➔ C ➔ B ➔ A ➔ S Rank Shadow Sovereign).
- **🏆 Global Leaderboard & Achievements**: Ranked player ladder and badge unlock system with particle FX & sound feedback.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Three.js / React Three Fiber, Framer Motion, Canvas Confetti, Zustand.
- **Backend API**: Node.js, Express, Cors, Mongoose, JWT, In-memory seed database.
- **CI/CD**: GitHub Actions for automated build verification and GitHub Pages continuous deployment.

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **npm**: v9+

### 2. Clone the Repository
```bash
git clone https://github.com/chinnu5107g/DARK-Student-Leveling.git
cd DARK-Student-Leveling/dark-student-leveling
```

### 3. Run Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. (Optional) Run Backend API
```bash
cd ../backend
npm install
npm run dev
```
The backend server runs on [http://localhost:5000](http://localhost:5000).

---

## 🌐 GitHub Pages Deployment Setup

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the site to GitHub Pages on every push to `main`.

To enable GitHub Pages in your GitHub repository:
1. Go to **Settings** > **Pages** in your repository (`https://github.com/chinnu5107g/DARK-Student-Leveling/settings/pages`).
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push to `main` branch or trigger the `Deploy DARK Student Leveling to GitHub Pages` workflow manually from the **Actions** tab.
4. Your website will be live at `https://chinnu5107g.github.io/DARK-Student-Leveling/`!

---

## 📜 License
ISC License © 2026 DARK Student Leveling
