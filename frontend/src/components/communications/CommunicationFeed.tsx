import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { Radio, MessageSquare, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CommunicationMessage } from '@/types/communication';

export function CommunicationFeed() {
  const { messages } = useCommunicationStore();

  const getStatusIcon = (status: CommunicationMessage['currentStatus']) => {
    switch (status) {
      case 'Acknowledged': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Failed': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'Escalated': return <ShieldAlert className="w-4 h-4 text-orange-500" />;
      case 'Delivered':
      case 'Read':
      case 'Sent':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <Radio className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: CommunicationMessage['currentStatus']) => {
    switch (status) {
      case 'Acknowledged': return 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20';
      case 'Failed': return 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20';
      case 'Escalated': return 'text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20';
      default: return 'text-slate-700 bg-slate-50 dark:text-slate-300 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Radio className="w-4 h-4 text-indigo-500" />
          Live Communications Feed
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => {
          const latestEvent = msg.deliveryEvents[msg.deliveryEvents.length - 1];
          const timeStr = latestEvent ? new Date(latestEvent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
          
          return (
            <div key={msg.id} className="flex gap-3">
              <div className="flex flex-col items-center pt-1">
                {getStatusIcon(msg.currentStatus)}
                <div className="w-px h-full bg-slate-200 dark:bg-slate-800 my-1" />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">{timeStr}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {msg.stakeholderId} {/* Should map to name, but for now ID or mock */}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(msg.currentStatus)}`}>
                    {msg.currentStatus}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {msg.content}
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {msg.incidentId}
                  </span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    via {msg.channel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-6 text-center">
            <Radio className="w-10 h-10 mb-3 text-slate-300 dark:text-slate-700" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">No Active Communications</h4>
            <p className="text-xs">All channels are currently quiet. System is standing by.</p>
          </div>
        )}
      </div>
    </div>
  );
}
