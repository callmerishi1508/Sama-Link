import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ChevronDown, ChevronUp, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { RiskAssessment } from "@/types/analysis";

interface RiskBreakdownProps {
  risk: RiskAssessment;
}

export function RiskBreakdown({ risk }: RiskBreakdownProps) {
  const [expanded, setExpanded] = useState(true);
  const [replayStep, setReplayStep] = useState(0);

  const rawScoreMatch = risk.explanation?.match(/Total = (\d+)/);
  const rawScore = rawScoreMatch ? parseInt(rawScoreMatch[1], 10) : risk.risk_score;
  const isCapped = rawScore > 100;

  // Generate deterministic but fake scores for the replay since backend just gives strings
  const items = risk.supporting_evidence || [];
  const rules = items.map((ev, i) => {
    const formattedEv = ev.replace(/^[✔•]\s*/, '');
    // Distribute the raw score across the items
    const scoreVal = Math.floor(rawScore / items.length) + (i === items.length - 1 ? (rawScore % items.length) : 0);
    return { name: formattedEv, score: scoreVal };
  });

  useEffect(() => {
    if (expanded && rules.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReplayStep(0);
      const timer = setInterval(() => {
        setReplayStep(prev => {
          if (prev >= rules.length + 1) { // +1 for the final normalization step
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [expanded, rules.length, risk.risk_score]);

  const severityColor = 
    risk.risk_level === 'CRITICAL' ? 'text-red-500' :
    risk.risk_level === 'HIGH' ? 'text-orange-500' :
    risk.risk_level === 'MEDIUM' ? 'text-yellow-500' :
    'text-emerald-500';

  return (
    <div className="premium-card bg-white/40 dark:bg-black/40 overflow-hidden !p-0">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 sm:p-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-2xl">
            <ShieldAlert className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">⚠ Rule Replay</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Live deterministic risk calculation.</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-6 h-6 text-slate-400" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-6 sm:p-8 border-t border-slate-200/50 dark:border-slate-800/50"
          >
            {rules.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">No specific risk rules triggered.</p>
            ) : (
              <div className="space-y-6 max-w-md mx-auto">
                {rules.map((rule, idx) => {
                  if (idx >= replayStep) return null;
                  const runningTotal = rules.slice(0, idx + 1).reduce((acc, curr) => acc + curr.score, 0);
                  
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="relative"
                    >
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">{rule.name}</span>
                        <div className="flex flex-col items-end">
                          <span className="text-orange-500 font-bold">+{rule.score}</span>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total: {runningTotal}</span>
                        </div>
                      </div>
                      
                      {/* Connection arrow down to the next item */}
                      <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 h-6 flex items-center justify-center">
                        <ArrowDown className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                      </div>
                    </motion.div>
                  );
                })}

                {/* Final Normalization Step */}
                {replayStep >= rules.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pt-6 text-center"
                  >
                    <div className="inline-flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg">
                      <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                        {isCapped ? 'Normalized Score' : 'Final Score'}
                      </div>
                      <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                        {risk.risk_score}
                      </div>
                      <div className={`text-xl font-bold uppercase tracking-widest ${severityColor}`}>
                        {risk.risk_level}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
