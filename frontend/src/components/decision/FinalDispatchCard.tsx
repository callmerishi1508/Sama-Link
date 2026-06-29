import React from "react";
import { useDecisionStore } from "@/stores/decision-store";
import { useAnalysisStore } from "@/stores/analysis-store";
import { RadioTower, Users, ShieldCheck, Siren, Printer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalDispatchCard() {
  const lifecycleState = useDecisionStore(state => state.lifecycleState);
  const finalPlan = useDecisionStore(state => state.finalPlan);
  const operator = useDecisionStore(state => state.operator);
  const response = useAnalysisStore(state => state.response);

  const [incidentId] = React.useState(() => "INC-" + Math.floor(Math.random() * 9000 + 1000));
  const activePlan = finalPlan || response?.decision;
  const isModified = !!finalPlan?.modified;

  if (lifecycleState !== 'DISPATCH_AUTHORIZED' && lifecycleState !== 'INCIDENT_ACTIVE') return null;
  if (!activePlan) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-lg relative overflow-hidden mt-6">
      
      {/* Header Bar */}
      <div className="bg-emerald-600 dark:bg-emerald-900/40 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <RadioTower className="w-5 h-5" />
          <h2 className="text-sm font-black uppercase tracking-wider">Official Dispatch Order</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold font-mono bg-emerald-700 dark:bg-emerald-800/50 px-2 py-1 rounded">ID: {incidentId}</span>
          <Button variant="ghost" size="sm" className="h-8 hover:bg-emerald-700/50 text-white rounded-full">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Operational Plan</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white capitalize flex items-center gap-3">
              {(activePlan?.recommended_action as string)?.replace(/_/g, ' ')}
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            {isModified && <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-2">Note: This plan was modified from the original AI recommendation.</div>}
          </div>
          <div className="text-left md:text-right">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Priority Classification</div>
            <div className="text-xl font-black text-rose-600 dark:text-rose-400">{activePlan?.priority as string}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Siren className="w-3.5 h-3.5" /> Resources</div>
            <ul className="space-y-1">
              {(activePlan?.resources_to_dispatch as string[])?.map((r: string) => (
                <li key={r} className="text-sm font-bold text-slate-900 dark:text-white capitalize">• {r.replace(/_/g, ' ')}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Stakeholders</div>
            <ul className="space-y-1">
              {(activePlan?.stakeholders_to_notify as string[])?.map((s: string) => (
                <li key={s} className="text-sm font-bold text-slate-900 dark:text-white capitalize">• {s.replace(/_/g, ' ')}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Authorization</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{operator}</div>
            <div className="text-xs text-slate-500">{new Date().toLocaleTimeString()}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">Expected ETA</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">6 Minutes</div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Operational Notes</div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {((activePlan as Record<string, unknown>)?.modified_notes as string) || "Proceed with standard dispatch protocols. All elements approved."}
          </p>
        </div>
      </div>
    </div>
  );
}
