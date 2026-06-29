"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useUIStore } from "@/stores/ui-store";

interface SentenceStreamerProps {
  text: string;
  className?: string;
  targetDurationMs?: number;
}

export function SentenceStreamer({ text, className = "", targetDurationMs = 2000 }: SentenceStreamerProps) {
  const { demoMode, isPaused } = useUIStore();
  const [revealedCount, setRevealedCount] = useState(demoMode ? 0 : 999);

  const sentences = useMemo(() => {
    if (!text) return [];
    // Split by standard sentence enders, preserving the punctuation
    const matches = text.match(/[^.!?]+[.!?]+/g) || [text];
    return matches.map(s => s.trim()).filter(Boolean);
  }, [text]);

  useEffect(() => {
    if (!demoMode || isPaused || revealedCount >= sentences.length) return;

    // Distribute the target duration across the sentences
    const stepDuration = Math.max(200, targetDurationMs / Math.max(sentences.length, 1));
    
    const timer = setTimeout(() => {
      setRevealedCount(prev => prev + 1);
    }, stepDuration);

    return () => clearTimeout(timer);
  }, [demoMode, isPaused, revealedCount, sentences.length, targetDurationMs]);

  // If not in demo mode, show all instantly
  const renderCount = demoMode ? revealedCount : sentences.length;

  return (
    <span className={`inline-block ${className}`}>
      {sentences.map((sentence, idx) => (
        <motion.span
          key={idx}
          initial={demoMode ? { opacity: 0, filter: "blur(4px)" } : { opacity: 1, filter: "blur(0px)" }}
          animate={{
            opacity: idx <= renderCount ? 1 : 0,
            filter: idx <= renderCount ? "blur(0px)" : "blur(4px)",
          }}
          transition={{ duration: 0.4 }}
          className="mr-1 last:mr-0 inline"
        >
          {sentence}
        </motion.span>
      ))}
      
      {/* Show raw text if no sentences were parsed for some reason */}
      {sentences.length === 0 && text}
    </span>
  );
}
