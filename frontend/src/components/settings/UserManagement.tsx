import React from 'react';
import { useSettingsStore } from '@/stores/settings-store';
import { Users, ShieldCheck, Settings, Eye, Edit, CheckCircle, Radio, Clock, Activity, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UserManagement() {
  const { roles } = useSettingsStore();

  const permissionsList = [
    { key: 'view', label: 'View', icon: Eye },
    { key: 'edit', label: 'Edit', icon: Edit },
    { key: 'approve', label: 'Approve', icon: CheckCircle },
    { key: 'dispatch', label: 'Dispatch', icon: Radio },
    { key: 'configure', label: 'Configure', icon: Settings },
    { key: 'audit', label: 'Audit', icon: ShieldCheck },
    { key: 'replay', label: 'Replay', icon: Clock },
    { key: 'analytics', label: 'Analytics', icon: Activity },
    { key: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Role Matrix & Users</h2>
          <p className="text-sm text-slate-500 mt-1">Configure granular access control and platform permissions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Matrix
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Users className="w-4 h-4" /> Add Role
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-64">
                  Module / Action
                </th>
                {roles.map(role => (
                  <th key={role.id} className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-center border-l border-slate-200 dark:border-slate-800">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {permissionsList.map(({ key, label, icon: Icon }) => (
                <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 border-r border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
                    </div>
                  </td>
                  {roles.map(role => (
                    <td key={`${role.id}-${key}`} className="px-6 py-4 text-center border-r border-slate-200 dark:border-slate-800 last:border-0">
                      <div className="flex justify-center">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                          role.permissions[key] 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                            : 'bg-slate-100 text-slate-300 border border-slate-200 dark:bg-slate-800/50 dark:text-slate-600 dark:border-slate-700'
                        }`}>
                          {role.permissions[key] && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
