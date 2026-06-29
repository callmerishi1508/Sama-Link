import React from 'react';
import { HistoricalIncident } from '@/types/history';
import { Archive, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

interface Props {
  incident: HistoricalIncident;
}

export function IncidentSummaryCard({ incident }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Archive className="w-5 h-5 text-indigo-500" />
          {incident.id} Summary
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {incident.category}
        </span>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{incident.title}</h4>
          <div className="text-sm text-slate-500 flex flex-wrap gap-x-6 gap-y-2">
            <span>Coordinator: <strong className="text-slate-700 dark:text-slate-300">{incident.coordinator}</strong></span>
            <span>Duration: <strong className="text-slate-700 dark:text-slate-300">{Math.round(incident.resolutionTimeMs / 60000)}m</strong></span>
            <span>Risk: <strong className="text-slate-700 dark:text-slate-300">{incident.riskLevel}</strong></span>
          </div>
        </div>

        {incident.lessonsLearned && (
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Lessons Learned
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-4 border border-emerald-100 dark:border-emerald-500/20">
                <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> What Worked Well
                </h5>
                <ul className="text-sm text-emerald-700 dark:text-emerald-300 space-y-1 list-disc pl-4">
                  {incident.lessonsLearned.workedWell.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>

              <div className="bg-rose-50 dark:bg-rose-500/10 rounded-lg p-4 border border-rose-100 dark:border-rose-500/20">
                <h5 className="text-xs font-bold text-rose-800 dark:text-rose-400 mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Bottlenecks
                </h5>
                <ul className="text-sm text-rose-700 dark:text-rose-300 space-y-1 list-disc pl-4">
                  {incident.lessonsLearned.bottlenecks.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-lg p-4 border border-indigo-100 dark:border-indigo-500/20 mt-4">
              <h5 className="text-xs font-bold text-indigo-800 dark:text-indigo-400 mb-2">Future Recommendations</h5>
              <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1 list-disc pl-4">
                {incident.lessonsLearned.futureRecommendations.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
