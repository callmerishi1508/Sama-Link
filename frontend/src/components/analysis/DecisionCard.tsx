import { DecisionPlan } from "@/types/analysis";
import { Badge } from "@/components/ui/badge";
import { User, Clock, CheckCircle2, Zap } from "lucide-react";

export function DecisionCard({ decision }: { decision: DecisionPlan }) {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-200/50 dark:border-indigo-900/50 shadow-xl backdrop-blur-xl bg-white/40 dark:bg-black/40 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none -mr-20 -mt-20" />
      
      <div className="flex items-center justify-between mb-8 relative z-10 border-b border-indigo-100 dark:border-indigo-900/50 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-800">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Recommended Response</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Automated policy selection.</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold uppercase tracking-wider">
          {decision.priority} PRIORITY
        </Badge>
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden text-white">
          <div className="absolute right-0 top-0 opacity-10">
            <CheckCircle2 className="w-48 h-48 -mt-12 -mr-12" />
          </div>
          <h4 className="text-sm font-bold text-indigo-100 uppercase tracking-widest mb-3">Primary Action</h4>
          <p className="text-2xl sm:text-3xl font-black tracking-tight relative z-10">{decision.recommended_action.replace(/_/g, ' ')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm">
              <User className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignee</p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{decision.recommended_actor}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm">
              <Clock className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ETA</p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{decision.estimated_response_time}</p>
            </div>
          </div>
        </div>

        {decision.alternative_actions.length > 0 && (
          <div className="pt-6">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Alternative Routes Evaluated</h4>
            <div className="flex flex-wrap gap-2">
              {decision.alternative_actions.map((alt, idx) => (
                <span key={idx} className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 rounded-lg">
                  {alt.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
