import React from 'react';
import { Webhook, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function APIManagement() {
  return (
    <div className="p-6 w-full max-w-[1400px]">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">API Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage API keys, webhooks, and developer access.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Key className="w-4 h-4" /> Generate New Key
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-500" /> API Keys
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500">No active API keys found. Generate a key to allow external systems to securely interact with the platform.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Webhook className="w-4 h-4 text-emerald-500" /> Webhooks
            </h3>
            <Button variant="outline" size="sm" className="gap-2">Add Webhook</Button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500">Configure HTTP callbacks for real-time event notifications (e.g. Incident Created, Resource Dispatched).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
