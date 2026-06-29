import React from 'react';
import { Truck, Building, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ResourceAnalytics() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-500" />
          Resource Intelligence
        </h3>
        <Link href="/resources" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1">
          Resource Center <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Building className="w-3.5 h-3.5" /> Hospital Occupancy
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">92%</div>
            <div className="text-xs text-slate-500 z-10 relative">North Zone Critical</div>
            <div className="absolute bottom-0 left-0 h-1 bg-rose-500 w-[92%]" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> Fleet Readiness
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Ambulance</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">85% Ready</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-emerald-500 w-[85%]" />
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Fire/Rescue</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">90% Ready</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[90%]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Recommended Action
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-500/20 h-full">
            <div className="text-xs font-bold text-indigo-800 dark:text-indigo-400 mb-2">Implement Divert Protocol</div>
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              Hospital occupancy in North Zone requires immediate diversion of non-critical patients to East Zone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
