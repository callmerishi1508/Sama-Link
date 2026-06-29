"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Server, Activity, ShieldCheck, Fingerprint } from "lucide-react";
import { useAnalysisStore } from "@/stores/analysis-store";
import { useUIStore } from "@/stores/ui-store";
import { useEffect, useState } from "react";

export function MissionComplete() {
  const { response, reset } = useAnalysisStore();
  const {} = useUIStore();
  const [step, setStep] = useState(0);

  const steps = [
    "Intelligence extracted",
    "Rules validated",
    "Policy selected",
    "Human oversight maintained",
  ];

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => setStep(step + 1), 600);
      return () => clearTimeout(timer);
    } else if (step === steps.length) {
      // Pause on Mission Complete / System Ready for 2 seconds
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [step, steps.length]);

  if (!response) return null;

  const isFinal = step > steps.length;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto mt-24 mb-32 p-8 md:p-12 premium-card bg-white/50 dark:bg-black/40 text-center relative overflow-hidden group"
    >
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
      >
        <CheckCircle2 className="w-10 h-10" />
      </motion.div>

      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-8">
        Incident Closed
      </h2>

      {/* Sequential Text Feed */}
      <div className="space-y-3 mb-12 min-h-[160px] flex flex-col justify-center">
        {steps.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 10 }}
            className={`text-sm md:text-base font-semibold tracking-wide flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300`}
          >
            {step > i && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {text}
              </>
            )}
          </motion.div>
        ))}
        {step >= steps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-4 flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Ready
          </motion.div>
        )}
      </div>

      {isFinal && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* System Metrics Footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 relative z-10">
            <div className="text-center">
              <Server className="w-4 h-4 mx-auto text-slate-400 mb-1" />
              <div className="text-[10px] uppercase font-bold text-slate-500">Processing</div>
              <div className="text-sm font-black text-slate-700 dark:text-slate-300">{response.processing_time_ms}ms</div>
            </div>
            <div className="text-center">
              <Activity className="w-4 h-4 mx-auto text-slate-400 mb-1" />
              <div className="text-[10px] uppercase font-bold text-slate-500">Provider</div>
              <div className="text-sm font-black text-slate-700 dark:text-slate-300">{response.provider}</div>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-4 h-4 mx-auto text-slate-400 mb-1" />
              <div className="text-[10px] uppercase font-bold text-slate-500">Rules Triggered</div>
              <div className="text-sm font-black text-slate-700 dark:text-slate-300">{response.risk.supporting_evidence.length}</div>
            </div>
            <div className="text-center">
              <Fingerprint className="w-4 h-4 mx-auto text-slate-400 mb-1" />
              <div className="text-[10px] uppercase font-bold text-slate-500">Policy</div>
              <div className="text-sm font-black text-slate-700 dark:text-slate-300">{response.decision.priority}</div>
            </div>
          </div>

          <button 
            onClick={() => {
              reset();
            }}
            className="px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl relative z-10 flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Analyze New Incident
          </button>
        </motion.div>
      )}

    </motion.div>
  );
}
