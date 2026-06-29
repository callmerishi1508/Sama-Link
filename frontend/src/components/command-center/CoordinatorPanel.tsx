import { useCommandCenterStore } from '@/stores/command-center-store';
import { Users, PhoneCall, ShieldAlert, Activity } from 'lucide-react';

export function CoordinatorPanel() {
  const coordinators = useCommandCenterStore(state => state.coordinators);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
        <Users className="w-4 h-4 text-indigo-500" /> Active Coordinators
      </h3>
      
      <div className="space-y-3">
        {coordinators.map(c => (
          <div key={c.id} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-7 h-7 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center justify-center font-bold text-[10px]">
                  {c.name.substring(0,2).toUpperCase()}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
                  c.status === 'Active' ? 'bg-emerald-500' : c.status === 'Busy' ? 'bg-amber-500' : 'bg-slate-400'
                }`}></div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-1">{c.name}</div>
                <div className="flex gap-2 text-[9px] font-black uppercase tracking-wider text-slate-500">
                  <span className="text-slate-700 dark:text-slate-300">I:{c.incidents}</span>
                  <span className="text-rose-500">C:{c.critical}</span>
                  <span className="text-amber-500 relative">
                    P:{c.approvalsPending}
                    {c.approvalsPending > 0 && <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{c.avgResponseTime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
