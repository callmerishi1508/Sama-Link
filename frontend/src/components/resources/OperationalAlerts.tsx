import { useResourceStore } from "@/stores/resource-store";
import { AlertTriangle, Info, XCircle } from "lucide-react";

export function OperationalAlerts() {
  const alerts = useResourceStore(state => state.alerts);

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {alerts.map(alert => {
        const Icon = alert.type === 'error' ? XCircle : alert.type === 'warning' ? AlertTriangle : Info;
        const bgClass = alert.type === 'error' ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-900/50' : 
                        alert.type === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/50' : 
                        'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-900/50';
        const textClass = alert.type === 'error' ? 'text-rose-700 dark:text-rose-400' : 
                          alert.type === 'warning' ? 'text-amber-700 dark:text-amber-400' : 
                          'text-blue-700 dark:text-blue-400';

        return (
          <div key={alert.id} className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition-all ${bgClass}`}>
            <div className={`flex items-center gap-3 ${textClass}`}>
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-bold">{alert.message}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 opacity-60">System Alert</span>
          </div>
        );
      })}
    </div>
  );
}
