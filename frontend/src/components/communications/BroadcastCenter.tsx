import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { Megaphone, MapPin, Users, Clock } from 'lucide-react';

export function BroadcastCenter() {
  const { broadcasts } = useCommunicationStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-indigo-500" />
          Active Broadcasts
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {broadcasts.length === 0 ? (
          <div className="text-center text-slate-500 py-8">No active broadcasts</div>
        ) : (
          broadcasts.map(broadcast => (
            <div key={broadcast.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{broadcast.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    broadcast.priority === 'CRITICAL' ? 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20' :
                    'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20'
                  }`}>
                    {broadcast.priority}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  broadcast.status === 'Active' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {broadcast.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span className="truncate">{broadcast.audience}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{broadcast.coverageArea}</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Started: {new Date(broadcast.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
