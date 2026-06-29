"use client";

import React from 'react';
import Link from 'next/link';
import { CommunicationOverview } from '@/components/communications/CommunicationOverview';
import { CommunicationFeed } from '@/components/communications/CommunicationFeed';
import { ChannelHealth } from '@/components/communications/ChannelHealth';
import { BroadcastCenter } from '@/components/communications/BroadcastCenter';
import { StakeholderDirectory } from '@/components/communications/StakeholderDirectory';
import { CommunicationAnalytics } from '@/components/communications/CommunicationAnalytics';
import { Radio } from 'lucide-react';

export default function CommunicationsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Header Context */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Communications Hub</h1>
            <p className="text-sm text-slate-500">Enterprise stakeholder messaging and broadcast center.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/incidents" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Incidents
          </Link>
          <Link href="/history" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
            History
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <CommunicationOverview />

        <ChannelHealth />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommunicationFeed />
          <BroadcastCenter />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
          <StakeholderDirectory />
          <CommunicationAnalytics />
        </div>
      </div>
    </div>
  );
}
