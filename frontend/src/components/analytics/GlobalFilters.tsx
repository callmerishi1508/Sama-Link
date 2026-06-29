import React from 'react';
import { useAnalyticsStore } from '@/stores/analytics-store';
import { Filter, Calendar, Map, Activity, Layers, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GlobalFilters() {
  const { filters, setFilters } = useAnalyticsStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 pr-4 border-r border-slate-200 dark:border-slate-800">
        <Filter className="w-4 h-4 text-indigo-500" /> Filters
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-slate-400" />
        <select 
          className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          value={filters.timeRange}
          onChange={(e) => setFilters({ timeRange: e.target.value as "24h" | "7d" | "30d" | "custom" })}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-slate-400" />
        <select 
          className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          value={filters.incidentType}
          onChange={(e) => setFilters({ incidentType: e.target.value as "all" | "medical" | "fire" | "police" | "rescue" })}
        >
          <option value="all">All Incidents</option>
          <option value="medical">Medical</option>
          <option value="fire">Fire</option>
          <option value="police">Police</option>
          <option value="rescue">Rescue</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Bell className="w-4 h-4 text-slate-400" />
        <select 
          className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as "all" | "critical" | "high" | "medium" | "low" })}
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Map className="w-4 h-4 text-slate-400" />
        <select 
          className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          value={filters.zone}
          onChange={(e) => setFilters({ zone: e.target.value as "all" | "north" | "south" | "east" | "west" | "central" })}
        >
          <option value="all">All Zones</option>
          <option value="north">North Zone</option>
          <option value="south">South Zone</option>
          <option value="east">East Zone</option>
          <option value="west">West Zone</option>
          <option value="central">Central Zone</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-slate-400" />
        <select 
          className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          value={filters.resourceType}
          onChange={(e) => setFilters({ resourceType: e.target.value as "all" | "ambulance" | "fire_engine" | "police_unit" })}
        >
          <option value="all">All Resources</option>
          <option value="ambulance">Ambulances</option>
          <option value="fire_engine">Fire Engines</option>
          <option value="police_unit">Police Units</option>
        </select>
      </div>

      <div className="flex-1" />
      <Button variant="ghost" size="sm" className="text-xs text-indigo-500 hover:text-indigo-600">
        Clear All
      </Button>
    </div>
  );
}
