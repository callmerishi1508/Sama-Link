import React from 'react';
import { HistoryEvent } from '@/types/history';
import { useReplayStore } from '@/stores/replay-store';
import { PlayCircle, ShieldAlert, Cpu, User, Target, Radio, Archive } from 'lucide-react';

interface Props {
  events: HistoryEvent[];
}

export function IncidentReplay({ events }: Props) {
  const { currentEventIndex } = useReplayStore();

  const visibleEvents = events.slice(0, currentEventIndex + 1);

  const getIcon = (module: string) => {
    switch(module) {
      case 'Ingestion': return <Target className="w-4 h-4 text-rose-500" />;
      case 'Analysis': return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'Decision': return <User className="w-4 h-4 text-amber-500" />;
      case 'Communication': return <Radio className="w-4 h-4 text-emerald-500" />;
      case 'Dispatch': return <ShieldAlert className="w-4 h-4 text-blue-500" />;
      case 'Archive': return <Archive className="w-4 h-4 text-slate-500" />;
      default: return <PlayCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-[400px] flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 shrink-0">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-indigo-500" />
          Event Replay
        </h3>
        <span className="text-xs font-mono text-slate-500">
          {currentEventIndex + 1} / {events.length} Events
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
        <div className="absolute left-8 top-6 bottom-6 w-px bg-slate-200 dark:bg-slate-800" />
        
        {visibleEvents.map((event) => (
          <div 
            key={event.id} 
            className="flex items-start gap-4 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
              {getIcon(event.module)}
            </div>
            
            <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{event.action}</span>
                <span className="text-xs font-mono text-slate-500">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Actor: <span className="font-medium text-slate-800 dark:text-slate-200">{event.actor}</span> ({event.actorType})
              </div>
              {event.reason && (
                <div className="text-xs text-slate-500 mt-2 italic border-l-2 border-slate-300 dark:border-slate-600 pl-2">
                  &quot;{event.reason}&quot;
                </div>
              )}
            </div>
          </div>
        ))}
        {visibleEvents.length === 0 && (
          <div className="text-center text-slate-500 py-12">Press play to start replay.</div>
        )}
      </div>
    </div>
  );
}
