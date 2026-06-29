import { MapPin, Clock, Activity, PlusSquare, ShieldAlert } from "lucide-react";

export function NearbyResourcesCard() {
  const nearby = [
    { type: 'Ambulance A-12', kind: 'Medical', icon: Activity, eta: '4 min', dist: '1.2 km', capacity: '1 Bed', status: 'Available', color: 'emerald' },
    { type: 'City Hospital Trauma', kind: 'Hospital', icon: PlusSquare, eta: '8 min', dist: '3.5 km', capacity: '8 ER Beds', status: 'Available', color: 'indigo' },
    { type: 'Unit P-04', kind: 'Police', icon: ShieldAlert, eta: '2 min', dist: '0.5 km', capacity: '2 Officers', status: 'En Route', color: 'blue' },
  ];

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Nearby Resources</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Immediate tactical options</p>
        </div>
      </div>

      <div className="space-y-4">
        {nearby.map((n, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-${n.color}-100 dark:bg-${n.color}-900/30 text-${n.color}-600 dark:text-${n.color}-400 flex items-center justify-center`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{n.type}</h3>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                  {n.kind} • {n.capacity}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                n.status === 'Available' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
              }`}>
                {n.status}
              </span>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {n.eta} <span className="text-slate-300 mx-1">|</span> {n.dist}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
