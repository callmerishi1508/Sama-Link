import React from 'react';
import { DeliveryEvent, DeliveryStatus } from '@/types/communication';
import { CheckCircle2, Clock, Check, Send, AlertCircle, ShieldAlert } from 'lucide-react';

interface Props {
  events: DeliveryEvent[];
  currentStatus: DeliveryStatus;
}

export function DeliveryTracker({ events, currentStatus }: Props) {
  const steps: DeliveryStatus[] = ['Queued', 'Sent', 'Delivered', 'Read', 'Acknowledged'];
  
  const getStepIcon = (step: DeliveryStatus, isCompleted: boolean) => {
    if (step === 'Queued') return <Clock className={`w-3.5 h-3.5 ${isCompleted ? 'text-indigo-500' : 'text-slate-400'}`} />;
    if (step === 'Sent') return <Send className={`w-3.5 h-3.5 ${isCompleted ? 'text-indigo-500' : 'text-slate-400'}`} />;
    if (step === 'Delivered') return <Check className={`w-3.5 h-3.5 ${isCompleted ? 'text-indigo-500' : 'text-slate-400'}`} />;
    if (step === 'Read') return <div className="flex -space-x-1.5"><Check className={`w-3.5 h-3.5 ${isCompleted ? 'text-blue-500' : 'text-slate-400'}`} /><Check className={`w-3.5 h-3.5 ${isCompleted ? 'text-blue-500' : 'text-slate-400'}`} /></div>;
    if (step === 'Acknowledged') return <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-500' : 'text-slate-400'}`} />;
    return null;
  };

  const hasError = currentStatus === 'Failed' || currentStatus === 'Escalated';

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const event = events.find(e => e.status === step);
        const isCompleted = !!event;
        
        return (
          <div key={step} className="flex items-start gap-3 relative">
            {index < steps.length - 1 && (
              <div className={`absolute left-3 top-6 w-px h-full -ml-px ${
                isCompleted ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'
              }`} />
            )}
            
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 z-10 bg-white dark:bg-slate-900 ${
              isCompleted ? 'border-indigo-500' : 'border-slate-200 dark:border-slate-700'
            }`}>
              {getStepIcon(step, isCompleted)}
            </div>
            
            <div className="flex-1 pt-1 pb-4">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                }`}>
                  {step}
                </span>
                {event && (
                  <span className="text-xs font-mono text-slate-500">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {hasError && (
        <div className="flex items-start gap-3 relative">
           <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 z-10 bg-rose-50 dark:bg-rose-900 border-rose-500`}>
              {currentStatus === 'Escalated' ? <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> : <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
            </div>
            <div className="flex-1 pt-1 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                  {currentStatus}
                </span>
                {events.find(e => e.status === currentStatus) && (
                  <span className="text-xs font-mono text-rose-500">
                    {new Date(events.find(e => e.status === currentStatus)!.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                )}
              </div>
            </div>
        </div>
      )}
    </div>
  );
}
