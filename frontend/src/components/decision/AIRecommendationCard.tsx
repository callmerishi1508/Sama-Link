import { useAnalysisStore } from "@/stores/analysis-store";
import { BrainCircuit, CheckCircle2, ShieldAlert } from "lucide-react";

export function AIRecommendationCard() {
  const response = useAnalysisStore(state => state.response);

  if (!response) return null;

  return (
    <div className="bg-indigo-50/50 dark:bg-indigo-500/5 rounded-3xl p-6 border border-indigo-200/50 dark:border-indigo-900/30">
      <div className="flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-400">
        <BrainCircuit className="w-5 h-5" />
        <h3 className="text-sm font-bold uppercase tracking-wider">System Recommendation</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold text-slate-500 mb-1">Recommended Action</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white capitalize">{response.decision.recommended_action.replace(/_/g, ' ')}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1">Priority</div>
            <div className={`text-sm font-bold flex items-center gap-1.5 ${response.decision.priority === 'IMMEDIATE' ? 'text-rose-600' : 'text-amber-600'}`}>
              <ShieldAlert className="w-4 h-4" /> {response.decision.priority}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1">AI Confidence</div>
            <div className="text-sm font-bold flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> {Math.round(response.risk.confidence * 100)}%
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-indigo-200/30 dark:border-indigo-800/30">
          <div className="text-xs font-bold text-slate-500 mb-1">Reasoning</div>
          <p className="text-sm text-slate-700 dark:text-slate-300 italic">&quot;{response.decision.reason}&quot;</p>
        </div>
      </div>
    </div>
  );
}
