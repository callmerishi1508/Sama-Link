import React from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import { Building2, Globe, Download, Upload, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function OrganizationSettings() {
  const { orgSettings, updateOrgSettings } = useSettingsStore();

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Organization Configuration</h2>
        <p className="text-sm text-slate-500 mt-1">Manage global identity and platform localization settings.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-500" /> Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Organization Name</label>
              <Input 
                value={orgSettings.organizationName}
                onChange={(e) => updateOrgSettings({ organizationName: e.target.value })}
                className="bg-slate-50 dark:bg-slate-900/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Command Center Name</label>
              <Input 
                value={orgSettings.commandCenterName}
                onChange={(e) => updateOrgSettings({ commandCenterName: e.target.value })}
                className="bg-slate-50 dark:bg-slate-900/50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500" /> Localization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time Zone</label>
              <select 
                value={orgSettings.timeZone}
                onChange={(e) => updateOrgSettings({ timeZone: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm"
              >
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Language</label>
              <select 
                value={orgSettings.language}
                onChange={(e) => updateOrgSettings({ language: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Country / Region</label>
              <Input 
                value={orgSettings.country}
                onChange={(e) => updateOrgSettings({ country: e.target.value })}
                className="bg-slate-50 dark:bg-slate-900/50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-amber-500" /> Configuration Management
          </h3>
          <p className="text-sm text-slate-500 mb-4">Export, import, or reset platform settings. These actions affect the current environment profile.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-700">
              <Download className="w-4 h-4" /> Export Configuration
            </Button>
            <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-700">
              <Upload className="w-4 h-4" /> Import Configuration
            </Button>
            <Button variant="outline" className="gap-2 border-slate-200 dark:border-slate-700">
              <Copy className="w-4 h-4" /> Duplicate Configuration
            </Button>
            <div className="flex-1" />
            <Button variant="destructive" className="gap-2">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
