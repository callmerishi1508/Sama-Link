import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Activity, XCircle, Wrench, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export function OperationalBottlenecks() {
  const { bottlenecks } = useAnalyticsStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-500" />
          Friction & Bottlenecks
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bottlenecks.map(b => (
          <div key={b.id} className="bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
            <div className="p-4 bg-amber-50/50 dark:bg-amber-500/5 border-b border-amber-100 dark:border-amber-500/10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wider mb-2">
                  <XCircle className="w-4 h-4" /> Bottleneck
                </div>
                <div className="font-bold text-slate-900 dark:text-white">{b.reason}</div>
              </div>
              <Link href={`/history/INC-${b.id}`} className="text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 p-1">
                <PlayCircle className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="p-4 flex-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Impact</div>
              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {b.impact}
              </div>
              
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Recommended Action</div>
              <div className="flex items-start gap-2 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <Wrench className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                  {b.recommendedAction}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
