"use client";

import { useUIStore } from "@/stores/ui-store";
import { useAnalysisStore } from "@/stores/analysis-store";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "lucide-react";
import { useEffect, useState } from "react";

export function KeyboardShortcutHelper() {
  const { demoMode, toggleDemoMode, setIsPaused, isPaused, setRevealStage } = useUIStore();
  const resetAnalysis = useAnalysisStore(state => state.reset);
  const [show, setShow] = useState(true);

  // Auto-hide the tooltip
  useEffect(() => {
    if (demoMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      const timer = setTimeout(() => setShow(false), 6000);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [demoMode]);

  // Bind the global shortcuts requested by the user
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Demo Mode (Ctrl+D)
      if (e.ctrlKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDemoMode();
        return;
      }
      
      // Analyze (Ctrl+Enter) - Handled inside IncidentInput typically, but could be global
      
      // Only demo mode specific bindings below
      if (!demoMode) return;
      
      // Reset (Esc)
      if (e.key === 'Escape') {
        e.preventDefault();
        resetAnalysis();
      }
      
      // Pause (Space)
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'TEXTAREA' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setIsPaused(!isPaused);
      }
      
      // Reveal Previous / Next (Left / Right Arrow)
      if (e.key === 'ArrowRight') {
        setRevealStage(useUIStore.getState().revealStage + 1);
      } else if (e.key === 'ArrowLeft') {
        setRevealStage(Math.max(0, useUIStore.getState().revealStage - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [demoMode, toggleDemoMode, resetAnalysis, isPaused, setIsPaused, setRevealStage]);

  return (
    <AnimatePresence>
      {(demoMode && show) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-4 text-[10px] font-semibold text-slate-500 dark:text-slate-400 shadow-xl border-white/40 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 border-r border-slate-200 dark:border-slate-700 pr-4">
              <Command className="w-3 h-3" />
              <span className="uppercase tracking-widest text-slate-700 dark:text-slate-300">Command Center</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Ctrl</kbd>
                +
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Enter</kbd>
                <span className="ml-0.5">Analyze</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Ctrl</kbd>
                +
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">D</kbd>
                <span className="ml-0.5">Demo</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Esc</kbd>
                <span className="ml-0.5">Reset</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Space</kbd>
                <span className="ml-0.5">Pause</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">→</kbd>
                <span className="ml-0.5">Reveal</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
