import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Activity, ArrowUpRight, ArrowDownRight, Link } from 'lucide-react';

export function AnalyticsOverview() {
  const { correlations } = useAnalyticsStore();

  const renderTrend = (trend: 'Up' | 'Down') => {
    if (trend === 'Up') return <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />;
    return <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Cross-Analytics Correlation
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {correlations.map(corr => (
          <div key={corr.id} className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Cause</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  {corr.causeMetric} {renderTrend(corr.causeTrend)}
                </div>
              </div>
              <div className="mx-2 text-indigo-300 dark:text-indigo-500/50">
                <Link className="w-5 h-5" />
              </div>
              <div className="flex-1 text-right">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Effect</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-end gap-1">
                  {corr.effectMetric} {renderTrend(corr.effectTrend)}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-700">
              {corr.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
