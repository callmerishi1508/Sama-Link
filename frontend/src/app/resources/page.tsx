"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useResourceStore } from '@/stores/resource-store';
import { CapacityForecast } from '@/components/resources/CapacityForecast';
import { ResourceReservationBoard } from '@/components/resources/ResourceReservationBoard';
import { ResourceConflictDetector } from '@/components/resources/ResourceConflictDetector';
import { ResourceDetailsDrawer } from '@/components/resources/ResourceDetailsDrawer';
import { ResourceIntelligenceEngine } from '@/lib/resourceIntelligence';
import { ResourceUnit } from '@/types/resource';
import { Search, Filter, ShieldAlert, Activity, Truck, Users } from 'lucide-react';

export default function ResourcesPage() {
  const units = useResourceStore(state => state.units);
  const organizations = useResourceStore(state => state.organizations);
  const [selectedUnit, setSelectedUnit] = useState<ResourceUnit | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Overview' | 'Medical' | 'Police' | 'Fire/Rescue' | 'NGO'>('Overview');

  // Memoize conflicts so we don't recalculate on every render
  const conflicts = useMemo(() => ResourceIntelligenceEngine.detectConflicts(units), [units]);

  // Filtered units
  const filteredUnits = useMemo(() => {
    let filtered = units;
    if (activeTab !== 'Overview') {
      filtered = filtered.filter(u => u.type === activeTab);
    }
    if (searchQuery) {
      filtered = filtered.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  }, [units, activeTab, searchQuery]);

  // KPIs
  const totalAvailable = filteredUnits.filter(u => u.status === 'Available').length;
  const totalBusy = filteredUnits.filter(u => u.status === 'Busy').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            City Resource Logistics
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Real-time capacity, forecasts, and conflict resolution
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search units..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/incidents" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
              Incidents
            </Link>
            <Link href="/communications" className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
              Communications
            </Link>
          </div>
          <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
        {['Overview', 'Medical', 'Police', 'Fire/Rescue', 'NGO'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'Overview' | 'Medical' | 'Police' | 'Fire/Rescue' | 'NGO')}
            className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab === 'Overview' && 'City Overview'}
            {tab === 'Medical' && <span className="flex items-center gap-2"><Activity className="w-4 h-4"/> Ambulances & Hospitals</span>}
            {tab === 'Police' && <span className="flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Police</span>}
            {tab === 'Fire/Rescue' && <span className="flex items-center gap-2"><Truck className="w-4 h-4"/> Fire</span>}
            {tab === 'NGO' && <span className="flex items-center gap-2"><Users className="w-4 h-4"/> NGOs & Volunteers</span>}
          </button>
        ))}
      </div>

      {/* Top Row KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Units</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{filteredUnits.length}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Available</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{totalAvailable}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Busy / Assigned</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{totalBusy}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">Active Conflicts</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{conflicts.length}</div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Top Full-Width: Reservation Board */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Reservation & Dispatch Board</h3>
          <ResourceReservationBoard units={filteredUnits} />
        </div>

        {/* Bottom Grid: Conflicts/Capacity & Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-8">
            <ResourceConflictDetector 
              conflicts={conflicts} 
              onResolve={() => {}} 
            />
            <CapacityForecast 
              organizations={organizations.filter(o => activeTab === 'Overview' || o.type === activeTab)} 
            />
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Unit Directory</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredUnits.map(unit => (
                  <div 
                    key={unit.id}
                    onClick={() => setSelectedUnit(unit)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{unit.name}</h4>
                      <div className="text-xs text-slate-500 mt-1">{unit.type} • ID: {unit.id}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      unit.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                      unit.status === 'Busy' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {unit.status}
                    </span>
                  </div>
                ))}
                {filteredUnits.length === 0 && (
                  <div className="col-span-full py-8 text-center text-slate-500">
                    No units found matching criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResourceDetailsDrawer 
        unit={selectedUnit} 
        onClose={() => setSelectedUnit(null)} 
      />
    </div>
  );
}
