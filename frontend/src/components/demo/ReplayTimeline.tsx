"use client";

import { useUIStore } from "@/stores/ui-store";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const REPLAY_STEPS = [
  "Incident received",
  "Understanding context",
  "Extracting entities",
  "Detecting hazards",
  "Running deterministic rules",
  "Building recommendation",
  "Human confirmation required",
  "Recommendation complete"
];

export function ReplayTimeline() {
  const { replayStep, setReplayStep, setRevealStage } = useUIStore();
  const [startTime] = useState(new Date());

  useEffect(() => {
    // Reveal step by step
    if (replayStep < REPLAY_STEPS.length) {
      const timer = setTimeout(() => {
        setReplayStep(replayStep + 1);
      }, 800); // 800ms per step
      return () => clearTimeout(timer);
    } else {
      // Replay finished, start sequential reveal of cards
      const timer = setTimeout(() => {
        setRevealStage(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [replayStep, setReplayStep, setRevealStage]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden mb-8 border-indigo-200/50 dark:border-indigo-900/50 shadow-xl w-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none -mr-20 -mt-20" />
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
        Live Replay Timeline
      </h3>
      
      <div className="flex flex-col gap-4 relative z-10">
        <AnimatePresence>
          {REPLAY_STEPS.slice(0, replayStep).map((step, index) => {
            const time = new Date(startTime.getTime() + index * 1000);
            const timeString = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="flex items-center gap-4"
              >
                <div className="font-mono text-xs text-slate-500 dark:text-slate-400 min-w-[70px]">
                  {timeString}
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {index < REPLAY_STEPS.length - 1 && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "16px" }}
                      className="w-px bg-slate-300 dark:bg-slate-700 my-1"
                    />
                  )}
                </div>
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {step}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
