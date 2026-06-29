import React from 'react';
import { useHistoryStore } from '@/stores/history-store';
import { Users, TrendingUp, Zap, Clock } from 'lucide-react';

export function OperatorActivity() {
  const { operatorStats } = useHistoryStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 shrink-0">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          Operator Performance
        </h3>
      </div>
      <div className="flex-1 p-6 space-y-6">
        {operatorStats.map(op => (
          <div key={op.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{op.name}</h4>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{op.shift} Shift</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 uppercase tracking-wider">
                {op.incidentsManaged} Incidents
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3" /> Avg Decision
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {(op.avgDecisionTimeMs / 1000).toFixed(1)}s
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3" /> Approvals
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {op.approvals}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-amber-500" /> Overrides
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {op.overrides}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <ShieldAlertIcon className="w-3 h-3 text-rose-500" /> Escalations
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {op.escalations}
                </div>
              </div>
            </div>
          </div>
        ))}
        {operatorStats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-6 text-center">
            <Users className="w-10 h-10 mb-3 text-slate-300 dark:text-slate-700" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">No Operator Data</h4>
            <p className="text-xs">No operators have logged activity in the current session.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ShieldAlertIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
    </svg>
  );
}
