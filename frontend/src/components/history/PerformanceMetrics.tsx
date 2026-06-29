import React from 'react';
import { useHistoryStore } from '@/stores/history-store';
import { Activity, BarChart3, Zap, Clock, Users } from 'lucide-react';

export function PerformanceMetrics() {
  const { incidents } = useHistoryStore();
  
  if (incidents.length === 0) return null;

  const avgAiTime = incidents.reduce((acc, inc) => acc + inc.aiRecommendationTimeMs, 0) / incidents.length;
  const avgApprovalTime = incidents.reduce((acc, inc) => acc + inc.humanApprovalTimeMs, 0) / incidents.length;
  const avgCommTime = incidents.reduce((acc, inc) => acc + inc.communicationTimeMs, 0) / incidents.length;
  const avgDispatchTime = incidents.reduce((acc, inc) => acc + inc.dispatchTimeMs, 0) / incidents.length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 shrink-0">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Global Performance
        </h3>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> AI Processing</span>
              <span className="font-mono">{(avgAiTime / 1000).toFixed(1)}s</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min((avgAiTime / 60000) * 100, 100)}%` }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Human Approval</span>
              <span className="font-mono">{(avgApprovalTime / 1000).toFixed(1)}s</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min((avgApprovalTime / 60000) * 100, 100)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1 font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> Comms Delivery</span>
              <span className="font-mono">{(avgCommTime / 1000).toFixed(1)}s</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min((avgCommTime / 60000) * 100, 100)}%` }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Dispatch Delay</span>
              <span className="font-mono">{(avgDispatchTime / 1000).toFixed(1)}s</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((avgDispatchTime / 60000) * 100, 100)}%` }} />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 leading-relaxed">
            Overall operational latency is currently within acceptable limits. Human approval accounts for the largest segment of pre-dispatch latency.
          </p>
        </div>
      </div>
    </div>
  );
}
