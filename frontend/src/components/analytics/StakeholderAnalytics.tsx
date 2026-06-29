import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Building2, Clock } from 'lucide-react';

export function StakeholderAnalytics() {
  const { stakeholders } = useAnalyticsStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-500" />
          Stakeholder Intelligence
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
          <thead className="text-[10px] uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-800 tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Stakeholder</th>
              <th className="px-6 py-4 font-bold">Type</th>
              <th className="px-6 py-4 font-bold">Avg Response</th>
              <th className="px-6 py-4 font-bold">Acceptance Rate</th>
              <th className="px-6 py-4 font-bold">Completion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {stakeholders.map(sh => (
              <tr key={sh.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white">{sh.name}</div>
                  <div className="text-xs text-slate-500">{sh.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px] font-bold uppercase tracking-wider">
                    {sh.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 font-mono text-slate-900 dark:text-white">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {sh.responseTimeMins === 0 ? '< 1m' : `${sh.responseTimeMins.toFixed(1)}m`}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-emerald-600 dark:text-emerald-400">{sh.acceptanceRate}%</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${sh.completionRate}%` }} />
                    </div>
                    <span className="font-mono text-xs">{sh.completionRate}%</span>
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
