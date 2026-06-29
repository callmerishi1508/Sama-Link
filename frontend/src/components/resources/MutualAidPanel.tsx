import React from 'react';
import { MutualAidRecommendation } from '@/types/resource';
import { Network, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  recommendations: MutualAidRecommendation[];
}

export function MutualAidPanel({ recommendations }: Props) {
  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-5 h-5 text-amber-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Mutual Aid Recommendations
        </h3>
      </div>
      
      {recommendations.map((rec) => (
        <div key={rec.id} className="p-4 rounded-xl border bg-white border-amber-200 dark:bg-slate-900 dark:border-amber-900/50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {rec.rank}. {rec.organization}
              </h4>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5" /> ETA: {rec.eta}
                </span>
                <span>•</span>
                <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                  {rec.capability}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <button className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-bold transition-colors">
                Request Aid
              </button>
              {rec.approvalNeeded && (
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Cmd Approval Req
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Reason Selected
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                {rec.reasonSelected}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Expected Benefit
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                {rec.expectedBenefit}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
