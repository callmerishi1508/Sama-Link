import React from 'react';
import { Database, HardDrive, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/stores/settings-store';

export function AuditSettings() {
  const { auditConfig } = useSettingsStore();

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Audit & Retention</h2>
          <p className="text-sm text-slate-500 mt-1">Configure data retention policies and access audit logs.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-500" /> Retention Policies
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Incident History Retention</div>
                <div className="text-xs text-slate-500">How long to keep closed incident records.</div>
              </div>
              <select defaultValue={auditConfig.incidentRetentionDays.toString()} className="h-9 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                <option value="365">1 Year (365 Days)</option>
                <option value="730">2 Years (730 Days)</option>
                <option value="1825">5 Years (1825 Days)</option>
              </select>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Replay Data Retention</div>
                <div className="text-xs text-slate-500">High-fidelity event streams used for Incident Replay.</div>
              </div>
              <select defaultValue={auditConfig.replayRetentionDays.toString()} className="h-9 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
                <option value="180">180 Days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-500" /> Backup & Recovery
            </h3>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">System Backup</div>
              <div className="text-xs text-slate-500">Last backup completed: 2 hours ago.</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Download Backup</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
