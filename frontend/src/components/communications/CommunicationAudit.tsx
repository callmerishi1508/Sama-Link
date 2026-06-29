import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { Shield, Clock, User } from 'lucide-react';

export function CommunicationAudit() {
  const { auditLogs } = useCommunicationStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-500" />
          Communication Audit Log
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {auditLogs.map((log) => (
          <div key={log.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="pt-1 text-slate-400">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{log.action}</span>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {log.details}
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <User className="w-3 h-3" /> {log.operator}
              </div>
            </div>
          </div>
        ))}
        {auditLogs.length === 0 && (
          <div className="text-center text-slate-500 py-8">No audit logs available</div>
        )}
      </div>
    </div>
  );
}
