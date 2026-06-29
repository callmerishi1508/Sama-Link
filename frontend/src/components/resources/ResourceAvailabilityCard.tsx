import { CheckCircle2, Clock } from "lucide-react";
import { useResourceStore } from "@/stores/resource-store";

export function ResourceAvailabilityCard() {
  const organizations = useResourceStore(state => state.organizations);

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resource Availability</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Live organizational capacity & utilization</p>
        </div>
      </div>

      <div className="space-y-6">
        {organizations.map((org, i) => {
          const utilization = Math.round((org.busy / org.totalUnits) * 100);
          
          return (
            <div key={i} className="flex flex-col gap-3 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <org.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{org.name}</h3>
                    <div className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                      {org.type} • {org.totalUnits} Total Units
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    org.onDuty ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" /> On Duty
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">
                    Utilized: <span className={utilization > 80 ? 'text-rose-500' : 'text-indigo-600 dark:text-indigo-400'}>{utilization}%</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 text-center border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Available</div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{org.available}</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 text-center border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Busy</div>
                  <div className="text-lg font-black text-slate-700 dark:text-slate-300">{org.busy}</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 text-center border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex justify-center"><Clock className="w-3 h-3" /></div>
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-0.5">{org.avgResponseTime} Avg</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 text-center border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Next</div>
                  <div className="text-sm font-black text-slate-700 dark:text-slate-300">{org.nextAvailable}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
