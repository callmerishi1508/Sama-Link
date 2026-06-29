import { motion } from "framer-motion";
import { useAnalysisStore } from "@/stores/analysis-store";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUIStore } from "@/stores/ui-store";

const StepItem = ({ label, active, completed }: { label: string; active: boolean; completed: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: (active || completed) ? 1 : 0.4, x: 0 }}
    className={`flex items-center gap-3 text-sm font-medium ${active ? 'text-indigo-600 dark:text-indigo-400' : completed ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}
  >
    <div className="w-5 h-5 shrink-0 flex items-center justify-center">
      {completed ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : active ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
      )}
    </div>
    {label}
  </motion.div>
);

const Group = ({ title, isActive, isCompleted, children }: { title: string, isActive: boolean, isCompleted: boolean, children: React.ReactNode }) => (
  <div className={`space-y-2 transition-opacity duration-500 ${(isActive || isCompleted) ? 'opacity-100' : 'opacity-40'}`}>
    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{title}</h4>
    <div className="space-y-1.5 pl-1">
      {children}
    </div>
  </div>
);

export function PipelineLoader() {
  const { loadingPhase } = useAnalysisStore();
  const { demoMode } = useUIStore();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [showCompleteBadge, setShowCompleteBadge] = useState(false);

  // 5 groups total
  useEffect(() => {
    if (loadingPhase === 'reading' || loadingPhase === 'complete') {
      if (activeGroupIndex < 5) {
        const timer = setTimeout(() => {
          setActiveGroupIndex(prev => prev + 1);
        }, demoMode ? 1200 : 400); // Pace over ~6 seconds in demo mode
        return () => clearTimeout(timer);
      } else if (loadingPhase === 'complete') {
        const t = setTimeout(() => setShowCompleteBadge(true), 400);
        return () => clearTimeout(t);
      }
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveGroupIndex(0);
      setShowCompleteBadge(false);
    }
  }, [loadingPhase, activeGroupIndex, demoMode]);

  if (showCompleteBadge) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm mx-auto mt-16 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-center gap-3 text-emerald-700 dark:text-emerald-400 font-bold tracking-wide shadow-lg shadow-emerald-500/10"
      >
        <Check className="w-5 h-5" />
        Pipeline Execution Complete
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-lg mx-auto mt-12 premium-card rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        
        <Group title="Understanding" isActive={activeGroupIndex === 0} isCompleted={activeGroupIndex > 0}>
          <StepItem label="Reading report" active={activeGroupIndex === 0} completed={activeGroupIndex > 0} />
          <StepItem label="Detecting language" active={activeGroupIndex === 0} completed={activeGroupIndex > 0} />
        </Group>

        <Group title="Intelligence" isActive={activeGroupIndex === 1} isCompleted={activeGroupIndex > 1}>
          <StepItem label="Extracting people & locations" active={activeGroupIndex === 1} completed={activeGroupIndex > 1} />
          <StepItem label="Detecting hazards" active={activeGroupIndex === 1} completed={activeGroupIndex > 1} />
        </Group>

        <Group title="Risk Engine" isActive={activeGroupIndex === 2} isCompleted={activeGroupIndex > 2}>
          <StepItem label="Matching deterministic rules" active={activeGroupIndex === 2} completed={activeGroupIndex > 2} />
          <StepItem label="Calculating severity" active={activeGroupIndex === 2} completed={activeGroupIndex > 2} />
        </Group>

        <Group title="Recommended Response" isActive={activeGroupIndex === 3} isCompleted={activeGroupIndex > 3}>
          <StepItem label="Selecting policy" active={activeGroupIndex === 3} completed={activeGroupIndex > 3} />
          <StepItem label="Preparing response" active={activeGroupIndex === 3} completed={activeGroupIndex > 3} />
        </Group>

        <Group title="Human Oversight" isActive={activeGroupIndex === 4} isCompleted={activeGroupIndex > 4}>
          <StepItem label="Awaiting confirmation" active={activeGroupIndex === 4} completed={activeGroupIndex > 4} />
        </Group>

      </div>
    </motion.div>
  );
}
