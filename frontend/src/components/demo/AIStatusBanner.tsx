"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap, Brain, Shield, Clock } from "lucide-react";
import { useAnalysisStore } from "@/stores/analysis-store";
import { useUIStore } from "@/stores/ui-store";

export function AIStatusBanner() {
  const { demoMode } = useUIStore();
  const { response } = useAnalysisStore();

  if (!demoMode) return null;

  const isComplete = response !== null;
  const processingTime = response ? Math.round(response.processing_time_ms) : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-[90] pointer-events-none w-max"
      >
        <div className="glass-panel px-6 py-2.5 rounded-full flex items-center gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 shadow-xl border-white/40 dark:border-slate-700/50 bg-white/70 dark:bg-black/70">
          
          <div className="flex items-center gap-2">
            <Brain className="w-3.5 h-3.5 text-indigo-500" />
            <span>Gemini Connected</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          </div>

          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Risk Engine Online</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          </div>

          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-blue-500" />
            <span>Recommended Response Ready</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          </div>

          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {isComplete ? (
              <span className="text-indigo-600 dark:text-indigo-400">{processingTime}ms</span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400 animate-pulse">Computing</span>
            )}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
