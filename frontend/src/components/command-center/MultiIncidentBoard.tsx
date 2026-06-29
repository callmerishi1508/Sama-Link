import React from 'react';
import { useIncidentStore } from '@/stores/incident-store';
import { IncidentStatus, Incident } from '@/types/incident';
import { rankIncidents, PriorityMetrics } from '@/lib/priority-engine';
import { AlertTriangle, Clock, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const COLUMNS: { id: IncidentStatus; label: string }[] = [
  { id: 'NEW', label: 'New Reports' },
  { id: 'UNDERSTANDING', label: 'Understanding' },
  { id: 'ASSESSMENT', label: 'Assessment' },
  { id: 'AWAITING_APPROVAL', label: 'Awaiting Approval' },
  { id: 'RESOURCES_ASSIGNED', label: 'Resources Assigned' },
  { id: 'RESPONDING', label: 'Responding' }
];

export function MultiIncidentBoard() {
  const incidentsObj = useIncidentStore(state => state.incidents);
  const activeIncidentId = useIncidentStore(state => state.activeIncidentId);
  const setActiveIncident = useIncidentStore(state => state.setActiveIncident);
  const updateIncidentStatus = useIncidentStore(state => state.updateIncidentStatus);

  const incidents = Object.values(incidentsObj).filter(i => i.status !== 'RESOLVED');
  const rankedIncidents = React.useMemo(() => rankIncidents(incidents), [incidents]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('incidentId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, status: IncidentStatus) => {
    e.preventDefault();
    const incidentId = e.dataTransfer.getData('incidentId');
    if (incidentId) {
      updateIncidentStatus(incidentId, status);
    }
  };

  return (
    <div className="flex gap-4 pb-4 h-full overflow-x-auto custom-scrollbar items-stretch">
      {COLUMNS.map(col => {
        const colIncidents = rankedIncidents.filter(i => i.status === col.id);
        
        return (
          <div 
            key={col.id} 
            className="flex flex-col bg-slate-100/50 dark:bg-slate-800/20 rounded-2xl border border-slate-200 dark:border-slate-800 h-full w-[300px] shrink-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">{col.label}</h3>
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">
                {colIncidents.length}
              </span>
            </div>
            
            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {colIncidents.map(incident => (
                <IncidentCard 
                  key={incident.id} 
                  incident={incident} 
                  isActive={activeIncidentId === incident.id}
                  onClick={() => setActiveIncident(incident.id)}
                  onDragStart={(e) => handleDragStart(e, incident.id)}
                />
              ))}
              {colIncidents.length === 0 && (
                <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 text-xs font-medium">
                  Drop to {col.label}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IncidentCard({ incident, isActive, onClick, onDragStart }: { incident: Incident & PriorityMetrics, isActive: boolean, onClick: () => void, onDragStart: (e: React.DragEvent) => void }) {
  const timeWaitingMinutes = React.useMemo(() => {
    return Math.floor((new Date().getTime() - new Date(incident.createdAt).getTime()) / 60000);
  }, [incident.createdAt]);
  
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 rounded-xl p-4 cursor-grab active:cursor-grabbing border-2 transition-all shadow-sm ${
        isActive 
          ? 'border-indigo-500 ring-4 ring-indigo-500/10' 
          : incident.riskLevel === 'CRITICAL' 
            ? 'border-rose-500/50 hover:border-rose-500' 
            : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
          {incident.incidentNumber}
        </span>
        {incident.rank === 1 && (
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 px-1.5 py-0.5 rounded animate-pulse">
            #1 Priority
          </span>
        )}
      </div>

      <h4 className="font-bold text-slate-900 dark:text-white leading-tight mb-2">
        {incident.title}
      </h4>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{incident.location || 'Location Unknown'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span suppressHydrationWarning>Waiting {timeWaitingMinutes}m</span>
        </div>
        {incident.waitingOn && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 px-2 py-1 rounded">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>Waiting: {incident.waitingOn}</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Score: <strong className="text-slate-900 dark:text-white">{incident.score}/100</strong></span>
          <span className="text-slate-500">Rank: <strong className="text-slate-900 dark:text-white">#{incident.rank}</strong></span>
        </div>
        <div className="text-[10px] text-slate-500 leading-tight bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
          <strong>Reason:</strong> {incident.reason}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {incident.resources?.map((r, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold text-indigo-700 dark:text-indigo-300" title={r}>
              {r.substring(0, 2).toUpperCase()}
            </div>
          ))}
        </div>
        <Link 
          href={`/incidents/${incident.id}`}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          Open <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
