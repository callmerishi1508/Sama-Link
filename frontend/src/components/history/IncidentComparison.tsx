import React, { useState } from 'react';
import { useHistoryStore } from '@/stores/history-store';
import { HistoricalIncident } from '@/types/history';
import { GitCompare, Clock, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  currentIncident: HistoricalIncident;
}

export function IncidentComparison({ currentIncident }: Props) {
  const { incidents } = useHistoryStore();
  const [compareId, setCompareId] = useState<string | null>(null);

  const otherIncidents = incidents.filter(i => i.id !== currentIncident.id);
  const compareIncident = compareId ? incidents.find(i => i.id === compareId) : null;

  if (otherIncidents.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-indigo-500" />
          Incident Comparison
        </h3>
        
        <select 
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm"
          value={compareId || ''}
          onChange={(e) => setCompareId(e.target.value)}
        >
          <option value="">Select incident to compare...</option>
          {otherIncidents.map(i => (
            <option key={i.id} value={i.id}>{i.id} - {i.category}</option>
          ))}
        </select>
      </div>

      {compareIncident ? (
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="text-xs uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold w-1/3">Metric</th>
                <th className="px-4 py-3 font-bold w-1/3 border-l border-slate-200 dark:border-slate-800">
                  <div className="text-indigo-600 dark:text-indigo-400">{currentIncident.id}</div>
                  <div className="text-[10px] font-normal normal-case">{currentIncident.category}</div>
                </th>
                <th className="px-4 py-3 font-bold w-1/3 border-l border-slate-200 dark:border-slate-800">
                  <div className="text-slate-900 dark:text-white">{compareIncident.id}</div>
                  <div className="text-[10px] font-normal normal-case">{compareIncident.category}</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr>
                <td className="px-4 py-3 font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> Resolution Time</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800 font-mono">{(currentIncident.resolutionTimeMs / 60000).toFixed(0)}m</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800 font-mono">{(compareIncident.resolutionTimeMs / 60000).toFixed(0)}m</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium flex items-center gap-2"><Zap className="w-4 h-4" /> AI Acceptance</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800">{currentIncident.aiAcceptance ? 'Accepted' : 'Modified'}</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800">{compareIncident.aiAcceptance ? 'Accepted' : 'Modified'}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Human Overrides</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800 font-mono">{currentIncident.humanOverrides}</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800 font-mono">{compareIncident.humanOverrides}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> First Arrival</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800 font-mono">{(currentIncident.firstResourceArrivalMs / 60000).toFixed(1)}m</td>
                <td className="px-4 py-3 border-l border-slate-200 dark:border-slate-800 font-mono">{(compareIncident.firstResourceArrivalMs / 60000).toFixed(1)}m</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-500">
          Select an incident from the dropdown to compare operational metrics.
        </div>
      )}
    </div>
  );
}
