import React from 'react';
import { ResourceConflict } from '@/types/resource';
import { AlertTriangle, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';

interface Props {
  conflicts: ResourceConflict[];
  onResolve: (id: string) => void;
}

export function ResourceConflictDetector({ conflicts, onResolve }: Props) {
  if (conflicts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-rose-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Active Resource Conflicts ({conflicts.length})
        </h3>
      </div>

      {conflicts.map(conflict => (
        <div key={conflict.id} className="p-4 rounded-xl border bg-rose-50/50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-900/50">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-rose-900 dark:text-rose-400 flex items-center gap-2">
                {conflict.conflict}
              </h4>
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                  conflict.severity === 'Critical' ? 'bg-rose-600 text-white' :
                  conflict.severity === 'High' ? 'bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {conflict.severity} Severity
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] uppercase font-bold tracking-wider">
                  Affects: {conflict.affectedIncidents.join(', ')}
                </span>
              </div>
            </div>
            
            <AlertCircle className="w-6 h-6 text-rose-500/50" />
          </div>

          <div className="my-3 p-3 bg-white/60 dark:bg-slate-900/50 rounded-lg border border-rose-100 dark:border-rose-900/30">
            <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Impact:</span> 
              {conflict.impact}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-3 border-t border-rose-200/50 dark:border-rose-900/50">
            <div className="text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Resolution: {conflict.resolution}
            </div>
            <button 
              onClick={() => onResolve(conflict.id)}
              className="w-full sm:w-auto px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              {conflict.operatorAction}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
