import React from 'react';
import { TrendingUp, Activity, Radio, Truck, CloudRain, Lightbulb, ArrowUpRight, ArrowDownRight, Clock, ArrowRight } from 'lucide-react';

export function IncidentTrends() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[180px] justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-indigo-500" /> Incident Trends
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
          <Clock className="w-3 h-3" /> Just now
        </div>
      </div>
      <div className="flex-1 flex items-end">
        <div className="w-full flex items-end justify-between gap-1.5 h-16">
          {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
            <div key={i} className="w-full bg-indigo-200 dark:bg-indigo-900/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
          <ArrowDownRight className="w-4 h-4" /> 12% vs last shift
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider">Stable</span>
      </div>
    </div>
  );
}

export function HospitalStatus() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[180px] justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-rose-500" /> Hospital Network
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
          <Clock className="w-3 h-3" /> 2m ago
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Trauma Centers</span>
            <span className="text-amber-500 flex items-center gap-1">85% <ArrowUpRight className="w-3 h-3"/></span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>General Beds</span>
            <span className="text-emerald-500 flex items-center gap-1">42% <ArrowDownRight className="w-3 h-3"/></span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>
      </div>
      <div className="text-[10px] font-bold text-rose-500 mt-2 bg-rose-100 dark:bg-rose-900/30 px-2 py-1 rounded w-max">1 facility on diversion</div>
    </div>
  );
}

export function CommunicationsHealth() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[180px] justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-4 h-4 text-emerald-500" /> Comms Health
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
          <Clock className="w-3 h-3" /> Live
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-end gap-3">
          <div className="text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">99.8<span className="text-3xl text-slate-400">%</span></div>
          <div className="pb-1.5">
             <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold">
               <ArrowUpRight className="w-4 h-4" /> 0.1%
             </div>
          </div>
        </div>
        <div className="text-sm font-medium text-emerald-500 mt-2 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Network Optimal</div>
      </div>
      <div className="text-[10px] font-bold text-slate-500 mt-2 border-t border-slate-200 dark:border-slate-800 pt-3">All primary channels active & encrypted</div>
    </div>
  );
}

export function LogisticsOverview() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[180px] justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-amber-500" /> Logistics
        </div>
        <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">Nominal</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">En Route</span>
          <span className="text-lg font-black text-slate-900 dark:text-white">14 <span className="text-xs text-slate-400 font-medium">units</span></span>
        </div>
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Refueling</span>
          <span className="text-lg font-black text-slate-900 dark:text-white">3 <span className="text-xs text-slate-400 font-medium">units</span></span>
        </div>
      </div>
    </div>
  );
}

export function WeatherConditions() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[180px] justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <CloudRain className="w-4 h-4 text-sky-500" /> Weather Ops
        </div>
        <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">Monitor</span>
      </div>
      <div className="flex-1 flex items-center gap-5">
        <div className="text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">68°</div>
        <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 leading-snug">
          <div className="text-slate-900 dark:text-white font-bold mb-0.5">Light Rain</div>
          <div>Wind 12mph NE</div>
          <div className="text-amber-500 text-xs mt-1">Gusts up to 25mph</div>
        </div>
      </div>
      <div className="text-[10px] font-bold text-slate-500 mt-2 border-t border-slate-200 dark:border-slate-800 pt-3">Clearance expected 14:00</div>
    </div>
  );
}

export function AIRecommendations() {
  return (
    <div className="bg-indigo-600 rounded-2xl p-5 border border-indigo-500 shadow-sm flex flex-col h-[180px] justify-between group cursor-pointer hover:bg-indigo-700 transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
      
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-indigo-300" /> Active Protocol
        </div>
        <span className="text-[10px] uppercase font-black text-white tracking-wider bg-white/20 px-2 py-0.5 rounded">Priority 1</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="text-xl font-black text-white leading-tight mb-2">
          Activate Storm Response Protocol Alpha
        </div>
        <div className="text-indigo-200 text-xs font-medium">94% Confidence · Prevents cascade</div>
      </div>
      
      <div className="text-[11px] font-black uppercase text-indigo-200 mt-2 flex items-center justify-between group-hover:text-white transition-colors relative z-10">
        <span>Review Execution Plan</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}
