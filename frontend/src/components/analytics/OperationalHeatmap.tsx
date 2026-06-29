import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Map, Zap } from 'lucide-react';

export function OperationalHeatmap() {
  const { zones } = useAnalyticsStore();

  const getHeatColor = (val: number) => {
    if (val > 80) return 'bg-rose-500';
    if (val > 50) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Map className="w-5 h-5 text-indigo-500" />
          Geographic Intelligence
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {zones.map(zone => (
            <div key={zone.name} className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700 relative overflow-hidden">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                {zone.name} Zone
                {zone.incidentDensity > 80 && <Zap className="w-3.5 h-3.5 text-rose-500 animate-pulse" />}
              </h4>
              
              <div className="space-y-3 z-10 relative">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <span>Incident Density</span>
                    <span>{zone.incidentDensity}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${getHeatColor(zone.incidentDensity)}`} style={{ width: `${zone.incidentDensity}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <span>Resource Load</span>
                    <span>{zone.resourceLoad}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${getHeatColor(zone.resourceLoad)}`} style={{ width: `${zone.resourceLoad}%` }} />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg ETA</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{zone.avgEtaMins}m</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
