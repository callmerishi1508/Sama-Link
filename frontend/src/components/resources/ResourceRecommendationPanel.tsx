import React from 'react';
import { ResourceEvaluation } from '@/types/resource';
import { Check, X, Clock, Activity, ShieldAlert, Users, Truck } from 'lucide-react';
import { useResourceStore } from '@/stores/resource-store';

interface Props {
  evaluations: ResourceEvaluation[];
  type: string;
}

export function ResourceRecommendationPanel({ evaluations, type }: Props) {
  const units = useResourceStore(state => state.units);
  
  const getIcon = () => {
    switch(type) {
      case 'Medical': return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'Police': return <ShieldAlert className="w-5 h-5 text-blue-500" />;
      case 'Fire/Rescue': return <Truck className="w-5 h-5 text-rose-500" />;
      default: return <Users className="w-5 h-5 text-purple-500" />;
    }
  };

  if (evaluations.length === 0) {
    return (
      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
        <p className="text-slate-500 text-sm">No resources available for {type}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {evaluations.map((ev) => {
        const unit = units.find(u => u.id === ev.unitId);
        if (!unit) return null;
        
        return (
          <div key={ev.unitId} className={`p-4 rounded-xl border ${ev.rank === 1 ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {getIcon()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {ev.rank}. {unit.name}
                    {ev.rank === 1 && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">
                        Recommended
                      </span>
                    )}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {ev.eta}</span>
                    <span>•</span>
                    <span className={`font-medium ${ev.confidence === 'High' ? 'text-emerald-600 dark:text-emerald-400' : ev.confidence === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {ev.confidence} Confidence
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {}} // Integration handles this later
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${ev.rank === 1 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
              >
                Select
              </button>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                Selected because:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                {ev.reasons.map((reason, idx) => {
                  const isPositive = reason.startsWith('✓');
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      {isPositive ? (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <span>{reason.substring(2)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
