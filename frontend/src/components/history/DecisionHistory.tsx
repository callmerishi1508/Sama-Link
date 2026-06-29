import React from 'react';
import { HistoryEvent } from '@/types/history';
import { SplitSquareHorizontal, User, Cpu } from 'lucide-react';

interface Props {
  events: HistoryEvent[];
}

export function DecisionHistory({ events }: Props) {
  const decisionEvents = events.filter(e => e.module === 'Decision');
  
  if (decisionEvents.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <SplitSquareHorizontal className="w-5 h-5 text-indigo-500" />
          Decision History & Overrides
        </h3>
      </div>
      
      <div className="p-6 space-y-6">
        {decisionEvents.map(event => (
          <div key={event.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {event.previousState && event.newState && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 flex items-center justify-center z-10 hidden md:flex">
                <SplitSquareHorizontal className="w-4 h-4 text-slate-400" />
              </div>
            )}
            
            {event.previousState ? (
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-700 opacity-70">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> Original Recommendation
                </div>
                <pre className="text-xs font-mono text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {JSON.stringify(event.previousState, null, 2)}
                </pre>
              </div>
            ) : (
              <div className={event.newState ? "" : "col-span-2"} />
            )}

            {event.newState && (
              <div className={`bg-indigo-50 dark:bg-indigo-500/10 rounded-lg p-4 border border-indigo-200 dark:border-indigo-500/30 ${!event.previousState ? "col-span-2" : ""}`}>
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {event.action}
                  </span>
                  <span className="font-mono">{new Date(event.timestamp).toLocaleTimeString()}</span>
                </div>
                <pre className="text-xs font-mono text-indigo-900 dark:text-indigo-300 whitespace-pre-wrap">
                  {JSON.stringify(event.newState, null, 2)}
                </pre>
                {event.reason && (
                  <div className="mt-3 pt-3 border-t border-indigo-200/50 dark:border-indigo-500/20 text-sm italic text-indigo-800 dark:text-indigo-300">
                    &quot;{event.reason}&quot; - {event.actor}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
