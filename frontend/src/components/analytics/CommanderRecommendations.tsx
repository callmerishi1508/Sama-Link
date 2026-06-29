import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CommanderRecommendations() {
  const { commanderRecommendations } = useAnalyticsStore();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Commander Recommendations
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-3">
          {commanderRecommendations.map((rec, idx) => (
            <div key={rec.id} className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/80 transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 text-slate-200 font-medium">
                {rec.recommendation}
              </div>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0">
                Execute <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
