import React from 'react';
import { Radio, MessageSquare } from 'lucide-react';

export function CommunicationSettings() {
  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Communication Policies</h2>
        <p className="text-sm text-slate-500 mt-1">Configure global communication channels, delivery rules, and escalation paths.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-500" /> Channel Priorities
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Critical Priority</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><Radio className="w-4 h-4" /> Tetra Radio</span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Primary</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Secure SMS</span>
                  <span className="text-xs text-slate-500">Secondary</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Standard Priority</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> App Push</span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Primary</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> WhatsApp</span>
                  <span className="text-xs text-slate-500">Secondary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
