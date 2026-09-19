import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Sidebar from './components/ui/Sidebar';
import DarkAssistantModal from './components/ui/DarkAssistantModal';
import NotificationToast from './components/ui/NotificationToast';
import { LevelUpModal, RankUpModal } from './components/ui/AscensionModals';

// Pages
import Home from './pages/Home';
import World from './pages/World';
import Dashboard from './pages/Dashboard';
import Coding from './pages/Coding';
import Aptitude from './pages/Aptitude';
import Library from './pages/Library';
import Quests from './pages/Quests';
import Planner from './pages/Planner';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import DarkAI from './pages/DarkAI';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

export default function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Full-bleed 3D views don't need fixed padding constraints
  const isFullBleed = location.pathname === '/' || location.pathname === '/world' || location.pathname === '/dark-ai';

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenAI={() => setIsAIOpen(true)} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      {/* Responsive Holographic Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full transition-all duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/world" element={<World />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/library" element={<Library />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/dark-ai" element={<DarkAI />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* Global Modals & Notifications */}
      <DarkAssistantModal 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
      />

      <NotificationToast />
      <LevelUpModal />
      <RankUpModal />

    </div>
  );
}
