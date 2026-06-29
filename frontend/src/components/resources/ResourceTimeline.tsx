import React from 'react';
import { ResourceTimelineEvent } from '@/types/resource';
import { Activity, Truck, Clock, User } from 'lucide-react';

interface Props {
  events: ResourceTimelineEvent[];
}

export function ResourceTimeline({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="p-4 text-center text-slate-500 text-sm italic">
        No recent activity logged for this resource.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const eventTime = new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return (
          <div key={event.id} className="relative flex gap-4">
            {!isLast && (
              <div className="absolute top-8 bottom-[-24px] left-[19px] w-px bg-slate-200 dark:bg-slate-700"></div>
            )}
            
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 bg-white dark:bg-slate-900 z-10 ${
              event.result === 'Success' ? 'border-emerald-500 text-emerald-500' :
              event.result === 'Conflict' || event.result === 'Released' ? 'border-amber-500 text-amber-500' :
              'border-slate-300 dark:border-slate-600 text-slate-400'
            }`}>
              {event.actor === 'System' ? <Activity className="w-4 h-4" /> :
               event.actor === 'Dispatcher' ? <User className="w-4 h-4" /> :
               event.actor === 'Driver' ? <Truck className="w-4 h-4" /> :
               <Clock className="w-4 h-4" />}
            </div>
            
            <div className="flex-1 pt-1 pb-2">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {event.action}
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {event.actor}
                  </span>
                </h4>
                <span className="text-xs font-bold text-slate-500">{eventTime}</span>
              </div>
              
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                <span className="font-bold">Reason:</span> {event.reason}
              </div>
              
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Result: {event.result}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
