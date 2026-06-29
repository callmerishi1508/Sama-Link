import { useDecisionStore } from "@/stores/decision-store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, CornerUpRight, FileText, Info } from "lucide-react";
import { useState } from "react";

export function DecisionControls() {
  const lifecycleState = useDecisionStore(state => state.lifecycleState);
  const activePanel = useDecisionStore(state => state.activePanel);
  const setActivePanel = useDecisionStore(state => state.setActivePanel);
  const setLifecycleState = useDecisionStore(state => state.setLifecycleState);
  const addAuditLog = useDecisionStore(state => state.addAuditLog);

  const [reason, setReason] = useState("");

  if (['APPROVED', 'DISPATCH_AUTHORIZED', 'INCIDENT_ACTIVE', 'CLOSED'].includes(lifecycleState)) {
    return null;
  }

  const handleApprove = () => {
    if (!reason.trim()) {
      alert("A reasoning is required to approve this dispatch plan.");
      return;
    }
    setLifecycleState('APPROVED');
    addAuditLog({ action: 'Approved AI Plan', reason: reason });
    setReason("");
  };

  const handleReject = () => {
    if (!reason.trim()) {
      alert("A reasoning is required to reject this dispatch plan.");
      return;
    }
    setLifecycleState('REJECTED');
    addAuditLog({ action: 'Rejected AI Plan', reason: reason });
    setReason("");
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase">Decision Rationale (Required)</label>
        <textarea 
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Provide rationale for your decision to approve, reject, or modify..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[60px]"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Button 
          onClick={handleApprove}
          disabled={!reason.trim()}
          className="md:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-bold h-12 shadow-sm hover:shadow-emerald-500/20 disabled:opacity-50"
        >
          <CheckCircle2 className="w-5 h-5" />
          Approve Plan
        </Button>

        <Button 
          variant="outline" 
          onClick={() => setActivePanel(activePanel === 'MODIFY' ? 'NONE' : 'MODIFY')}
          className={`rounded-xl gap-2 font-bold h-12 ${activePanel === 'MODIFY' ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        >
          <FileText className="w-4 h-4" /> 
          Modify
        </Button>

        <Button 
          variant="outline" 
          onClick={() => setActivePanel(activePanel === 'ESCALATE' ? 'NONE' : 'ESCALATE')}
          className={`rounded-xl gap-2 font-bold h-12 ${activePanel === 'ESCALATE' ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        >
          <AlertCircle className="w-4 h-4" /> 
          Escalate
        </Button>

        <Button 
          variant="outline" 
          onClick={() => setActivePanel(activePanel === 'REQUEST_INFO' ? 'NONE' : 'REQUEST_INFO')}
          className={`rounded-xl gap-2 font-bold h-12 ${activePanel === 'REQUEST_INFO' ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        >
          <Info className="w-4 h-4" /> 
          Req Info
        </Button>

        <Button 
          variant="outline" 
          onClick={() => setActivePanel(activePanel === 'ASSIGN' ? 'NONE' : 'ASSIGN')}
          className={`rounded-xl gap-2 font-bold h-12 ${activePanel === 'ASSIGN' ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        >
          <CornerUpRight className="w-4 h-4" /> 
          Forward
        </Button>

        <Button 
          variant="outline" 
          onClick={handleReject}
          disabled={!reason.trim()}
          className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 dark:border-rose-900/50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded-xl gap-2 font-bold h-12 col-span-2 md:col-span-1 disabled:opacity-50"
        >
          <XCircle className="w-4 h-4" /> Reject
        </Button>
      </div>
    </div>
  );
}
