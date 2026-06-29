"use client";

import dynamic from "next/dynamic";
import { IncidentUnderstanding, RiskAssessment, DecisionPlan } from "@/types/analysis";
import { IntelligencePanel } from "./IntelligencePanel";

// Dynamically import the map canvas to prevent SSR window issues
const MapCanvas = dynamic(() => import("./MapCanvas").then((mod) => mod.MapCanvas), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-xl animate-pulse">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading Geospatial Engine...</p>
    </div>
  )
});

interface IntelligenceMapProps {
  understanding: IncidentUnderstanding;
  risk: RiskAssessment;
  decision: DecisionPlan;
}

export function IntelligenceMap({ understanding, risk, decision }: IntelligenceMapProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Intelligence Panel (Sidebar) */}
      <div className="lg:col-span-4 h-full">
        <IntelligencePanel understanding={understanding} />
      </div>

      {/* Main Interactive Map */}
      <div className="lg:col-span-8 h-full">
        <MapCanvas 
          locations={understanding.locations || []}
          riskLevel={risk.risk_level}
          summary={understanding.summary}
          hazards={understanding.hazards || []}
          requiresConfirmation={decision.requires_human_confirmation || risk.requires_human_confirmation}
          recommendedAction={decision.recommended_action}
        />
      </div>

    </div>
  );
}
