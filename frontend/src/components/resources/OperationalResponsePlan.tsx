import { AlertCircle, Activity, ShieldAlert } from "lucide-react";
import type { DecisionPlan, RiskAssessment } from "@/types/analysis";
import { useResourceStore } from "@/stores/resource-store";
import { ResourceIntelligenceEngine } from "@/lib/resourceIntelligence";
import { ResourceRecommendationPanel } from "./ResourceRecommendationPanel";
import { MutualAidPanel } from "./MutualAidPanel";

interface Props {
  decision: DecisionPlan;
  risk: RiskAssessment;
}

export function OperationalResponsePlan({}: Props) {  const units = useResourceStore(state => state.units);
  
  // Use Engine for Medical recommendations
  const medicalEvals = ResourceIntelligenceEngine.evaluateUnits(units, {
    incidentId: 'current',
    incidentLocation: 'mock',
    requiredType: 'Medical',
    requiredAmount: 2
  });

  // Use Engine for Police recommendations
  const policeEvals = ResourceIntelligenceEngine.evaluateUnits(units, {
    incidentId: 'current',
    incidentLocation: 'mock',
    requiredType: 'Police',
    requiredAmount: 1
  });
  
  const mutualAidMeds = ResourceIntelligenceEngine.getMutualAidRecommendations('Medical');

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Operational Resource Intelligence</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Intelligent resource allocation & conflict resolution</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              Medical Units Required (2)
            </h3>
            <ResourceRecommendationPanel evaluations={medicalEvals.slice(0, 3)} type="Medical" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-500" />
              Police Units Required (1)
            </h3>
            <ResourceRecommendationPanel evaluations={policeEvals.slice(0, 2)} type="Police" />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-5 bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-200 dark:border-rose-900/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-900 dark:text-rose-400 mb-1">Resource Shortage Detected</h4>
                <p className="text-sm text-rose-700 dark:text-rose-300 mb-3">
                  System recommends 2 Medical units, but only {medicalEvals.filter(e => e.isRecommended).length} are optimally available within the required ETA.
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-2">
                  System Resolution
                </div>
                <div className="text-sm text-rose-700 dark:text-rose-300">
                  Escalate to Mutual Aid for secondary medical unit (+10m ETA). Dispatch NGO Volunteers for immediate scene support.
                </div>
              </div>
            </div>
          </div>
          
          <MutualAidPanel recommendations={mutualAidMeds} />
        </div>
      </div>
    </div>
  );
}
