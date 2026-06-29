import { useCommandCenterStore } from '@/stores/command-center-store';
import { useIncidentStore } from '@/stores/incident-store';
import { GitBranch, ArrowDown } from 'lucide-react';

export function IncidentRelationshipGraph() {
  const relationships = useCommandCenterStore(state => state.relationships);
  const incidentsObj = useIncidentStore(state => state.incidents);
  const activeIncidentId = useIncidentStore(state => state.activeIncidentId);

  // We are going to visualize cascading events.
  // For the mock, we know there is one chain: Chem Spill -> Collision
  // In a real scenario, this would be a recursive/d3 graph, but for UI, a linear cascade looks best.
  
  if (relationships.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar">
      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5 shrink-0">
        <GitBranch className="w-4 h-4 text-indigo-500" /> Cascading Events
      </h3>
      
      <div className="space-y-2">
        {relationships.map((rel, idx) => {
          const source = incidentsObj[rel.sourceId];
          const target = incidentsObj[rel.targetId];
          if (!source || !target) return null;
          
          return (
            <div key={idx} className="flex flex-col items-center">
              {/* Source Card */}
              <div className={`w-full p-3 rounded-xl border-2 transition-colors ${
                source.id === activeIncidentId 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
              }`}>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">{source.incidentNumber}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{source.title}</div>
              </div>
              
              {/* Relationship Arrow */}
              <div className="my-2 flex flex-col items-center justify-center">
                <div className="text-[9px] font-bold uppercase tracking-wider text-rose-500 bg-rose-100 dark:bg-rose-900/30 px-2 py-0.5 rounded-full mb-1">
                  {rel.type.replace('_', ' ')}
                </div>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </div>
              
              {/* Target Card */}
              <div className={`w-full p-3 rounded-xl border-2 transition-colors ${
                target.id === activeIncidentId 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
              }`}>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">{target.incidentNumber}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{target.title}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium">
          Multi-incident cascading requires coordinated response across affected sectors.
        </p>
      </div>
    </div>
  );
}
