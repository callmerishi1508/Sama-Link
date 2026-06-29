import { Activity, Clock, AlertTriangle, Navigation, Zap, BatteryCharging } from "lucide-react";
import { useResourceStore } from "@/stores/resource-store";

export function OperationsSummary() {
  const units = useResourceStore(state => state.units);

  const totalUnits = units.length;
  const availableUnits = units.filter(u => u.status === 'Available').length;
  const busyUnits = totalUnits - availableUnits;
  
  const resourceReadiness = Math.round((availableUnits / totalUnits) * 100) || 0;
  const resourceUtilization = Math.round((busyUnits / totalUnits) * 100) || 0;

  const stats = [
    { label: 'Readiness', val: `${resourceReadiness}%`, icon: BatteryCharging, color: 'text-emerald-500' },
    { label: 'Utilization', val: `${resourceUtilization}%`, icon: Activity, color: 'text-indigo-500' },
    { label: 'Pending Dispatch', val: '1', icon: Clock, color: 'text-amber-500' },
    { label: 'Avg ETA', val: '4m', icon: Navigation, color: 'text-blue-500' },
    { label: 'Shortages', val: '1', icon: AlertTriangle, color: 'text-rose-500' },
    { label: 'Escalations', val: '1', icon: Zap, color: 'text-orange-500' },
  ];

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Operations Summary</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 text-center">
            <s.icon className={`w-5 h-5 mx-auto mb-2 ${s.color}`} />
            <div className="text-xl font-black text-slate-900 dark:text-white">{s.val}</div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-rose-50/50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-900/50 rounded-2xl flex flex-col h-full justify-center">
          <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Escalations & Shortages
          </h4>
          <p className="text-sm text-rose-600 dark:text-rose-300 font-medium leading-relaxed">
            Ambulance shortage detected. Escalation generated: <span className="font-bold">Mutual Aid Request Sent</span>. Added 10m to secondary ETA.
          </p>
        </div>
        
        <div className="p-4 bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-900/50 rounded-2xl flex flex-col h-full justify-center">
          <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> Operational Forecast
          </h4>
          <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium leading-relaxed">
            Expect 2 additional NGOs or Community Responders needed for ongoing crowd control and family support within 45 mins.
          </p>
        </div>
      </div>
    </div>
  );
}
