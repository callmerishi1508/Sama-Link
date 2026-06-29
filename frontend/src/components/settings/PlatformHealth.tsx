import React from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import {  CheckCircle2, AlertTriangle, XCircle, Wrench } from 'lucide-react';

export function PlatformHealth() {
  const { moduleHealth } = useSettingsStore();

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Platform Health</h2>
        <p className="text-sm text-slate-500 mt-1">Live status of platform subsystems and their dependencies.</p>
      </div>

      <div className="space-y-4">
        {moduleHealth.map((mod, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className={`px-6 py-4 border-b ${
              mod.status === 'Healthy' ? 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10' :
              mod.status === 'Degraded' ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/10' :
              'bg-rose-50/50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/10'
            } flex items-center justify-between`}>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                {mod.status === 'Healthy' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                 mod.status === 'Degraded' ? <AlertTriangle className="w-5 h-5 text-amber-500" /> :
                 <XCircle className="w-5 h-5 text-rose-500" />}
                {mod.module}
              </h3>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                mod.status === 'Healthy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                mod.status === 'Degraded' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'
              }`}>
                {mod.status}
              </span>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Dependencies</div>
                <div className="flex flex-wrap gap-2">
                  {mod.dependencies.map(dep => (
                    <span key={dep} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded border border-slate-200 dark:border-slate-700">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
              
              {mod.status !== 'Healthy' && (
                <div className="space-y-4">
                  {mod.affectedFeatures.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-2">Affected Features</div>
                      <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc pl-4 space-y-1">
                        {mod.affectedFeatures.map((feat, i) => <li key={i}>{feat}</li>)}
                      </ul>
                    </div>
                  )}
                  {mod.recommendedAction && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5" /> Recommended Action
                      </div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {mod.recommendedAction}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
