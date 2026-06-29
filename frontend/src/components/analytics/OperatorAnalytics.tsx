import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Users, Clock, ShieldAlert } from 'lucide-react';

export function OperatorAnalytics() {
  const { operators } = useAnalyticsStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          Operator Intelligence
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
          <thead className="text-[10px] uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-800 tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Operator</th>
              <th className="px-6 py-4 font-bold">Incidents</th>
              <th className="px-6 py-4 font-bold">Avg Decision</th>
              <th className="px-6 py-4 font-bold">Approvals</th>
              <th className="px-6 py-4 font-bold">Escalations</th>
              <th className="px-6 py-4 font-bold">Dispatch Acc.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {operators.map(op => (
              <tr key={op.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white">{op.name}</div>
                  <div className="text-xs text-slate-500">{op.id}</div>
                </td>
                <td className="px-6 py-4 font-mono font-medium">{op.incidentsManaged}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {(op.avgDecisionTimeMs / 1000).toFixed(1)}s
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-emerald-600 dark:text-emerald-400">{op.approvals}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 font-mono">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    {op.escalations}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${op.dispatchAccuracy}%` }} />
                    </div>
                    <span className="font-mono text-xs">{op.dispatchAccuracy}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
