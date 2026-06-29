"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ProcessingTimer({ ms, onComplete }: { ms: number, onComplete?: () => void }) {
  const [displayValue, setDisplayValue] = useState(0.0);
  const targetSeconds = ms / 1000;

  useEffect(() => {
    const duration = 1500; // 1.5 seconds real-time for animation
    const frames = 60;
    const interval = duration / frames;
    const step = targetSeconds / frames;
    
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= targetSeconds) {
        setDisplayValue(targetSeconds);
        clearInterval(timer);
        onComplete?.();
      } else {
        setDisplayValue(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [targetSeconds, onComplete]);

  return (
    <span className="font-mono text-indigo-600 dark:text-indigo-400">
      {displayValue.toFixed(1)}s
      {displayValue >= targetSeconds && (
        <motion.span 
          initial={{ opacity: 0, x: -5 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="ml-2 text-xs uppercase bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full"
        >
          Analysis Complete
        </motion.span>
      )}
    </span>
  );
}
