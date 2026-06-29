"use client";

import React from 'react';
import Link from 'next/link';
import { Archive } from 'lucide-react';
import { HistoryOverview } from '@/components/history/HistoryOverview';
import { IncidentArchive } from '@/components/history/IncidentArchive';
import { OperatorActivity } from '@/components/history/OperatorActivity';
import { PerformanceMetrics } from '@/components/history/PerformanceMetrics';

export default function HistoryPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Incident History & Audit Center</h1>
            <p className="text-sm text-slate-500">Immutable operational history and audit ledger.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/incidents" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Incidents
          </Link>
          <Link href="/analytics" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Analytics
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <HistoryOverview />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <IncidentArchive />
          </div>
          <div className="xl:col-span-1 space-y-6 flex flex-col">
            <div className="flex flex-col">
              <OperatorActivity />
            </div>
            <div className="flex flex-col">
              <PerformanceMetrics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
