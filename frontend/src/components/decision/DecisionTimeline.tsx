import { useDecisionStore } from "@/stores/decision-store";
import { GitCommit, Clock } from "lucide-react";

export function DecisionTimeline() {
  const auditLogs = useDecisionStore(state => state.auditLogs);

  if (auditLogs.length === 0) return null;

  return (
    <div className="bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50">
      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <GitCommit className="w-4 h-4 text-indigo-500" />
        Decision Timeline
      </h4>
      
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
        {auditLogs.map((log) => (
          <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10" />
            
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{log.action}</span>
                <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {log.reason && <p className="text-xs text-slate-500 italic mb-1">&quot;{log.reason}&quot;</p>}
              {log.details && <p className="text-xs text-slate-600 dark:text-slate-400">{log.details}</p>}
              <div className="text-[10px] font-bold text-indigo-500/80 mt-1 uppercase tracking-wider">{log.operator}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
