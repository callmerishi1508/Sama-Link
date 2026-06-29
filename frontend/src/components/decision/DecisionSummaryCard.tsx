import { useAnalysisStore } from "@/stores/analysis-store";
import { useDecisionStore } from "@/stores/decision-store";
import { AlertTriangle, Clock, Users, Navigation } from "lucide-react";

export function DecisionSummaryCard() {
  const response = useAnalysisStore(state => state.response);
  const operator = useDecisionStore(state => state.operator);
  const lifecycleState = useDecisionStore(state => state.lifecycleState);

  if (!response) return null;

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 border-2 border-slate-200/60 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Operational Briefing</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Risk</div>
          <div className={`font-bold ${
            response.risk.risk_level === 'CRITICAL' ? 'text-rose-600 dark:text-rose-400' :
            response.risk.risk_level === 'HIGH' ? 'text-orange-600 dark:text-orange-400' :
            response.risk.risk_level === 'MEDIUM' ? 'text-amber-600 dark:text-amber-400' :
            'text-emerald-600 dark:text-emerald-400'
          }`}>{response.risk.risk_level}</div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Affected</div>
          <div className="font-bold text-slate-900 dark:text-white">{response.understanding.people_affected_estimate}</div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5" /> Location</div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">{response.understanding.locations?.[0] || 'Unknown'}</div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Operator</div>
          <div className="font-bold text-indigo-600 dark:text-indigo-400">{operator}</div>
          <div className="text-[10px] font-bold text-slate-400 mt-0.5">{lifecycleState.replace(/_/g, ' ')}</div>
        </div>
      </div>
    </div>
  );
}
