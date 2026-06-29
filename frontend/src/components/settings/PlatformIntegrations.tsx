import React from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import { Link as LinkIcon, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PlatformIntegrations() {
  const { integrations } = useSettingsStore();

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Platform Integrations</h2>
          <p className="text-sm text-slate-500 mt-1">Manage connections to external CAD, GIS, and Communication gateways.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Plus className="w-4 h-4" /> Add Integration
        </Button>
      </div>

      <div className="space-y-4">
        {integrations.map(integration => (
          <div key={integration.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {integration.name}
                  {integration.health === 'Healthy' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> :
                   integration.health === 'Degraded' ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> :
                   <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                </h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                  <span>Version {integration.version}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span>Owner: {integration.owner}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span>Capabilities: {integration.capabilities.join(', ')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Last Sync: {integration.lastSync}</span>
                <Button variant="outline" size="sm" className="h-8 gap-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  <RefreshCw className="w-3.5 h-3.5" /> Sync
                </Button>
                <Button variant="outline" size="sm" className="h-8 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  Configure
                </Button>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                integration.status === 'Connected' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                integration.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {integration.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
