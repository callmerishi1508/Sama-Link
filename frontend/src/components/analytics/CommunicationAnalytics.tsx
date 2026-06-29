import React from 'react';
import { Radio, AlertTriangle, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CommunicationAnalytics() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-indigo-500" />
          Communication Intelligence
        </h3>
        <Link href="/communications" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1">
          Comms Center <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> Channel Health
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 mb-1">Radio Network</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">99.9%</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 mb-1">SMS Gateway</div>
              <div className="text-lg font-bold text-rose-600 dark:text-rose-400">94.2%</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Escalations
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700 h-full">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl font-black text-amber-500">4.2%</div>
              <div className="text-xs text-slate-500 leading-tight">Messages escalated due to timeout.</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Recommended Action
          </div>
          <div className="bg-amber-50 dark:bg-amber-500/10 p-4 rounded-xl border border-amber-100 dark:border-amber-500/20 h-full">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-2">SMS Gateway Latency</div>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Switching primary notification channels to encrypted push until SMS provider resolves latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
