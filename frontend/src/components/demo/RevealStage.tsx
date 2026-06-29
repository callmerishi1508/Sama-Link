"use client";

import { useUIStore } from "@/stores/ui-store";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface RevealStageProps {
  stageIndex: number;
  children: ReactNode;
  className?: string;
}

export function RevealStage({ stageIndex, children, className = "" }: RevealStageProps) {
  const { demoMode, revealStage } = useUIStore();
  const ref = useRef<HTMLDivElement>(null);

  const isRevealed = !demoMode || revealStage >= stageIndex;
  const isFocused = !demoMode || revealStage === stageIndex;

  useEffect(() => {
    // If it just became revealed and it's the active focus stage, scroll to it
    if (demoMode && revealStage === stageIndex && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [revealStage, stageIndex, demoMode]);

  if (!isRevealed) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ 
        opacity: isFocused ? 1 : 0.4, 
        y: 0, 
        filter: isFocused ? "blur(0px)" : "blur(2px)",
        scale: isFocused ? 1 : 0.98
      }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      className={`relative rounded-3xl transition-all duration-500 ${isFocused ? 'ring-2 ring-indigo-500/50 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]' : ''} ${className}`}
    >
      {/* Spotlight glow behind the active component */}
      {isFocused && (
        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl -z-10 rounded-3xl pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
}
