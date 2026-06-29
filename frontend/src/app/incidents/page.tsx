"use client";

import { useIncidentStore } from "@/stores/incident-store";
import { useResourceStore } from "@/stores/resource-store";
import { OperationalAlerts } from "@/components/resources/OperationalAlerts";
import { AlertTriangle, ShieldAlert, Search, Filter, MoreVertical, LayoutGrid, List, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function IncidentsQueue() {
  const incidentsMap = useIncidentStore(state => state.incidents);
  const incidents = Object.values(incidentsMap);
  const units = useResourceStore(state => state.units);
  const sortedIncidents = [...incidents].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const [view, setView] = useState<'table' | 'grid'>('table');

  return (
    <div className="w-full max-w-[1800px] mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Active Operations</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Real-time incident queue and decision support pipeline.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search ID, location..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setView('table')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'table' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <OperationalAlerts />

      {/* Enterprise Data Table */}
      <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="text-xs uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-bold">Incident</th>
                <th className="px-6 py-4 font-bold">Risk Level</th>
                <th className="px-6 py-4 font-bold">Dispatch Status</th>
                <th className="px-6 py-4 font-bold">Assigned Resources</th>
                <th className="px-6 py-4 font-bold">Avg ETA</th>
                <th className="px-6 py-4 font-bold">Coordinator</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {sortedIncidents.map(incident => {
                const assignedUnits = units.filter(u => u.reservedByIncidentId === incident.id);
                const policeCount = assignedUnits.filter(u => u.type === 'Police').length;
                const fireCount = assignedUnits.filter(u => u.type === 'Fire/Rescue').length;
                const medicalCount = assignedUnits.filter(u => u.type === 'Medical').length;
                const ngoCount = assignedUnits.filter(u => u.type === 'NGO').length;

                return (
                  <tr key={incident.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <Link href={`/incidents/${incident.id}`} className="block">
                        <div className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {incident.incidentNumber}
                        </div>
                        <div className="text-xs truncate max-w-[200px] mt-0.5">{incident.title}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {incident.riskLevel ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          incident.riskLevel === 'CRITICAL' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' :
                          incident.riskLevel === 'HIGH' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' :
                          incident.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                          'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                        }`}>
                          {incident.riskLevel === 'CRITICAL' ? <AlertTriangle className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                          {incident.riskLevel}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Analyzing...</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        incident.status === 'AWAITING_APPROVAL' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                        incident.status === 'RESOLVED' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                        'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      }`}>
                        {incident.status === 'AWAITING_APPROVAL' && <Activity className="w-3.5 h-3.5" />}
                        {incident.status === 'RESOLVED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {incident.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {incident.status !== 'UNDERSTANDING' && incident.status !== 'ASSESSMENT' && incident.status !== 'NEW' && incident.status !== 'AWAITING_APPROVAL' ? (
                        <div className="flex -space-x-2">
                          {policeCount > 0 && <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-[8px] font-bold text-blue-700 dark:text-blue-400 z-40" title="Police Assigned">{policeCount}P</div>}
                          {fireCount > 0 && <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-[8px] font-bold text-red-700 dark:text-red-400 z-30" title="Fire Assigned">{fireCount}F</div>}
                          {medicalCount > 0 && <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-[8px] font-bold text-emerald-700 dark:text-emerald-400 z-20" title="Ambulance Assigned">{medicalCount}A</div>}
                          {ngoCount > 0 && <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-[8px] font-bold text-purple-700 dark:text-purple-400 z-10" title="NGO Assigned">{ngoCount}N</div>}
                          {assignedUnits.length === 0 && <span className="text-slate-400 text-xs ml-2">—</span>}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {incident.status !== 'UNDERSTANDING' && incident.status !== 'ASSESSMENT' && incident.status !== 'NEW' && incident.status !== 'AWAITING_APPROVAL' && assignedUnits.length > 0 ? `${Math.round(assignedUnits.reduce((acc, u) => acc + parseInt(u.etaToIncident || '0'), 0) / assignedUnits.length)} mins` : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {incident.status !== 'UNDERSTANDING' && incident.status !== 'ASSESSMENT' && incident.status !== 'NEW' ? 'Op-Lead-42' : 'Auto-Routing'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {sortedIncidents.length === 0 && (
            <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800/60">
              <ShieldAlert className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Active Operations</h3>
              <p className="text-sm max-w-sm mb-6">There are currently no active incidents in the queue requiring operational attention or dispatch.</p>
              <Link href="/report" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors">
                Report New Incident
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
