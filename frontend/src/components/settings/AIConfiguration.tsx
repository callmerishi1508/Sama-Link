import React from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import {  AlertTriangle, Eye, Sliders, CheckCircle2, ShieldAlert } from 'lucide-react';

export function AIConfiguration() {
  const { aiSettings, updateAISettings } = useSettingsStore();

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">AI Engine</h2>
        <p className="text-sm text-slate-500 mt-1">Tune recommendation thresholds, explainability, and automation levels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500" /> Thresholds & Automation
            </h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Confidence Threshold ({aiSettings.confidenceThreshold}%)</label>
                  <span className="text-xs text-slate-500">Minimum confidence to surface a recommendation.</span>
                </div>
                <input 
                  type="range" min="50" max="99" 
                  value={aiSettings.confidenceThreshold}
                  onChange={(e) => updateAISettings({ confidenceThreshold: parseInt(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    Human Approval Threshold ({aiSettings.humanApprovalThreshold}%)
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                  </label>
                  <span className="text-xs text-slate-500">Auto-dispatch if confidence exceeds this.</span>
                </div>
                <input 
                  type="range" min="80" max="100" 
                  value={aiSettings.humanApprovalThreshold}
                  onChange={(e) => updateAISettings({ humanApprovalThreshold: parseInt(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Auto-Recommendation Mode</div>
                    <div className="text-xs text-slate-500 mt-1">AI generates communication and dispatch plans without operator prompting.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={aiSettings.autoRecommendationMode}
                      onChange={(e) => updateAISettings({ autoRecommendationMode: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                {aiSettings.autoRecommendationMode && (
                  <div className="mt-3 p-3 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-xs font-semibold rounded flex items-start gap-2 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Dependency Warning:</strong> Auto-Recommendation Mode overrides standard dispatcher queues. Human Approval Threshold is currently set to {aiSettings.humanApprovalThreshold}%.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden sticky top-6">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Live Preview
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
              </span>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Mock Incident: 10-50 Major</div>
                  <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                    aiSettings.confidenceThreshold <= 90 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400' 
                      : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400'
                  }`}>
                    90% Conf
                  </div>
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {aiSettings.confidenceThreshold <= 90 
                    ? "Recommendation surfaces: Dispatch 2 EMS Units to I-95." 
                    : "Recommendation suppressed due to high confidence threshold. Human analysis required."}
                </div>
                {aiSettings.confidenceThreshold <= 90 && aiSettings.humanApprovalThreshold <= 90 && (
                  <div className="mt-2 text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Auto-Dispatch Triggered
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
