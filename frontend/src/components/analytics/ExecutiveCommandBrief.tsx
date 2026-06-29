import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { ShieldAlert, AlertTriangle, TrendingDown, Clock, ShieldCheck } from 'lucide-react';

export function ExecutiveCommandBrief() {
  const { executiveBrief } = useAnalyticsStore();

  const getStatusStyle = () => {
    switch (executiveBrief.statusLevel) {
      case 'Normal': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Warning': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Critical': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5 text-indigo-500" /> Executive Command Brief
        </h2>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusStyle()}`}>
            {executiveBrief.statusLevel}
          </span>
          <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 transition-colors">
            Generate Brief
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1 border-r border-slate-100 dark:border-slate-800 pr-6">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Current Status</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {executiveBrief.currentStatus}
          </div>
        </div>

        <div className="lg:col-span-1 border-r border-slate-100 dark:border-slate-800 pr-6">
          <div className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Biggest Risk
          </div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">
            {executiveBrief.biggestRisk}
          </div>
        </div>

        <div className="lg:col-span-1 border-r border-slate-100 dark:border-slate-800 pr-6">
          <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> Bottleneck
          </div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">
            {executiveBrief.bottleneck}
          </div>
        </div>

        <div className="lg:col-span-1 border-r border-slate-100 dark:border-slate-800 pr-6">
          <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Predicted Next 30m
          </div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">
            {executiveBrief.next30Mins}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Command Rec
          </div>
          <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 leading-tight bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
            {executiveBrief.commandRecommendation}
          </div>
        </div>
      </div>
    </div>
  );
}
