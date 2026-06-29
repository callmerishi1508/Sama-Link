import React from 'react';
import { Lock } from 'lucide-react';
import { useSettingsStore } from '@/stores/settings-store';

export function SecuritySettings() {
  const { security, updateSecurity } = useSettingsStore();

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Security & Access</h2>
        <p className="text-sm text-slate-500 mt-1">Configure global security policies, MFA requirements, and session controls.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-500" /> Authentication Policies
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Multi-Factor Authentication (MFA)</div>
                <div className="text-xs text-slate-500">Require MFA for all Commander and Dispatcher roles.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={security.mfaEnabled}
                  onChange={(e) => updateSecurity({ mfaEnabled: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Device Approval Required</div>
                <div className="text-xs text-slate-500">New devices must be approved by an administrator before login.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={security.deviceApprovalRequired}
                  onChange={(e) => updateSecurity({ deviceApprovalRequired: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Session Timeout (Minutes)</div>
                <div className="text-xs text-slate-500">Automatically log out idle users.</div>
              </div>
              <input 
                type="number" 
                value={security.sessionTimeoutMins} 
                onChange={(e) => updateSecurity({ sessionTimeoutMins: parseInt(e.target.value) })}
                className="w-24 h-9 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
