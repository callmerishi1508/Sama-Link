import { motion } from "framer-motion";
import { useAnalysisStore } from "@/stores/analysis-store";
import { CheckCircle2, Loader2, BrainCircuit } from "lucide-react";

export function AnalysisLoader() {
  const phase = useAnalysisStore(state => state.loadingPhase);
  
  const phases = [
    { id: 'reading', label: 'Incident' },
    { id: 'understanding', label: 'Understanding' },
    { id: 'identifying', label: 'Analysis' },
    { id: 'assessing', label: 'Risk' },
    { id: 'planning', label: 'Decision' },
    { id: 'oversight', label: 'Review' },
  ];

  const currentIndex = phases.findIndex(p => p.id === phase);

  if (phase === 'idle' || phase === 'complete') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl mb-4">
          <BrainCircuit className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-pulse-subtle" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Intelligence Engine Active</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Processing incident through the SAMA LINK pipeline...</p>
      </div>

      <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto px-4">
        {/* Horizontal Line */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-100 dark:bg-slate-800 rounded-full z-0 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            initial={{ width: "0%" }}
            animate={{ width: `${(Math.max(0, currentIndex) / (phases.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Nodes */}
        {phases.map((p, index) => {
          const isCompleted = currentIndex > index || (currentIndex === -1 && (phase as string) !== 'idle');
          const isCurrent = currentIndex === index;
          
          return (
            <div key={p.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-sm transition-all duration-500 ${
                isCompleted ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-indigo-500/20' : 
                isCurrent ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-blue-500/30' : 
                'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}>
                {isCompleted ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                  </motion.div>
                ) : isCurrent ? (
                  <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                )}
              </div>
              
              <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                isCurrent ? 'text-blue-600 dark:text-blue-400' : 
                isCompleted ? 'text-indigo-900 dark:text-indigo-300' : 
                'text-slate-400 dark:text-slate-500'
              }`}>
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
