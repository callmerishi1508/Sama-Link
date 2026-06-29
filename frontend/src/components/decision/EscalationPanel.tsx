import { useState } from "react";
import { useDecisionStore } from "@/stores/decision-store";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

export function EscalationPanel() {
  const activePanel = useDecisionStore(state => state.activePanel);
  const setActivePanel = useDecisionStore(state => state.setActivePanel);
  const addAuditLog = useDecisionStore(state => state.addAuditLog);
  const setLifecycleState = useDecisionStore(state => state.setLifecycleState);

  const [level, setLevel] = useState("District Command");
  const [reason, setReason] = useState("");

  if (activePanel !== 'ESCALATE') return null;

  const handleEscalate = () => {
    setLifecycleState('ESCALATED');
    addAuditLog({ action: `Escalated to ${level}`, reason: reason || 'Operational requirements exceeded local capacity' });
    setActivePanel('NONE');
  };

  return (
    <div className="mt-4 p-5 bg-rose-50/50 dark:bg-rose-500/5 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-4 text-rose-700 dark:text-rose-400">
        <h4 className="text-sm font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Escalate Incident</h4>
        <Button variant="ghost" size="sm" onClick={() => setActivePanel('NONE')} className="h-8 w-8 p-0 rounded-full text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-rose-600 dark:text-rose-500">Escalation Level</label>
          <select 
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-lg p-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option>District Command</option>
            <option>Regional HQ</option>
            <option>State Emergency Operations Center</option>
            <option>National Disaster Authority</option>
            <option>Mutual Aid Request</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-rose-600 dark:text-rose-500">Reason for Escalation</label>
          <textarea 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 rounded-lg p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 min-h-[80px]"
            placeholder="Provide explicit justification for escalating..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={handleEscalate} className="bg-rose-600 hover:bg-rose-700 text-white gap-2 rounded-xl h-10 px-6">
            <AlertTriangle className="w-4 h-4" />
            Confirm Escalation
          </Button>
        </div>
      </div>
    </div>
  );
}
