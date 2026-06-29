"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { SystemHealthPanel } from '@/components/analytics/SystemHealthPanel';
import { ExecutiveCommandBrief } from '@/components/analytics/ExecutiveCommandBrief';
import { AnalyticsOverview } from '@/components/analytics/AnalyticsOverview';
import { IncidentAnalytics } from '@/components/analytics/IncidentAnalytics';
import { ResourceAnalytics } from '@/components/analytics/ResourceAnalytics';
import { CommunicationAnalytics } from '@/components/analytics/CommunicationAnalytics';
import { DecisionAnalytics } from '@/components/analytics/DecisionAnalytics';
import { OperationalHeatmap } from '@/components/analytics/OperationalHeatmap';
import { PredictiveInsights } from '@/components/analytics/PredictiveInsights';
import { CommanderDecisionCard } from '@/components/analytics/CommanderDecisionCard';
import { OperationalBottlenecks } from '@/components/analytics/OperationalBottlenecks';
import { IncidentLifecycleFunnel } from '@/components/analytics/IncidentLifecycleFunnel';
import { OperatorAnalytics } from '@/components/analytics/OperatorAnalytics';
import { StakeholderAnalytics } from '@/components/analytics/StakeholderAnalytics';
import { OperationalReports } from '@/components/analytics/OperationalReports';
import { GlobalFilters } from '@/components/analytics/GlobalFilters';

export default function AnalyticsPage() {
  const [presentationMode, setPresentationMode] = useState(false);

  const staggerBase = 1;

  // Ordered list of components for presentation mode
  const renderSequence = [
    { id: 'executive', component: <ExecutiveCommandBrief />, delay: staggerBase * 0 },
    { id: 'overview', component: <AnalyticsOverview />, delay: staggerBase * 1 },
    { id: 'trends', component: <IncidentAnalytics />, delay: staggerBase * 2 },
    { id: 'resources', component: <ResourceAnalytics />, delay: staggerBase * 3 },
    { id: 'comm', component: <CommunicationAnalytics />, delay: staggerBase * 4 },
    { id: 'decision', component: <DecisionAnalytics />, delay: staggerBase * 5 },
    { id: 'geo', component: <OperationalHeatmap />, delay: staggerBase * 6 },
    { id: 'predictive', component: <PredictiveInsights />, delay: staggerBase * 7 },
    { id: 'recommendations', component: <CommanderDecisionCard />, delay: staggerBase * 8 }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Operational Intelligence Center</h1>
            <p className="text-sm text-slate-500">Strategic Decision Support & Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 hidden md:flex mr-4">
            <Link href="/resources" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
              Resources
            </Link>
            <Link href="/communications" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
              Communications
            </Link>
            <Link href="/history" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
              History
            </Link>
          </div>
          {presentationMode ? (
            <Button variant="outline" onClick={() => setPresentationMode(false)} className="gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Standard View
            </Button>
          ) : (
            <Button onClick={() => setPresentationMode(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Play className="w-4 h-4" /> Start Presentation Mode
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 relative flex gap-6 items-start">
        {/* Left Side: System Health (Always Visible) */}
        <div className="w-64 hidden xl:block shrink-0">
          <SystemHealthPanel />
        </div>

        {/* Right Side: Analytics Content */}
        <div className="flex-1 min-w-0">
          {presentationMode ? (
            <div className="space-y-8 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="text-center py-8">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Strategic Commander Briefing</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Auto-sequencing operational state...</p>
              </div>
              {renderSequence.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.8, ease: "easeOut" }}
                >
                  {item.component}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-12">
              <div className="xl:col-span-12 space-y-6">
                <GlobalFilters />
                <ExecutiveCommandBrief />
              </div>
              
              <div className="xl:col-span-8 flex flex-col">
                <AnalyticsOverview />
              </div>
              <div className="xl:col-span-4 flex flex-col">
                <IncidentLifecycleFunnel />
              </div>

              <div className="xl:col-span-4 flex flex-col">
                <IncidentAnalytics />
              </div>
              <div className="xl:col-span-8 flex flex-col">
                <OperationalHeatmap />
              </div>

              <div className="xl:col-span-6 flex flex-col">
                <OperationalBottlenecks />
              </div>
              <div className="xl:col-span-6 flex flex-col">
                <ResourceAnalytics />
              </div>

              <div className="xl:col-span-4 flex flex-col">
                <DecisionAnalytics />
              </div>
              <div className="xl:col-span-4 flex flex-col">
                <CommunicationAnalytics />
              </div>
              <div className="xl:col-span-4 flex flex-col">
                <StakeholderAnalytics />
              </div>

              <div className="xl:col-span-4 flex flex-col">
                <OperatorAnalytics />
              </div>
              <div className="xl:col-span-4 flex flex-col">
                <PredictiveInsights />
              </div>
              <div className="xl:col-span-4 flex flex-col">
                <CommanderDecisionCard />
              </div>

              <div className="xl:col-span-12">
                <OperationalReports />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
