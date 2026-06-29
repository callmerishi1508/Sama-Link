import React from 'react';
import { useHistoryStore } from '@/stores/history-store';
import { Archive, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function HistoryOverview() {
  const { incidents } = useHistoryStore();

  const totalIncidents = incidents.length;
  const avgResolutionTime = totalIncidents > 0 
    ? incidents.reduce((acc, inc) => acc + inc.resolutionTimeMs, 0) / totalIncidents 
    : 0;
  
  const avgResolutionMins = Math.round(avgResolutionTime / 60000);
  
  const totalOverrides = incidents.reduce((acc, inc) => acc + inc.humanOverrides, 0);
  
  const aiAcceptanceRate = totalIncidents > 0 
    ? Math.round((incidents.filter(inc => inc.aiAcceptance).length / totalIncidents) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Archive className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-500">Archived Incidents</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">{totalIncidents}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-500">Avg Resolution Time</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">{avgResolutionMins}m</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-500">Human Overrides</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">{totalOverrides}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-500">AI Acceptance Rate</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">{aiAcceptanceRate}%</div>
        </div>
      </div>
    </div>
  );
}
