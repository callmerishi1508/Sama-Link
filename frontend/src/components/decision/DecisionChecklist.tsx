import { useDecisionStore } from "@/stores/decision-store";
import { CheckSquare, Square, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DecisionChecklist() {
  const checklist = useDecisionStore(state => state.checklist);
  const toggleChecklist = useDecisionStore(state => state.toggleChecklist);
  const lifecycleState = useDecisionStore(state => state.lifecycleState);
  const setLifecycleState = useDecisionStore(state => state.setLifecycleState);
  const addAuditLog = useDecisionStore(state => state.addAuditLog);

  // Only show checklist when we're at the approval/dispatch prep stage
  if (lifecycleState !== 'APPROVED' && lifecycleState !== 'RESOURCES_CONFIRMED') return null;

  const isAllChecked = Object.values(checklist).every(Boolean);

  const handleDispatch = () => {
    setLifecycleState('DISPATCH_AUTHORIZED');
    addAuditLog({ action: 'Authorized Final Dispatch', details: 'All checklist items verified' });
  };

  const renderCheckItem = (id: keyof typeof checklist, label: string) => (
    <div 
      key={id}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
      onClick={() => toggleChecklist(id)}
    >
      {checklist[id] ? (
        <CheckSquare className="w-5 h-5 text-emerald-500" />
      ) : (
        <Square className="w-5 h-5 text-slate-400" />
      )}
      <span className={`text-sm font-bold ${checklist[id] ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 border-2 border-slate-200/60 dark:border-slate-800/60 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Pre-Dispatch Checklist</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {renderCheckItem("riskReviewed", "Risk Assessed")}
        {renderCheckItem("resourcesVerified", "Resources Confirmed")}
        {renderCheckItem("stakeholdersNotified", "Stakeholders Routed")}
        {renderCheckItem("humanApproved", "Decision Reason Entered & Approved")}
        {renderCheckItem("dispatchReady", "Ready for Dispatch")}
      </div>

      {!isAllChecked && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-xl flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Dispatch authorization is locked. You must explicitly verify all checklist requirements above before the operation can proceed.</span>
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
        <Button 
          disabled={!isAllChecked}
          onClick={handleDispatch}
          className={`h-12 px-8 rounded-xl font-bold gap-2 transition-all ${isAllChecked ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'}`}
        >
          <CheckCircle2 className="w-5 h-5" />
          Authorize Dispatch
        </Button>
      </div>
    </div>
  );
}
