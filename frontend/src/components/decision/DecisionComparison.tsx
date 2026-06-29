import { useDecisionStore } from "@/stores/decision-store";
import { useAnalysisStore } from "@/stores/analysis-store";
import { ArrowRight, Bot, User } from "lucide-react";

export function DecisionComparison() {
  const finalPlan = useDecisionStore(state => state.finalPlan);
  const response = useAnalysisStore(state => state.response);
  const lifecycleState = useDecisionStore(state => state.lifecycleState);

  // Only show when modified and before/during dispatch
  if (!finalPlan?.modified || !response) return null;
  if (!['APPROVED', 'DISPATCH_AUTHORIZED', 'INCIDENT_ACTIVE'].includes(lifecycleState)) return null;

  const original = response.decision;
  const modified = finalPlan;

  return (
    <div className="bg-slate-50 dark:bg-slate-800/20 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mt-6 mb-6">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Plan Modification Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 items-center justify-center z-10">
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* AI Original */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 opacity-75">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-3">
            <Bot className="w-4 h-4" /> AI Recommendation
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="text-slate-500">Action:</span> <span className="font-medium capitalize">{original.recommended_action?.replace(/_/g, ' ')}</span></div>
            <div><span className="text-slate-500">Priority:</span> <span className="font-medium">{original.priority}</span></div>
            <div>
              <span className="text-slate-500 block mb-1">Resources:</span>
              <ul className="pl-4 list-disc marker:text-slate-300">
                {original.resources_to_dispatch?.map((r: string) => <li key={r} className="capitalize">{r.replace(/_/g, ' ')}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Human Modified */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800/50">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            <User className="w-4 h-4" /> Operator Changes
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="text-slate-500">Action:</span> <span className="font-medium capitalize">{(modified.recommended_action as string)?.replace(/_/g, ' ')}</span></div>
            <div><span className="text-slate-500">Priority:</span> <span className="font-medium">{modified.priority as string}</span></div>
            <div>
              <span className="text-slate-500 block mb-1">Resources:</span>
              <ul className="pl-4 list-disc marker:text-indigo-300">
                {(modified.resources_to_dispatch as string[])?.map(r => <li key={r} className="capitalize">{r.replace(/_/g, ' ')}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {(modified.modified_notes as string) && (
        <div className="mt-4 text-sm bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="font-bold text-slate-700 dark:text-slate-300">Operator Reason: </span>
          <span className="text-slate-600 dark:text-slate-400 italic">&quot;{modified.modified_notes as string}&quot;</span>
        </div>
      )}
    </div>
  );
}
