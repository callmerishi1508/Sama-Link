import React from 'react';
import { HistoryEvent } from '@/types/history';
import { Radio } from 'lucide-react';

interface Props {
  events: HistoryEvent[];
}

export function CommunicationHistory({ events }: Props) {
  const commEvents = events.filter(e => e.module === 'Communication' && e.action !== 'Dispatched Units');
  
  if (commEvents.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-indigo-500" />
          Communications Log
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
          <thead className="text-xs uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Time</th>
              <th className="px-6 py-4 font-bold">Action</th>
              <th className="px-6 py-4 font-bold">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {commEvents.map(event => (
              <tr key={event.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {event.action}
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {event.reason || (event.newState ? JSON.stringify(event.newState) : '-')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
