'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MultiIncidentBoard } from '@/components/command-center/MultiIncidentBoard';
import { MultiIncidentMap } from '@/components/command-center/MultiIncidentMap';
import { GlobalActivityFeed } from '@/components/command-center/GlobalActivityFeed';
import { OperationsOverview } from '@/components/command-center/OperationsOverview';
import { ResourceHeatMap } from '@/components/command-center/ResourceHeatMap';
import { CoordinatorPanel } from '@/components/command-center/CoordinatorPanel';
import { IncidentRelationshipGraph } from '@/components/command-center/IncidentRelationshipGraph';
import { OperationalTimeline } from '@/components/command-center/OperationalTimeline';
import { AIAlerts } from '@/components/command-center/AIAlerts';
import { IncidentTrends, HospitalStatus, CommunicationsHealth, LogisticsOverview, WeatherConditions, AIRecommendations } from '@/components/command-center/OperationalIntelligence';
import { Play, Square } from 'lucide-react';
import { useIncidentStore } from '@/stores/incident-store';
import { useCommandCenterStore } from '@/stores/command-center-store';
import { IncidentStatus } from '@/types/incident';

export default function Dashboard() {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const updateIncidentStatus = useIncidentStore(state => state.updateIncidentStatus);
  const addActivity = useCommandCenterStore(state => state.addActivity);

  // Presentation Mode Effect: Moves the "Fallen Tree" incident through the pipeline
  useEffect(() => {
    if (!isPresentationMode) return;
    
    const demoId = 'b2a3c4d5-e6f7-4a5b-8c9d-0e1f2a3b4c5d'; // The "NEW" incident
    
    const steps = [
      { status: 'UNDERSTANDING' as IncidentStatus, delay: 2000, log: { category: 'AI' as const, message: 'Analyzing report data and assessing risk...', incidentId: demoId } },
      { status: 'ASSESSMENT' as IncidentStatus, delay: 5000, log: { category: 'AI' as const, message: 'Risk assessment complete. Identified as LOW risk.', incidentId: demoId } },
      { status: 'AWAITING_APPROVAL' as IncidentStatus, delay: 8000, log: { category: 'AI' as const, message: 'Recommended dispatch plan created. Awaiting human approval.', incidentId: demoId } },
      { status: 'RESOURCES_ASSIGNED' as IncidentStatus, delay: 12000, log: { category: 'HUMAN' as const, message: 'Operator approved dispatch. Resource Engine 2 assigned.', incidentId: demoId } },
      { status: 'RESPONDING' as IncidentStatus, delay: 15000, log: { category: 'RESOURCE' as const, message: 'Engine 2 en route. ETA 8 mins.', incidentId: demoId } },
    ];

    const timeouts = steps.map(step => 
      setTimeout(() => {
        updateIncidentStatus(demoId, step.status);
        addActivity(step.log);
      }, step.delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isPresentationMode, updateIncidentStatus, addActivity]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 shrink-0">
        <div className="shrink-0">
          <h1 className="text-[32px] font-bold text-slate-900 dark:text-white tracking-tight leading-none">District Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Multi-Incident Orchestration & Operational Control
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href="/report"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-all shadow-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Report Incident
          </Link>
          <Link 
            href="/incidents"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-all shadow-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Active Incidents
          </Link>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden lg:block"></div>
          <button 
            onClick={() => setIsPresentationMode(!isPresentationMode)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${
              isPresentationMode 
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isPresentationMode ? (
              <><Square className="w-4 h-4 fill-current" /> Stop Presentation</>
            ) : (
              <><Play className="w-4 h-4 fill-current" /> Presentation Mode</>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-12">
        {/* Row 1: KPI Row */}
        <OperationsOverview />

        {/* Row 2: Main Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-9 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-inner h-[400px] flex flex-col">
            <MultiIncidentBoard />
          </div>
          <div className="xl:col-span-3 h-[400px]">
            <IncidentRelationshipGraph />
          </div>
        </div>

        {/* Row 3: Map + Supporting Panel */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-9 h-[700px] rounded-2xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-800">
            <MultiIncidentMap />
          </div>
          <div className="xl:col-span-3 flex flex-col gap-4">
            <ResourceHeatMap />
            <CoordinatorPanel />
            <AIAlerts />
          </div>
        </div>

        {/* Row 4: Timeline + Cascading Events */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4 h-[350px]">
            <GlobalActivityFeed />
          </div>
          <div className="xl:col-span-8 h-[350px]">
            <OperationalTimeline />
          </div>
        </div>

        {/* Row 5: Operational Intelligence (3x2 Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <IncidentTrends />
          <HospitalStatus />
          <CommunicationsHealth />
          <LogisticsOverview />
          <WeatherConditions />
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
}
