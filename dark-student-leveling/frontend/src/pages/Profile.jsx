import React, { useState } from 'react';
import PlayerStats from '../components/ui/PlayerStats';
import { usePlayerStore } from '../store/playerStore';
import soundEngine from '../services/soundEngine';
import { 
  User, 
  Shield, 
  Key, 
  Save, 
  Award, 
  CheckCircle, 
  Sparkles,
  Flame
} from 'lucide-react';

export default function Profile() {
  const { user, level, rankInfo, totalXp } = usePlayerStore();
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [email, setEmail] = useState(user.email);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    soundEngine.playSuccess();
    usePlayerStore.setState(state => ({
      user: {
        ...state.user,
        name,
        title,
        email
      }
    }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-20 pb-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Profile Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 shadow-[0_0_20px_#00E5FF] text-white">
            <User size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                PLAYER PROFILE & REGISTRATION
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                IDENTITY DOSSIER
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Manage your student credentials, rank titles, and academic telemetry.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 uppercase font-mono">Current Status</div>
          <div className="text-sm font-bold text-cyan-300 font-mono">LV. {level} • {rankInfo.name}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Player Status Card */}
        <div className="lg:col-span-6 space-y-6">
          <PlayerStats />
        </div>

        {/* Right Column: Identity Configuration Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="holo-panel p-6 border border-cyan-500/30">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield size={16} className="text-cyan-400" />
              Customize Student Identity
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Codename / Student Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-white outline-none transition"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Honorific Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-cyan-300 outline-none transition"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Academy Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-white outline-none transition"
                />
              </div>

              {isSaved && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle size={15} />
                  <span>Student dossier successfully synchronized with system!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl holo-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                <Save size={15} />
                <span>SAVE DOSSIER</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
