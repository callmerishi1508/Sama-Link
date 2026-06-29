"use client";

import { motion } from "framer-motion";

interface ConfidenceBarProps {
  score: number; // 0 to 1
  label?: string;
}

export function ConfidenceBar({ score, label = "Confidence" }: ConfidenceBarProps) {
  const percentage = Math.round(score * 100);
  
  let text = "Low";
  let textColor = "text-red-500 dark:text-red-400";
  let bgGradient = "from-red-500 to-rose-500";
  
  if (percentage >= 80) {
    text = "Very High";
    textColor = "text-emerald-500 dark:text-emerald-400";
    bgGradient = "from-emerald-400 to-teal-500";
  } else if (percentage >= 60) {
    text = "High";
    textColor = "text-emerald-500 dark:text-emerald-400";
    bgGradient = "from-emerald-400 to-emerald-500";
  } else if (percentage >= 40) {
    text = "Medium";
    textColor = "text-amber-500 dark:text-amber-400";
    bgGradient = "from-amber-400 to-amber-500";
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>
            {text}
          </span>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            ({percentage}%)
          </span>
        </div>
      </div>
      
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`absolute top-0 left-0 bottom-0 rounded-full bg-gradient-to-r ${bgGradient}`}
        />
      </div>
    </div>
  );
}
