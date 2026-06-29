import { CheckCircle2, ShieldAlert } from "lucide-react";

export function DispatchConfidence() {
  const reasons = [
    "Required resources immediately available",
    "City Hospital trauma center capacity optimal",
    "No significant traffic delays on route",
    "Primary stakeholders actively acknowledging"
  ];

  return (
    <div className="premium-card bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-900/50 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center h-full">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="font-bold text-slate-900 dark:text-white">Dispatch Confidence</h3>
      </div>
      
      <div className="flex items-end gap-3 mb-6">
        <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400 leading-none">97%</span>
        <span className="text-sm font-bold text-indigo-700/70 dark:text-indigo-400/70 uppercase tracking-wider mb-1">Optimal</span>
      </div>

      <div className="space-y-3 mt-auto">
        {reasons.map((reason, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
