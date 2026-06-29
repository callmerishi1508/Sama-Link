import React from 'react';
import { 
  Building2, Users, UserCheck, ShieldAlert, Cpu, Truck, 
  Radio, Bell, Lock, Palette, Link as LinkIcon, Webhook, 
  Database, HardDrive, Activity 
} from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  const tabs = [
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'roles', label: 'Role Matrix', icon: UserCheck },
    { id: 'stakeholders', label: 'Stakeholders', icon: ShieldAlert },
    { id: 'ai', label: 'AI Configuration', icon: Cpu },
    { id: 'resources', label: 'Resource Settings', icon: Truck },
    { id: 'communications', label: 'Communications', icon: Radio },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'api', label: 'API Management', icon: Webhook },
    { id: 'audit', label: 'Audit & Retention', icon: Database },
    { id: 'backup', label: 'Backup & Recovery', icon: HardDrive },
    { id: 'health', label: 'Platform Health', icon: Activity },
  ];

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-4">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Platform Admin</h2>
        <div className="text-sm font-bold text-slate-900 dark:text-white">Settings & Integrations</div>
      </div>
      
      <div className="flex flex-col gap-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
