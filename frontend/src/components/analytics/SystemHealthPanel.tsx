import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Activity, Server, Cpu, Database, Bell, Radio } from 'lucide-react';

export function SystemHealthPanel() {
  const { systemHealth } = useAnalyticsStore();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Operational': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Degraded': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Offline': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  const systems = [
    { label: 'AI Engine', status: systemHealth.aiEngine, icon: Cpu },
    { label: 'Resource Engine', status: systemHealth.resourceEngine, icon: Server },
    { label: 'Communication', status: systemHealth.communicationEngine, icon: Radio },
    { label: 'Analytics Engine', status: systemHealth.analyticsEngine, icon: Activity },
    { label: 'Database', status: systemHealth.database, icon: Database },
    { label: 'Notifications', status: systemHealth.notificationServices, icon: Bell }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sticky top-6">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
        <Activity className="w-4 h-4 text-indigo-500" /> System Health
      </h3>
      <div className="space-y-3">
        {systems.map((sys, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <sys.icon className="w-3.5 h-3.5" />
              {sys.label}
            </div>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusColor(sys.status)}`}>
              {sys.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
