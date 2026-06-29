import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BrainCircuit, Scale, CheckCircle2, ChevronRight } from "lucide-react";
import { RiskAssessment, DecisionPlan } from "@/types/analysis";

interface ExplainabilityPanelProps {
  risk: RiskAssessment;
  decision: DecisionPlan;
}

export function ExplainabilityPanel({ risk, decision }: ExplainabilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/30 transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800/50"
      >
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">Why did SAMA LINK reach this conclusion?</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 pt-2 space-y-6 border-t border-slate-100 dark:border-slate-800">
              
              {/* Evidence */}
              {risk.supporting_evidence.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    <ChevronRight className="w-4 h-4" /> Evidence
                  </div>
                  <div className="grid gap-2 pl-6 border-l-2 border-slate-200 dark:border-slate-800 ml-2">
                    {risk.supporting_evidence.map((evidence, idx) => (
                      <div key={idx} className="text-sm text-slate-700 dark:text-slate-300">
                        {evidence}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Triggered Rules */}
              {risk.triggered_rules.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    <Scale className="w-4 h-4" /> Triggered Rules
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6 ml-2">
                    {risk.triggered_rules.map((rule, idx) => (
                      <span key={idx} className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md font-mono">
                        {rule}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reasoning */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4" /> Reasoning
                </div>
                <div className="pl-6 border-l-2 border-indigo-200 dark:border-indigo-900 ml-2 text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {risk.explanation}
                </div>
              </div>

              {/* Final Recommendation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> Final Recommendation
                </div>
                <div className="pl-6 border-l-2 border-emerald-200 dark:border-emerald-900 ml-2 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {decision.reason}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
