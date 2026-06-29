import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Cpu, ShieldAlert, CheckCircle2, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function DecisionAnalytics() {
  const { aiEffectiveness } = useAnalyticsStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          AI & Decision Intelligence
        </h3>
        <Link href="/history" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1">
          Decision History <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">AI Recommendation Effectiveness</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Accepted</span>
              <span className="font-bold font-mono">{aiEffectiveness.accepted}%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><TrendingDown className="w-4 h-4 text-amber-500" /> Modified</span>
              <span className="font-bold font-mono">{aiEffectiveness.modified}%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300"><ShieldAlert className="w-4 h-4 text-rose-500" /> Rejected</span>
              <span className="font-bold font-mono">{aiEffectiveness.rejected}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Why & Action</h4>
          <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">High Modification Rate in Sector 4</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Operators are consistently modifying AI routing recommendations in Sector 4 due to ongoing construction not yet reflected in the mapping data.
            </div>
            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider border-t border-slate-200 dark:border-slate-700 pt-2">
              Action: Force map synchronization with municipal DB.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
