"use client";

import { useUIStore } from "@/stores/ui-store";
import { PlayCircle, Settings, Search, Bell, User, Menu } from "lucide-react";
import { FloatingMetricsPanel } from "@/components/demo/FloatingMetricsPanel";

export function TopNav() {
  const { demoMode, toggleDemoMode, sidebarExpanded, toggleSidebar, isMobile } = useUIStore();

  return (
    <>
      <header 
        className={`fixed top-0 right-0 z-[100] h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md transition-all duration-300 ${
          isMobile ? 'left-0 pl-40' : (sidebarExpanded ? 'left-64' : 'left-20')
        }`}
      >
        {/* Left section: Search / Mobile Menu */}
        <div className="flex items-center gap-4 flex-1">
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              className="p-2 -ml-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-expanded={sidebarExpanded}
              aria-controls="sidebar-menu"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search incidents, people, or locations..." 
              className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-full py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 font-mono text-[10px] font-medium text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right section: Global actions */}
        <div className="flex items-center gap-3">
          {demoMode && (
            <button
              onClick={() => {
                const event = new CustomEvent("start-auto-demo");
                window.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20"
            >
              <PlayCircle className="w-4 h-4 fill-indigo-500/20" />
              <span className="text-xs font-bold tracking-wide uppercase">Auto Demo</span>
            </button>
          )}

          <button
            onClick={toggleDemoMode}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
              demoMode 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' 
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {demoMode ? <PlayCircle className="w-4 h-4 animate-pulse" /> : <Settings className="w-4 h-4" />}
            <span className="text-xs font-bold tracking-wide uppercase">{demoMode ? 'Presentation Mode Active' : 'Presentation Mode'}</span>
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 relative transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="w-5 h-5" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0a0a0a]" />
          </button>
          
          <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm ring-2 ring-white dark:ring-[#0a0a0a] ml-1">
            <User className="w-4 h-4" />
          </button>
        </div>
      </header>


      <FloatingMetricsPanel />
    </>
  );
}
