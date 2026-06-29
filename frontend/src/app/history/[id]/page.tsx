"use client";

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useHistoryStore } from '@/stores/history-store';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IncidentSummaryCard } from '@/components/history/IncidentSummaryCard';
import { IncidentReplay } from '@/components/history/IncidentReplay';
import { AuditLogTable } from '@/components/history/AuditLogTable';
import { DecisionHistory } from '@/components/history/DecisionHistory';
import { ResourceHistory } from '@/components/history/ResourceHistory';
import { CommunicationHistory } from '@/components/history/CommunicationHistory';
import { IncidentComparison } from '@/components/history/IncidentComparison';
import { ReplayEngine } from '@/components/history/ReplayEngine';
import { ReplayControls } from '@/components/history/ReplayControls';

interface Props {
  params: Promise<{ id: string }>;
}

export default function IncidentHistoryDetail({ params }: Props) {
  const router = useRouter();
  const { id } = use(params);
  const { getIncidentById } = useHistoryStore();
  const incident = getIncidentById(id);

  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#0a0a0a]">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Incident Not Found</h2>
        <Button onClick={() => router.push('/history')} variant="outline">Return to Archive</Button>
      </div>
    );
  }

  const events = incident.events;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Replay Engine running globally for this view */}
      <ReplayEngine totalEvents={events.length} />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/history')} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{incident.id} Audit Trail</h1>
            <p className="text-sm text-slate-500">Immutable operational ledger & replay.</p>
          </div>
        </div>
        
        <ReplayControls />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <IncidentSummaryCard incident={incident} />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <IncidentReplay events={events} />
          <DecisionHistory events={events} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ResourceHistory events={events} />
          <CommunicationHistory events={events} />
        </div>

        <AuditLogTable events={events} />
        <IncidentComparison currentIncident={incident} />
      </div>
    </div>
  );
}
