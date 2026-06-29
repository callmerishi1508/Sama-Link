import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDecisionStore } from "@/stores/decision-store";
import { useResourceStore } from "@/stores/resource-store";
import { DecisionSummaryCard } from "./DecisionSummaryCard";
import { AIRecommendationCard } from "./AIRecommendationCard";
import { DecisionControls } from "./DecisionControls";
import { ModifyPlanPanel } from "./ModifyPlanPanel";
import { EscalationPanel } from "./EscalationPanel";
import { RequestInfoPanel } from "./RequestInfoPanel";
import { AssignmentPanel } from "./AssignmentPanel";
import { DecisionChecklist } from "./DecisionChecklist";
import { DecisionTimeline } from "./DecisionTimeline";
import { DecisionAuditPanel } from "./DecisionAuditPanel";
import { FinalDispatchCard } from "./FinalDispatchCard";
import { DecisionMetrics } from "./DecisionMetrics";
import { DecisionComparison } from "./DecisionComparison";
import { CapacityForecast } from "../resources/CapacityForecast";
import { BrainCircuit } from "lucide-react";

interface HumanDecisionCenterProps {
  demoMode?: boolean;
}

export function HumanDecisionCenter({ demoMode }: HumanDecisionCenterProps) {
  const lifecycleState = useDecisionStore(state => state.lifecycleState);
  const activePanel = useDecisionStore(state => state.activePanel);
  const setLifecycleState = useDecisionStore(state => state.setLifecycleState);
  const organizations = useResourceStore(state => state.organizations);

  // Presentation Mode Animation Logic
  useEffect(() => {
    if (!demoMode) return;
    
    // Animate through the lifecycle
    if (lifecycleState === 'AI_RECOMMENDATION') {
      const t = setTimeout(() => setLifecycleState('UNDER_REVIEW'), 2000);
      return () => clearTimeout(t);
    }
  }, [demoMode, lifecycleState, setLifecycleState]);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="p-2.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-xl">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Human Decision Center</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">AI Recommends. Humans Decide. Platform Coordinates.</p>
        </div>
      </div>

      <DecisionMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {['AI_RECOMMENDATION', 'UNDER_REVIEW', 'MODIFIED', 'APPROVED', 'REJECTED', 'ESCALATED', 'RESOURCES_CONFIRMED', 'DISPATCH_AUTHORIZED', 'INCIDENT_ACTIVE'].includes(lifecycleState) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {lifecycleState !== 'DISPATCH_AUTHORIZED' && lifecycleState !== 'INCIDENT_ACTIVE' && (
                  <>
                    <DecisionSummaryCard />
                    <AIRecommendationCard />
                  </>
                )}

                <AnimatePresence mode="sync">
                  {activePanel === 'MODIFY' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <ModifyPlanPanel />
                    </motion.div>
                  )}
                  {activePanel === 'ESCALATE' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <EscalationPanel />
                    </motion.div>
                  )}
                  {activePanel === 'REQUEST_INFO' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <RequestInfoPanel />
                    </motion.div>
                  )}
                  {activePanel === 'ASSIGN' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <AssignmentPanel />
                    </motion.div>
                  )}
                </AnimatePresence>

                <DecisionControls />

                {/* Only show checklist if plan is approved */}
                {['APPROVED', 'RESOURCES_CONFIRMED'].includes(lifecycleState) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <DecisionComparison />
                    <DecisionChecklist />
                  </motion.div>
                )}
                
                {/* Final dispatch card */}
                {['DISPATCH_AUTHORIZED', 'INCIDENT_ACTIVE'].includes(lifecycleState) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <DecisionComparison />
                    <FinalDispatchCard />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <CapacityForecast organizations={organizations} />
          </div>
          <DecisionTimeline />
          <DecisionAuditPanel />
        </div>
      </div>
    </div>
  );
}
