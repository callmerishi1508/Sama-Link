"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { OrganizationSettings } from '@/components/settings/OrganizationSettings';
import { UserManagement } from '@/components/settings/UserManagement';
import { StakeholderSettings } from '@/components/settings/StakeholderSettings';
import { AIConfiguration } from '@/components/settings/AIConfiguration';
import { ResourceSettings } from '@/components/settings/ResourceSettings';
import { CommunicationSettings } from '@/components/settings/CommunicationSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { PlatformIntegrations } from '@/components/settings/PlatformIntegrations';
import { APIManagement } from '@/components/settings/APIManagement';
import { AuditSettings } from '@/components/settings/AuditSettings';
import { PlatformHealth } from '@/components/settings/PlatformHealth';
import { useSettingsStore } from '@/stores/settings-store';
import { Search, SlidersHorizontal, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organization');
  const [presentationMode, setPresentationMode] = useState(false);
  const { searchQuery, setSearchQuery, profile, setProfile } = useSettingsStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'organization': return <OrganizationSettings />;
      case 'users':
      case 'roles': return <UserManagement />;
      case 'stakeholders': return <StakeholderSettings />;
      case 'ai': return <AIConfiguration />;
      case 'resources': return <ResourceSettings />;
      case 'communications': return <CommunicationSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'security': return <SecuritySettings />;
      case 'appearance': return <AppearanceSettings />;
      case 'integrations': return <PlatformIntegrations />;
      case 'api': return <APIManagement />;
      case 'audit':
      case 'backup': return <AuditSettings />;
      case 'health': return <PlatformHealth />;
      default: return (
        <div className="p-6">
          <h2 className="text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h2>
          <p className="text-slate-500 mt-2">Component under construction.</p>
        </div>
      );
    }
  };

  const renderSequence = [
    { id: 'organization', component: <OrganizationSettings />, delay: 0 },
    { id: 'roles', component: <UserManagement />, delay: 1 },
    { id: 'stakeholders', component: <StakeholderSettings />, delay: 2 },
    { id: 'ai', component: <AIConfiguration />, delay: 3 },
    { id: 'resources', component: <ResourceSettings />, delay: 4 },
    { id: 'communications', component: <CommunicationSettings />, delay: 5 },
    { id: 'notifications', component: <NotificationSettings />, delay: 6 },
    { id: 'security', component: <SecuritySettings />, delay: 7 },
    { id: 'appearance', component: <AppearanceSettings />, delay: 8 },
    { id: 'integrations', component: <PlatformIntegrations />, delay: 9 },
    { id: 'audit', component: <AuditSettings />, delay: 10 },
    { id: 'health', component: <PlatformHealth />, delay: 11 },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between shrink-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
        {!presentationMode ? (
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search settings..."
                className="pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Configuration Presentation</h2>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <Link href="/" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors hidden md:block">
            Live Preview
          </Link>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select 
              value={profile}
              onChange={(e) => setProfile(e.target.value as 'Production' | 'Testing' | 'Demo' | 'Development')}
              className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            >
              <option value="Production">Production Profile</option>
              <option value="Testing">Testing Profile</option>
              <option value="Demo">Demo Profile</option>
              <option value="Development">Development Profile</option>
            </select>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
          {presentationMode ? (
            <Button variant="outline" onClick={() => setPresentationMode(false)} className="gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Standard View
            </Button>
          ) : (
            <Button onClick={() => setPresentationMode(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Play className="w-4 h-4" /> Present Configuration
            </Button>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {!presentationMode && (
          <div className="lg:w-64 shrink-0">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {presentationMode ? (
            <div className="w-full space-y-12">
              <div className="text-center pb-8 border-b border-slate-200 dark:border-slate-800">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Enterprise Configuration Briefing</h1>
                <p className="text-slate-500 mt-2">Auto-sequencing platform settings...</p>
              </div>
              {renderSequence.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.8, ease: "easeOut" }}
                >
                  <div className="pointer-events-none opacity-90 scale-95 origin-top relative">
                    <div className="absolute inset-0 bg-transparent z-50"></div>
                    {item.component}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
}
