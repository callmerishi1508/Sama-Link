import React from 'react';
import {  Smartphone, Monitor, Mail } from 'lucide-react';

export function NotificationSettings() {
  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Notification Configuration</h2>
        <p className="text-sm text-slate-500 mt-1">Manage global alert toggles and notification delivery preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">
                  Event Type
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  <div className="flex flex-col items-center gap-1"><Monitor className="w-4 h-4"/> In-App</div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  <div className="flex flex-col items-center gap-1"><Smartphone className="w-4 h-4"/> Push</div>
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  <div className="flex flex-col items-center gap-1"><Mail className="w-4 h-4"/> Email</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Critical Incident Created</td>
                <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="accent-indigo-600" /></td>
                <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="accent-indigo-600" /></td>
                <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="accent-indigo-600" /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">AI Auto-Dispatch Triggered</td>
                <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="accent-indigo-600" /></td>
                <td className="px-6 py-4 text-center"><input type="checkbox" className="accent-indigo-600" /></td>
                <td className="px-6 py-4 text-center"><input type="checkbox" className="accent-indigo-600" /></td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">System Health Warning</td>
                <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="accent-indigo-600" /></td>
                <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="accent-indigo-600" /></td>
                <td className="px-6 py-4 text-center"><input type="checkbox" defaultChecked className="accent-indigo-600" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
