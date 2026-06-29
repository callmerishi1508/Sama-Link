import React from 'react';
import { Truck } from 'lucide-react';

export function ResourceSettings() {
  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Resource Management Policies</h2>
        <p className="text-sm text-slate-500 mt-1">Configure global resource capacities, limits, and shift constraints.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-500" /> Operational Limits
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Max Dispatch Distance</div>
                <div className="text-xs text-slate-500">Maximum ETA limit for cross-zone dispatch before requiring Commander approval.</div>
              </div>
              <select className="h-9 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                <option>15 Minutes</option>
                <option>20 Minutes</option>
                <option>30 Minutes</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Hospital Saturation Threshold</div>
                <div className="text-xs text-slate-500">Trigger regional divert protocols when hospital occupancy exceeds this level.</div>
              </div>
              <select className="h-9 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                <option>90%</option>
                <option>95%</option>
                <option>98%</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
