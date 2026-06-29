"use client";

/* eslint-disable react-hooks/purity */
import { motion } from "framer-motion";
import { useUIStore } from "@/stores/ui-store";

export function AnimatedBackground() {
  const { demoMode } = useUIStore();

  const particles = Array.from({ length: 6 });

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Dynamic Mesh Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] transition-colors duration-[700ms] ${
          demoMode ? "bg-amber-500/20" : "bg-indigo-500/20"
        }`}
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] transition-colors duration-[700ms] ${
          demoMode ? "bg-rose-500/10" : "bg-blue-500/20"
        }`}
      />

      {/* Slow Moving Ambient Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["0vh", "-100vh"],
            x: [Math.random() * 20 - 10, Math.random() * 40 - 20, Math.random() * 20 - 10],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            y: { duration: 20 + Math.random() * 15, repeat: Infinity, ease: "linear", delay: i * 2 },
            x: { duration: 10 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 20 + Math.random() * 15, repeat: Infinity, ease: "easeInOut", delay: i * 2 }
          }}
          className={`absolute bottom-0 w-2 h-2 rounded-full blur-sm ${demoMode ? 'bg-amber-500/30' : 'bg-indigo-500/30'}`}
          style={{ left: `${15 + i * 15}%` }}
        />
      ))}

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-60" />
    </div>
  );
}
