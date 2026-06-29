import { useResourceStore } from "@/stores/resource-store";
import { Clock, Send, MailCheck } from "lucide-react";

export function StakeholderAcknowledgement() {
  const stakeholders = useResourceStore(state => state.stakeholders);

  return (
    <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Stakeholder Acknowledgement</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Live operational and communication status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stakeholders.map(stakeholder => (
          <div key={stakeholder.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-${stakeholder.color}-100 dark:bg-${stakeholder.color}-900/30 text-${stakeholder.color}-600 dark:text-${stakeholder.color}-400`}>
                {stakeholder.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{stakeholder.name}</h3>
                <div className="text-xs text-slate-500">{stakeholder.type}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3" /> Ops</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  stakeholder.operationalStatus === 'Accepted' || stakeholder.operationalStatus === 'En Route' || stakeholder.operationalStatus === 'On Scene'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                }`}>
                  {stakeholder.operationalStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5"><Send className="w-3 h-3" /> Comms</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  stakeholder.communicationStatus === 'Acknowledged' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400' :
                  stakeholder.communicationStatus === 'Delivered' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                  stakeholder.communicationStatus === 'Sent' ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300' :
                  stakeholder.communicationStatus === 'Failed' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' :
                  'bg-slate-100 text-slate-500 dark:bg-slate-800'
                }`}>
                  {stakeholder.communicationStatus === 'Acknowledged' && <MailCheck className="w-3 h-3 inline mr-1" />}
                  {stakeholder.communicationStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
