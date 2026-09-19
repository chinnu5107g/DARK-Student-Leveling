import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NotificationToast() {
  const { activeNotification, clearNotification } = usePlayerStore();

  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification, clearNotification]);

  if (!activeNotification) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-20 right-4 z-50 max-w-sm holo-panel-cyan p-4 border border-cyan-400/80 shadow-[0_0_25px_rgba(0,229,255,0.4)]"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.9 }}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-400/40">
            <Sparkles size={18} className="animate-spin-slow" />
          </div>
          <div>
            <div className="text-sm font-bold text-cyan-300 font-mono">
              {activeNotification.message}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {activeNotification.detail}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
