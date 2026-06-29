import { ArrowDown, AlertTriangle, Hospital, ShieldAlert, Users, Radio } from "lucide-react";

export function OperationalDependencyGraph() {
  const flow = [
    { label: "Incident", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-500/20" },
    { label: "Stakeholders Notified", icon: Radio, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/20" },
    { label: "Resources Dispatched", icon: Users, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/20" },
    { label: "Hospital Preparation", icon: Hospital, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/20" },
    { label: "Resolution & Closure", icon: ShieldAlert, color: "text-slate-500", bg: "bg-slate-200 dark:bg-slate-800" },
  ];

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 relative overflow-hidden h-full flex flex-col justify-center">
      <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-center text-sm uppercase tracking-wider text-slate-500">Operational Flow</h3>
      
      <div className="flex flex-col items-center justify-center space-y-3">
        {flow.map((node, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-full max-w-[200px] flex items-center gap-3 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 shadow-sm ${i === 2 ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${node.bg}`}>
                <node.icon className={`w-4 h-4 ${node.color}`} />
              </div>
              <span className={`text-xs font-bold ${i === 2 ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{node.label}</span>
            </div>
            {i < flow.length - 1 && (
              <div className="h-6 flex items-center justify-center mt-2 mb-1">
                <ArrowDown className="w-4 h-4 text-slate-300 dark:text-slate-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
