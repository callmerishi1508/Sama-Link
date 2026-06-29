"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Fingerprint, Map } from "lucide-react";
import { useAnalysisStore } from "@/stores/analysis-store";
import { useUIStore } from "@/stores/ui-store";
import { useState, useEffect } from "react";

export function FloatingMetricsPanel() {
  const { demoMode } = useUIStore();
  const { response, loadingPhase } = useAnalysisStore();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (loadingPhase === 'complete') {
      const timer = setTimeout(() => setIsFinished(true), 3000);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFinished(false);
    }
  }, [loadingPhase]);

  if (!demoMode || !response) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-24 right-8 z-40 hidden lg:flex flex-col gap-3"
    >
      <div className="p-3 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-lg w-48 group hover:bg-white/90 dark:hover:bg-black/60 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Latency</span>
        </div>
        <div className="text-xl font-black text-slate-800 dark:text-slate-200 tracking-tight">
          {Math.round(response.processing_time_ms)}<span className="text-sm font-semibold text-slate-400">ms</span>
        </div>
      </div>

      <AnimatePresence>
        {!isFinished && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-lg w-48 group hover:bg-white/90 dark:hover:bg-black/60 transition-colors overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-2">
              <Map className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Current Stage</span>
            </div>
            <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 tracking-tight uppercase truncate">
              {loadingPhase === 'complete' ? 'Completed' : loadingPhase}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-3 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-lg w-48 group hover:bg-white/90 dark:hover:bg-black/60 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className={`w-3.5 h-3.5 ${response.risk.risk_level === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Risk</span>
        </div>
        <div className="text-xl font-black text-slate-800 dark:text-slate-200 tracking-tight">
          {response.risk.risk_level}
        </div>
      </div>

      <div className="p-3 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-lg w-48 group hover:bg-white/90 dark:hover:bg-black/60 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <Fingerprint className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Confidence</span>
        </div>
        <div className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight truncate">
          92%
        </div>
      </div>
    </motion.div>
  );
}
