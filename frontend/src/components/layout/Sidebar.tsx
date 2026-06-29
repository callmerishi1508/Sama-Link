"use client";

import { Home, ListTodo, Activity, History, Users, Radio, Settings, ChevronLeft, ChevronRight, Siren, Pin, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/ui-store";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarExpanded: sidebarOpen, toggleSidebar, isMobile } = useUIStore();

  const navigationGroups = [
    {
      name: 'Operations',
      items: [
        { name: 'Dashboard', href: '/', icon: Home, count: null },
        { name: 'Report Incident', href: '/report', icon: Siren, highlight: true },
        { name: 'Active Incidents', href: '/incidents', icon: ListTodo, count: 3 },
        { name: 'Resources', href: '/resources', icon: Users },
        { name: 'Communications', href: '/communications', icon: Radio },
      ]
    },
    {
      name: 'Analysis',
      items: [
        { name: 'History', href: '/history', icon: History },
        { name: 'Analytics', href: '/analytics', icon: Activity },
      ]
    },
    {
      name: 'Administration',
      items: [
        { name: 'Settings', href: '/settings', icon: Settings },
      ]
    }
  ];

  const sidebarClasses = isMobile
    ? `fixed top-0 left-0 h-screen bg-white dark:bg-[#0A0A0A] border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 z-[100] flex flex-col w-64 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`
    : `fixed top-0 left-0 h-screen bg-white dark:bg-[#0A0A0A] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-[90] flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`;

  return (
    <>
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 dark:bg-black/50 z-[95] backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <aside className={sidebarClasses}>
      {/* Workspace / Org Selector */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {sidebarOpen ? (
          <button className="flex items-center justify-between w-full p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                S
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">SAMA LINK</div>
                <div className="text-xs text-slate-500 truncate">HQ Operations</div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          </button>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
            S
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide flex flex-col gap-6">
        
        {/* Main Navigation */}
        <nav className="space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.name} className="space-y-1">
              {sidebarOpen && <div className="px-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{group.name}</div>}
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center ${sidebarOpen ? 'justify-between px-3' : 'justify-center'} py-2.5 rounded-xl transition-all group ${
                      isActive 
                        ? item.highlight 
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' 
                          : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={!sidebarOpen ? item.name : undefined}
                    onClick={() => { if (isMobile) toggleSidebar(); }}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${item.highlight && !isActive ? 'text-rose-500' : ''}`} />
                      {sidebarOpen && (
                        <span className="text-sm truncate">{item.name}</span>
                      )}
                    </div>
                    {sidebarOpen && item.count && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Pinned Incidents */}
        {sidebarOpen && (
          <div className="space-y-1">
            <div className="px-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              Pinned
              <Pin className="w-3 h-3" />
            </div>
            <Link href="/incidents/INC-2026-8812" onClick={() => { if (isMobile) toggleSidebar(); }} className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white rounded-xl group transition-colors">
              <div className="flex items-center gap-2 truncate">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="truncate font-medium">INC-2026-8812</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Unread updates" />
            </Link>
            <Link href="/incidents/INC-2026-8810" onClick={() => { if (isMobile) toggleSidebar(); }} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="truncate font-medium">INC-2026-8810</span>
            </Link>
          </div>
        )}
      </div>

      {/* Operator Profile */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        {sidebarOpen ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">Op-Lead-42</div>
              <div className="text-xs text-slate-500 truncate flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active Shift
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 transition-colors p-1">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
            <User className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      {!isMobile && (
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3.5 top-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white shadow-sm transition-colors z-50 flex items-center justify-center group"
          title="Toggle Sidebar (Ctrl+B)"
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <div className="absolute left-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Ctrl+B
          </div>
        </button>
      )}
    </aside>
    </>
  );
}
