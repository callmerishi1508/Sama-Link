import React from 'react';
import { Bot, AlertCircle, Zap, ShieldAlert } from 'lucide-react';

export function AIAlerts() {
  const alerts = [
    { id: 1, type: 'critical', text: 'Predicted hospital overload in Sector 4 within 45 mins.', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50' },
    { id: 2, type: 'warning', text: 'Traffic anomaly detected near I-95 Northbound.', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50' },
    { id: 3, type: 'insight', text: 'Re-routing 2 dispatch units will optimize response time by 12%.', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/50' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
        <Bot className="w-4 h-4 text-indigo-500" /> AI Insights
      </h3>
      
      <div className="flex flex-col space-y-3">
        {alerts.map(alert => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`p-3 rounded-xl border ${alert.bg} flex gap-2.5 items-start`}>
              <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${alert.color}`} />
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                {alert.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
