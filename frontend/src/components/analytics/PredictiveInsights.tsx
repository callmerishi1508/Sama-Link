import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Sparkles, Clock } from 'lucide-react';

export function PredictiveInsights() {
  const { predictiveInsights } = useAnalyticsStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-indigo-50 dark:bg-indigo-500/10">
        <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          Predictive Insights
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictiveInsights.map(insight => (
          <div key={insight.id} className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-5 border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-xl" />
            <div className="flex justify-between items-start mb-3">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> {insight.timeframe}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                  {insight.confidenceScore}% Conf
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  insight.confidence === 'High' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                }`}>
                  {insight.confidence}
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
              {insight.insight}
            </p>
            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sources</div>
              <div className="flex flex-wrap gap-1">
                {insight.sources.map(src => (
                  <span key={src} className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-[9px]">
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
