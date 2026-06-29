import { useState } from "react";
import { useDecisionStore } from "@/stores/decision-store";
import { useAnalysisStore } from "@/stores/analysis-store";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

export function ModifyPlanPanel() {
  const activePanel = useDecisionStore(state => state.activePanel);
  const setActivePanel = useDecisionStore(state => state.setActivePanel);
  const addAuditLog = useDecisionStore(state => state.addAuditLog);
  const setLifecycleState = useDecisionStore(state => state.setLifecycleState);
  const setFinalPlan = useDecisionStore(state => state.setFinalPlan);
  const response = useAnalysisStore(state => state.response);

  const [notes, setNotes] = useState("");

  if (activePanel !== 'MODIFY' || !response) return null;

  const handleSave = () => {
    // In a real app, this would capture all form state (modified resources, etc.)
    setFinalPlan({
      ...response.decision,
      modified_notes: notes,
      modified: true
    });
    setLifecycleState('MODIFIED');
    addAuditLog({ action: 'Modified Operational Plan', details: notes || 'Resources updated manually' });
    setActivePanel('NONE');
  };

  return (
    <div className="mt-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Modify Resource Allocation</h4>
        <Button variant="ghost" size="sm" onClick={() => setActivePanel('NONE')} className="h-8 w-8 p-0 rounded-full">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Mock editable fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Add Resource</label>
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Select Resource...</option>
              <option>Ambulance (ALS)</option>
              <option>Fire Engine</option>
              <option>Police Patrol</option>
              <option>NGO Volunteers</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Change Priority</label>
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" defaultValue={response.decision.priority}>
              <option value="IMMEDIATE">Immediate</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500">Modification Notes (Required for Audit)</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
            placeholder="Why are you changing the AI recommendation?"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-xl h-10 px-6">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
