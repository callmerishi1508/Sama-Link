import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Filter } from 'lucide-react';

export function IncidentLifecycleFunnel() {
  const { funnelStages } = useAnalyticsStore();
  
  if (funnelStages.length === 0) return null;
  
  const maxCount = funnelStages[0].count;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-500" />
          Incident Lifecycle Funnel
        </h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col gap-3">
          {funnelStages.map((stage, idx) => {
            const widthPct = (stage.count / maxCount) * 100;
            return (
              <div key={idx} className="relative flex items-center justify-center">
                <div className="w-full flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 z-10 px-4 pointer-events-none absolute inset-0">
                  <span className="text-slate-900 dark:text-white">{stage.stage}</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{stage.count}</span>
                </div>
                
                <div 
                  className="bg-indigo-100 dark:bg-indigo-500/20 h-8 rounded-full border border-indigo-200 dark:border-indigo-500/30 transition-all duration-500 relative flex items-center group"
                  style={{ width: `${widthPct}%` }}
                >
                  {stage.dropOffReason && (
                    <div className="absolute right-[-140px] opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20">
                      -{stage.dropOffPercentage}%: {stage.dropOffReason}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
