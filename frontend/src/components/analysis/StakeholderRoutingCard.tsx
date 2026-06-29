import { Users, Clock, ShieldAlert, Navigation, AlertTriangle, HeartPulse } from "lucide-react";
import { DecisionPlan, RiskAssessment } from "@/types/analysis";

interface Props {
  decision: DecisionPlan;
  risk: RiskAssessment;
}

export function StakeholderRoutingCard({ decision, risk }: Props) {
  // Derive stakeholders dynamically from the decision recommended action or just use a robust static demo based on priority
  
  const isCritical = risk.risk_level === 'CRITICAL';
  const isHigh = risk.risk_level === 'HIGH';

  const stakeholders = [
    {
      id: 'police',
      name: 'Police Control Room',
      icon: ShieldAlert,
      color: 'blue',
      priority: 'Critical',
      eta: 'Immediate',
      status: 'Pending',
      reason: 'Weapon detected or high violence risk.',
      active: decision.recommended_action.includes('POLICE') || isCritical
    },
    {
      id: 'fire',
      name: 'Fire Department',
      icon: AlertTriangle, // Replaced with local icon if needed, but let's use Lucide
      color: 'red',
      priority: 'High',
      eta: '4 mins',
      status: 'Dispatched',
      reason: 'Fire or structural damage suspected.',
      active: decision.recommended_action.includes('FIRE') || decision.recommended_action.includes('EVACUATE')
    },
    {
      id: 'hospital',
      name: 'General Hospital EMS',
      icon: HeartPulse,
      color: 'emerald',
      priority: 'High',
      eta: '6 mins',
      status: 'Waiting',
      reason: 'Possible casualties reported.',
      active: decision.recommended_action.includes('MEDICAL') || isCritical || isHigh
    },
    {
      id: 'ngo',
      name: 'Volunteer Network',
      icon: Users,
      color: 'purple',
      priority: 'Medium',
      eta: '15 mins',
      status: 'Ready',
      reason: 'Crowd assistance and perimeter control.',
      active: true
    }
  ].filter(s => s.active);

  // If none matched, just show default emergency response
  if (stakeholders.length === 0) {
    stakeholders.push({
      id: 'dispatch',
      name: 'Central Dispatch',
      icon: Navigation,
      color: 'indigo',
      priority: 'High',
      eta: 'Immediate',
      status: 'Pending',
      reason: 'General emergency assessment required.',
      active: true
    });
  }

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <Navigation className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stakeholder Routing</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Automated dispatch recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stakeholders.map((s) => (
          <div key={s.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg bg-${s.color}-100 dark:bg-${s.color}-900/30 text-${s.color}-600 dark:text-${s.color}-400`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{s.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Priority: {s.priority}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ETA: {s.eta}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                s.status === 'Dispatched' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                s.status === 'Waiting' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
              }`}>
                {s.status}
              </span>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Reason: </span>
              <span className="text-slate-600 dark:text-slate-400">{s.reason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
