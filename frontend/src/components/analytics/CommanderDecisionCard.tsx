import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { ShieldCheck, AlertTriangle, Truck, Bell, Map, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CommanderDecisionCard() {
  const { commanderRecommendations } = useAnalyticsStore();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-6 shadow-2xl">
      <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/80">
        <h3 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tight">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          Commander Decision Summary
        </h3>
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Ready for Review
        </span>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 border-b border-slate-800">
        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Immediate Attention
          </div>
          <div className="text-sm font-semibold text-slate-200">
            North Zone Hospital Saturation (95%)
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-amber-400" /> Pre-position Resources
          </div>
          <div className="text-sm font-semibold text-slate-200">
            2 EMS Units to Central Station
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5 text-indigo-400" /> Notify Stakeholders
          </div>
          <div className="text-sm font-semibold text-slate-200">
            City Hospital (Divert Protocol)
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Map className="w-3.5 h-3.5 text-emerald-400" /> Monitor Zones
          </div>
          <div className="text-sm font-semibold text-slate-200">
            Sector 4 (Traffic Spike +15%)
          </div>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-rose-400" /> Escalating Risk
          </div>
          <div className="text-sm font-semibold text-slate-200">
            Evening shift staffing shortage
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-800/20">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Final Actionable Recommendations</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commanderRecommendations.map((rec, idx) => (
            <div key={rec.id} className="flex flex-col gap-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div className="text-sm font-bold text-slate-100">
                    {rec.recommendation}
                  </div>
                </div>
              </div>
              {rec.actionableContext && (
                <div className="text-xs text-slate-400 pl-9 border-l-2 border-slate-700 ml-3">
                  {rec.actionableContext}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Dismiss Non-Critical
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8">
            Approve & Execute Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
