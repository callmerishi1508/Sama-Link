import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/ui-store";

interface RiskGaugeProps {
  score: number; // 0-100 normalized
  level: string;
}

export function RiskGauge({ score, level }: RiskGaugeProps) {
  const { demoMode } = useUIStore();
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, demoMode ? 1000 : 300);
    return () => clearTimeout(timer);
  }, [score, demoMode]);

  const getStrokeColor = (val: number) => {
    if (val < 30) return "#10b981"; // Emerald
    if (val < 60) return "#eab308"; // Yellow
    if (val < 85) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  const getLevelColorClass = (l: string) => {
    switch (l.toLowerCase()) {
      case 'low': return 'text-emerald-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const radius = 120;
  const strokeWidth = 24;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Arc is 3/4 of a circle (270 degrees)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (animatedScore / 100) * arcLength;

  // Needle angle (-135deg to +135deg)
  const needleAngle = -135 + (animatedScore / 100) * 270;

  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* SVG Gauge */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="absolute inset-0 -rotate-90 transform-origin-center"
          style={{ transform: "rotate(135deg)" }}
        >
          {/* Background Arc */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{ strokeDashoffset: 0 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-200 dark:text-slate-800"
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <motion.circle
            stroke={getStrokeColor(animatedScore)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset }}
            transition={{ duration: demoMode ? 2 : 1, ease: "easeOut", delay: demoMode ? 0.5 : 0.2 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center mt-8">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: demoMode ? 1.5 : 0.5, type: "spring" }}
            className={`text-5xl font-black tracking-tighter ${getLevelColorClass(level)}`}
          >
            {Math.round(animatedScore)}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: demoMode ? 2.0 : 0.7 }}
            className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1"
          >
            {level}
          </motion.span>
        </div>

        {/* Needle */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-[90px] origin-bottom -translate-x-1/2 -translate-y-full"
          initial={{ rotate: -135 }}
          animate={{ rotate: needleAngle }}
          transition={{ duration: demoMode ? 2 : 1, ease: "easeOut", delay: demoMode ? 0.2 : 0.1 }}
        >
          <div className="w-full h-full bg-slate-800 dark:bg-white rounded-full shadow-lg" />
          {/* Needle Center Pin */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-slate-900 dark:bg-slate-100 rounded-full border-4 border-white dark:border-slate-800 shadow-xl" />
        </motion.div>
      </div>
    </div>
  );
}
