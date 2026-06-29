import React from 'react';
import { HistoryEvent } from '@/types/history';
import { Truck, MapPin } from 'lucide-react';

interface Props {
  events: HistoryEvent[];
}

export function ResourceHistory({ events }: Props) {
  const resourceEvents = events.filter(e => e.module === 'Dispatch' || (e.module === 'Communication' && e.action === 'Dispatched Units'));
  
  if (resourceEvents.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-500" />
          Resource Movements
        </h3>
      </div>
      
      <div className="p-6">
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
          {resourceEvents.map((event) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 text-slate-500 group-[.is-active]:bg-indigo-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <MapPin className="w-4 h-4" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 dark:text-white">{event.action}</span>
                  <span className="text-xs font-mono text-slate-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Actor: <strong className="text-slate-900 dark:text-white">{event.actor}</strong>
                </div>
                {Boolean((event.newState as Record<string, unknown>)?.unitsEnRoute) && (
                  <div className="mt-2 flex gap-2">
                    {((event.newState as Record<string, unknown>).unitsEnRoute as string[]).map((unit: string) => (
                      <span key={unit} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-lg border border-indigo-200 dark:border-indigo-500/30">
                        {unit}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
