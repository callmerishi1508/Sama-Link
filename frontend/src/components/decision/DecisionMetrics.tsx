import { useDecisionStore } from "@/stores/decision-store";
import { useAnalysisStore } from "@/stores/analysis-store";
import { BrainCircuit, UserCheck, CheckCircle2, Clock, Siren, Users } from "lucide-react";

export function DecisionMetrics() {
  const response = useAnalysisStore(state => state.response);
  const lifecycleState = useDecisionStore(state => state.lifecycleState);
  const finalPlan = useDecisionStore(state => state.finalPlan);

  if (!response) return null;

  const activePlan = finalPlan || response.decision;
  const isHumanValidated = ['APPROVED', 'DISPATCH_AUTHORIZED', 'INCIDENT_ACTIVE'].includes(lifecycleState);
  const isDispatchReady = ['DISPATCH_AUTHORIZED', 'INCIDENT_ACTIVE'].includes(lifecycleState);

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
      <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl p-4 border border-indigo-200 dark:border-indigo-800/50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
          <BrainCircuit className="w-3.5 h-3.5" /> AI Conf
        </div>
        <div className="text-xl font-black text-slate-900 dark:text-white">{Math.round(response.risk.confidence * 100)}%</div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <UserCheck className="w-3.5 h-3.5" /> Human
        </div>
        <div className={`text-xl font-black ${isHumanValidated ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'}`}>
          {isHumanValidated ? '100%' : 'Pending'}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" /> Dispatch
        </div>
        <div className={`text-xl font-black ${isDispatchReady ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
          {isDispatchReady ? 'Ready' : 'Prep'}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5" /> ETA
        </div>
        <div className="text-xl font-black text-slate-900 dark:text-white">6 min</div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <Siren className="w-3.5 h-3.5" /> Units
        </div>
        <div className="text-xl font-black text-slate-900 dark:text-white">{(activePlan.resources_to_dispatch as string[])?.length || 0}</div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          <Users className="w-3.5 h-3.5" /> Notified
        </div>
        <div className="text-xl font-black text-slate-900 dark:text-white">{(activePlan.stakeholders_to_notify as string[])?.length || 0}</div>
      </div>
    </div>
  );
}
