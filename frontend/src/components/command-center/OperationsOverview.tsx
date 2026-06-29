import { useIncidentStore } from '@/stores/incident-store';
import { useCommandCenterStore } from '@/stores/command-center-store';
import { AlertTriangle, CheckCircle2, Siren, Users } from 'lucide-react';

export function OperationsOverview() {
  const incidents = Object.values(useIncidentStore(state => state.incidents));
  const coordinators = useCommandCenterStore(state => state.coordinators);
  const zones = useCommandCenterStore(state => state.zones);

  const active = incidents.filter(i => i.status !== 'RESOLVED');
  const critical = active.filter(i => i.riskLevel === 'CRITICAL');
  const awaiting = active.filter(i => i.status === 'AWAITING_APPROVAL');

  const activeCoordinators = coordinators.filter(c => c.status === 'Active').length;
  
  // Aggregate some resources from zones
  const totalHospSaturation = Math.round(zones.reduce((acc, z) => acc + z.hospitalSaturation, 0) / zones.length);
  const busyUnits = 100 - Math.round(zones.reduce((acc, z) => acc + z.ambulances, 0) / zones.length);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
      {/* Primary KPI */}
      <div className="md:col-span-2 xl:col-span-2 bg-indigo-600 rounded-3xl p-5 border border-indigo-500 shadow-lg flex flex-col justify-between h-[120px]">
        <div className="text-sm font-bold text-indigo-100 uppercase tracking-wider flex items-center gap-2">
          <Siren className="w-5 h-5 text-indigo-200" /> Active Incidents
        </div>
        <div className="flex items-end justify-between">
          <div className="text-5xl font-black text-white leading-none tracking-tight">{active.length}</div>
          <div className="text-indigo-200 text-sm font-medium mb-1">Live Operations</div>
        </div>
      </div>
      
      {/* Secondary KPIs */}
      <div className="bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-4 border border-rose-200 dark:border-rose-900/50 flex flex-col justify-between h-[120px]">
        <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Critical</div>
        <div className="text-4xl font-black text-rose-600 dark:text-rose-400 leading-none">{critical.length}</div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-4 border border-amber-200 dark:border-amber-900/50 flex flex-col justify-between h-[120px]">
        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Approvals</div>
        <div className="text-4xl font-black text-amber-600 dark:text-amber-400 leading-none">{awaiting.length}</div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-[120px]">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Users className="w-4 h-4" /> Coordinators</div>
        <div className="text-4xl font-black text-slate-900 dark:text-white leading-none">{activeCoordinators}<span className="text-2xl text-slate-400">/{coordinators.length}</span></div>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/20 rounded-3xl p-4 border border-rose-200 dark:border-rose-900/50 flex flex-col justify-between h-[120px]">
        <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Hosp Load</div>
        <div className="text-4xl font-black text-rose-600 dark:text-rose-400 leading-none">{totalHospSaturation}<span className="text-2xl">%</span></div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-3xl p-4 border border-indigo-200 dark:border-indigo-900/50 flex flex-col justify-between h-[120px]">
        <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Busy Units</div>
        <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 leading-none">{busyUnits}<span className="text-2xl">%</span></div>
      </div>
    </div>
  );
}
