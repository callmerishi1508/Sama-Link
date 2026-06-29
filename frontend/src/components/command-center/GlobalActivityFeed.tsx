import { useCommandCenterStore } from '@/stores/command-center-store';
import { useIncidentStore } from '@/stores/incident-store';
import { Bot, User, PhoneCall, Truck, Users, Server, Building2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';

export function GlobalActivityFeed() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  const activityFeed = useCommandCenterStore(state => state.activityFeed);
  const setActiveIncident = useIncidentStore(state => state.setActiveIncident);

  const getIcon = (category: string) => {
    switch(category) {
      case 'REPORT': return <PhoneCall className="w-4 h-4" />;
      case 'AI': return <Bot className="w-4 h-4" />;
      case 'HUMAN': return <User className="w-4 h-4" />;
      case 'RESOURCE': return <Truck className="w-4 h-4" />;
      case 'STAKEHOLDER': return <Users className="w-4 h-4" />;
      case 'HOSPITAL': return <Building2 className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const getColor = (category: string) => {
    switch(category) {
      case 'REPORT': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'AI': return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'HUMAN': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'RESOURCE': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'HOSPITAL': return 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400';
      default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col">
      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5 shrink-0">
        <Server className="w-4 h-4 text-indigo-500" /> Live Feed
      </h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="flex flex-col space-y-3">
          {activityFeed.map(log => (
            <div key={log.id} className="relative pl-6 before:absolute before:left-[11px] before:top-6 before:bottom-[-12px] before:w-px before:bg-slate-200 dark:before:bg-slate-800 last:before:hidden group">
              <div className={`absolute left-0 top-1 p-1 rounded-full ${getColor(log.category)} ring-4 ring-white dark:ring-slate-900`}>
                {getIcon(log.category)}
              </div>
              <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{log.category}</span>
                  <span className="text-[9px] font-bold text-slate-400">
                    {mounted ? `${formatDistanceToNow(new Date(log.timestamp))} ago` : 'just now'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">{log.message}</p>

              
              {log.incidentId && (
                <button 
                  onClick={() => setActiveIncident(log.incidentId!)}
                  className="mt-2 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" /> Focus Incident
                </button>
              )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
