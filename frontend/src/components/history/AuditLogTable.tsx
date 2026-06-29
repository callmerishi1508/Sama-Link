import React from 'react';
import { HistoryEvent } from '@/types/history';
import { Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  events: HistoryEvent[];
}

export function AuditLogTable({ events }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" />
          Complete Audit Ledger
        </h3>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" /> Export Ledger
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
          <thead className="text-xs uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Timestamp</th>
              <th className="px-6 py-4 font-bold">Actor</th>
              <th className="px-6 py-4 font-bold">Module</th>
              <th className="px-6 py-4 font-bold">Action</th>
              <th className="px-6 py-4 font-bold">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {events.map(event => (
              <tr key={event.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                  {new Date(event.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white">{event.actor}</div>
                  <div className="text-xs text-slate-500">{event.actorType}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px] font-bold uppercase tracking-wider">
                    {event.module}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {event.action}
                </td>
                <td className="px-6 py-4 text-xs italic text-slate-500">
                  {event.reason || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
