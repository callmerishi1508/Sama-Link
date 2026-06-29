import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { Send, Clock, AlertTriangle, AlertOctagon, Radio, TrendingUp } from 'lucide-react';

export function CommunicationOverview() {
  const { stats, messages, broadcasts } = useCommunicationStore();

  const awaitingAckCount = messages.filter(m => m.currentStatus === 'Delivered' || m.currentStatus === 'Read' || m.currentStatus === 'Sent').length;
  const activeBroadcasts = broadcasts.filter(b => b.status === 'Active').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Send className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Messages Sent</span>
        </div>
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          {stats.messagesSentToday.toLocaleString()}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awaiting Ack</span>
        </div>
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          {awaitingAckCount}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <AlertOctagon className="w-4 h-4 text-rose-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Failed</span>
        </div>
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          {stats.failedDeliveries}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Escalated</span>
        </div>
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          {stats.escalationRate}%
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Radio className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">Active Broadcasts</span>
        </div>
        <div className="text-3xl font-black text-indigo-900 dark:text-indigo-100">
          {activeBroadcasts}
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Avg Ack Time</span>
        </div>
        <div className="text-3xl font-black text-emerald-900 dark:text-emerald-100">
          {stats.avgAckTimeSecs}s
        </div>
      </div>
    </div>
  );
}
