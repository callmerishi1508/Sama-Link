import { useCommandCenterStore } from '@/stores/command-center-store';
import { Activity, AlertTriangle, Battery, ShieldAlert } from 'lucide-react';

export function ResourceHeatMap() {
  const zones = useCommandCenterStore(state => state.zones);

  const getHeatColor = (val: number, inverse = false) => {
    // If inverse, higher is better (e.g., available ambulances). Otherwise, higher is worse (saturation).
    const isCritical = inverse ? val < 30 : val > 90;
    const isWarning = inverse ? val < 50 : val > 75;
    
    if (isCritical) return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50';
    if (isWarning) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50';
    return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50';
  };

  const getMessage = (val: number, inverse = false) => {
    const isCritical = inverse ? val < 30 : val > 90;
    const isWarning = inverse ? val < 50 : val > 75;

    if (isCritical) return <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Critical shortage / Diversion</span>;
    if (isWarning) return <span className="flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Warning / Approaching limit</span>;
    return <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Healthy capacity</span>;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
        <Battery className="w-4 h-4 text-indigo-500" /> Resource Pressure
      </h3>
      
      <div className="space-y-4">
        {zones.map(zone => (
          <div key={zone.name} className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{zone.name}</h4>
              <div className="flex gap-2">
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-sm ${getHeatColor(zone.hospitalSaturation)}`}>
                  H: {zone.hospitalSaturation}%
                </span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-sm ${getHeatColor(zone.ambulances, true)}`}>
                  A: {zone.ambulances}%
                </span>
              </div>
            </div>
            
            {/* Minimal Bars */}
            <div className="flex gap-1">
              <div className="w-1/2 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${zone.hospitalSaturation > 90 ? 'bg-rose-500' : zone.hospitalSaturation > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${zone.hospitalSaturation}%` }} />
              </div>
              <div className="w-1/2 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${zone.ambulances < 30 ? 'bg-rose-500' : zone.ambulances < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${zone.ambulances}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
