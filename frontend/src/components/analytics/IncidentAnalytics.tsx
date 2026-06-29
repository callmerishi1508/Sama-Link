import React from 'react';
import { Target, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function IncidentAnalytics() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          Incident Intelligence
        </h3>
        <Link href="/incidents" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1">
          Active Incidents <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> What Happened? (7-Day Trend)
          </h4>
          <div className="flex h-64 items-end justify-between border-b border-l border-slate-200 dark:border-slate-700 px-2 pb-1">
            {[40, 65, 45, 80, 110, 90, 70].map((h, i) => (
              <div key={i} className="w-1/12 bg-indigo-500/80 rounded-t-sm relative group" style={{ height: `${Math.min(h, 100)}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono px-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Why & Action
          </h4>
          <div className="bg-rose-50 dark:bg-rose-500/10 p-4 rounded-lg border border-rose-100 dark:border-rose-500/20">
            <div className="text-xs font-bold text-rose-800 dark:text-rose-400 mb-1">Thursday Spike (110 Incidents)</div>
            <div className="text-xs text-rose-700 dark:text-rose-300">Weather-related traffic collisions in Sector 4 caused a 35% load increase.</div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-1">Recommended Action</div>
            <div className="text-xs text-emerald-700 dark:text-emerald-300">Pre-deploy traffic units during similar weather forecasts.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
