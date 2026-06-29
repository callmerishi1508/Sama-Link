import { AlertTriangle, ShieldCheck, UserCheck } from "lucide-react";

interface LocationPopupProps {
  locationString: string;
  displayName: string;
  riskLevel: string;
  summary: string;
  hazards: string[];
  requiresConfirmation: boolean;
  recommendedAction: string;
}

export function LocationPopup({ 
  locationString, 
  displayName, 
  riskLevel, 
  summary, 
  hazards, 
  requiresConfirmation, 
  recommendedAction 
}: LocationPopupProps) {
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case "CRITICAL": return "bg-rose-500 text-white";
      case "HIGH": return "bg-orange-500 text-white";
      case "MEDIUM": return "bg-amber-500 text-white";
      default: return "bg-emerald-500 text-white";
    }
  };

  return (
    <div className="flex flex-col gap-3 min-w-[240px] max-w-[280px]">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getRiskColor(riskLevel)}`}>
          {riskLevel} RISK
        </span>
        {requiresConfirmation && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <UserCheck className="w-3 h-3" /> Oversight
          </span>
        )}
      </div>

      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{locationString}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{displayName}</p>
      </div>

      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 border-l-2 border-indigo-500 pl-2">
        {summary}
      </div>

      {hazards.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {hazards.slice(0, 3).map((hazard, i) => (
            <span key={i} className="flex items-center gap-1 text-[9px] uppercase font-bold bg-rose-50 text-rose-600 border border-rose-100 rounded px-1.5 py-0.5">
              <AlertTriangle className="w-2.5 h-2.5" />
              {hazard}
            </span>
          ))}
          {hazards.length > 3 && (
            <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center">+{hazards.length - 3}</span>
          )}
        </div>
      )}

      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-indigo-500" />
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
          {recommendedAction.replace(/_/g, ' ')}
        </span>
      </div>
    </div>
  );
}
