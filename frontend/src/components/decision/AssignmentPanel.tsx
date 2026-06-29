import { useState } from "react";
import { useDecisionStore } from "@/stores/decision-store";
import { Button } from "@/components/ui/button";
import { CornerUpRight, X, UserPlus } from "lucide-react";

export function AssignmentPanel() {
  const activePanel = useDecisionStore(state => state.activePanel);
  const setActivePanel = useDecisionStore(state => state.setActivePanel);
  const addAuditLog = useDecisionStore(state => state.addAuditLog);
  const setLifecycleState = useDecisionStore(state => state.setLifecycleState);

  const [role, setRole] = useState("Field Supervisor");
  const [notes, setNotes] = useState("");

  if (activePanel !== 'ASSIGN') return null;

  const handleAssign = () => {
    setLifecycleState('UNDER_REVIEW');
    addAuditLog({ action: `Assigned to ${role}`, details: notes || 'Transferred command' });
    setActivePanel('NONE');
  };

  return (
    <div className="mt-4 p-5 bg-purple-50/50 dark:bg-purple-500/5 rounded-2xl border border-purple-200 dark:border-purple-900/50 shadow-sm animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-4 text-purple-700 dark:text-purple-400">
        <h4 className="text-sm font-bold flex items-center gap-2"><CornerUpRight className="w-4 h-4" /> Forward Assignment</h4>
        <Button variant="ghost" size="sm" onClick={() => setActivePanel('NONE')} className="h-8 w-8 p-0 rounded-full text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-purple-600 dark:text-purple-500">Assign To</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 rounded-lg p-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Dispatcher</option>
            <option>Field Supervisor</option>
            <option>Medical Officer</option>
            <option>Police Coordinator</option>
            <option>NGO Coordinator</option>
            <option>Volunteer Lead</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-purple-600 dark:text-purple-500">Handoff Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px]"
            placeholder="Context for the assignee..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={handleAssign} className="bg-purple-600 hover:bg-purple-700 text-white gap-2 rounded-xl h-10 px-6">
            <UserPlus className="w-4 h-4" />
            Assign Operator
          </Button>
        </div>
      </div>
    </div>
  );
}
