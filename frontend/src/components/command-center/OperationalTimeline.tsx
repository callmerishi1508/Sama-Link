import React from 'react';
import { useCommandCenterStore } from '@/stores/command-center-store';
import { History } from 'lucide-react';
import { useState, useEffect } from 'react';

export function OperationalTimeline() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  const activityFeed = useCommandCenterStore(state => state.activityFeed);
  // Just show the top 8 most recent events
  const timeline = activityFeed.slice(0, 8);

  const getCategoryStyles = (category: string) => {
    switch(category) {
      case 'AI': return { icon: 'bot', color: 'text-indigo-500', bg: 'bg-indigo-500' };
      case 'HUMAN': return { icon: 'user', color: 'text-emerald-500', bg: 'bg-emerald-500' };
      case 'RESOURCE': return { icon: 'truck', color: 'text-amber-500', bg: 'bg-amber-500' };
      default: return { icon: 'info', color: 'text-slate-500', bg: 'bg-slate-500' };
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
      <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2 shrink-0">
        <History className="w-4 h-4 text-indigo-500" /> Operational Timeline
      </h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="flex flex-col">
          {timeline.map((log, i) => {
            const styles = getCategoryStyles(log.category);
            return (
              <div key={log.id} className="flex gap-3 items-start group">
                {/* Timestamp Column */}
                <div className="w-12 shrink-0 text-right">
                  <div className="text-[10px] font-black text-slate-400 mt-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    {mounted ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                  </div>
                </div>
                
                {/* Line / Node */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-2 h-2 rounded-full ${styles.bg} ring-2 ring-white dark:ring-slate-900 z-10 mt-1.5`} />
                  {i !== timeline.length - 1 && (
                    <div className="absolute top-3 w-px h-full bg-slate-200 dark:bg-slate-800 -bottom-1" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-3">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                    {log.message}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-black uppercase tracking-wider ${styles.color}`}>
                      {log.category}
                    </span>
                    {log.incidentId && (
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm">
                        {log.incidentId.slice(0,8)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
