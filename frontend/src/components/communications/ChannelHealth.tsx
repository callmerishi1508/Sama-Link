import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { Activity, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { ChannelStatus } from '@/types/communication';

export function ChannelHealth() {
  const { channelHealth } = useCommunicationStore();

  const getStatusIcon = (status: ChannelStatus) => {
    switch (status) {
      case 'Operational': return <Wifi className="w-4 h-4 text-emerald-500" />;
      case 'Degraded': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'Offline': return <WifiOff className="w-4 h-4 text-rose-500" />;
    }
  };

  const getStatusColor = (status: ChannelStatus) => {
    switch (status) {
      case 'Operational': return 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20';
      case 'Degraded': return 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
      case 'Offline': return 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-500" />
          Channel Status
        </h3>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {channelHealth.map(ch => (
          <div key={ch.channel} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-slate-900 dark:text-white">{ch.channel}</span>
              {getStatusIcon(ch.status)}
            </div>
            <div className="flex justify-between items-end mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Latency</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{ch.latencyMs} ms</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Success Rate</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{ch.successRate}%</span>
              </div>
            </div>
            <div className="mt-3">
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(ch.status)}`}>
                  {ch.status}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
