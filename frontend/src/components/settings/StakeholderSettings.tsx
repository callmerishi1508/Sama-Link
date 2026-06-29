import React from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import { ShieldAlert, Plus, Radio, Users, Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StakeholderSettings() {
  const { stakeholders } = useSettingsStore();

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Stakeholder Configuration</h2>
          <p className="text-sm text-slate-500 mt-1">Manage external agencies, priorities, and default communication channels.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Stakeholder
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stakeholders.map(s => (
          <div key={s.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  s.type === 'Police' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                  s.type === 'Fire' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' :
                  'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                }`}>
                  {s.type === 'Police' ? <ShieldAlert className="w-5 h-5" /> : 
                   s.type === 'Fire' ? <Siren className="w-5 h-5" /> : 
                   <Users className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{s.id} - {s.type}</h3>
                  <div className="text-xs text-slate-500">{s.contact}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                s.priority === 'Critical' ? 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' :
                'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
              }`}>
                {s.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Default Channel</div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Radio className="w-4 h-4 text-slate-400" /> {s.defaultChannel}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Escalation Lvl</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Level {s.escalationLevel}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
