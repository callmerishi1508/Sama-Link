import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { BarChart3, Activity } from 'lucide-react';

export function CommunicationAnalytics() {
  const { channelHealth } = useCommunicationStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-500" />
          Channel Performance
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {channelHealth.map(ch => (
          <div key={ch.channel} className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">{ch.channel}</span>
              <span className="text-slate-500">{ch.successRate}% Success</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  ch.successRate > 98 ? 'bg-emerald-500' : 
                  ch.successRate > 95 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${ch.successRate}%` }}
              />
            </div>
          </div>
        ))}

        <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" /> Insight
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            SMS latency is currently elevated (avg 4.5s) compared to baseline. Push notifications and Radio are providing the most reliable delivery metrics for active operations.
          </p>
        </div>
      </div>
    </div>
  );
}
