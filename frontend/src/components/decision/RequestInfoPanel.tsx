import { useState } from "react";
import { useDecisionStore } from "@/stores/decision-store";
import { Button } from "@/components/ui/button";
import { Info, X, Send } from "lucide-react";

export function RequestInfoPanel() {
  const activePanel = useDecisionStore(state => state.activePanel);
  const setActivePanel = useDecisionStore(state => state.setActivePanel);
  const addAuditLog = useDecisionStore(state => state.addAuditLog);

  const [requestType, setRequestType] = useState("Exact Location");
  const [details, setDetails] = useState("");

  if (activePanel !== 'REQUEST_INFO') return null;

  const handleRequest = () => {
    addAuditLog({ action: `Requested Info: ${requestType}`, details: details || 'Awaiting field confirmation' });
    setActivePanel('NONE');
  };

  return (
    <div className="mt-4 p-5 bg-sky-50/50 dark:bg-sky-500/5 rounded-2xl border border-sky-200 dark:border-sky-900/50 shadow-sm animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-4 text-sky-700 dark:text-sky-400">
        <h4 className="text-sm font-bold flex items-center gap-2"><Info className="w-4 h-4" /> Request Information</h4>
        <Button variant="ghost" size="sm" onClick={() => setActivePanel('NONE')} className="h-8 w-8 p-0 rounded-full text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-sky-600 dark:text-sky-500">Information Type</label>
          <select 
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 rounded-lg p-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option>Exact Location</option>
            <option>Victim Count</option>
            <option>Photos / Video</option>
            <option>Caller Contact</option>
            <option>Medical Status</option>
            <option>Hazard Details</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-sky-600 dark:text-sky-500">Message / Context</label>
          <textarea 
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 rounded-lg p-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500 min-h-[80px]"
            placeholder="Specify what exactly is needed..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={handleRequest} className="bg-sky-600 hover:bg-sky-700 text-white gap-2 rounded-xl h-10 px-6">
            <Send className="w-4 h-4" />
            Send Request
          </Button>
        </div>
      </div>
    </div>
  );
}
