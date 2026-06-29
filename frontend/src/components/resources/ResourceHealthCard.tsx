import React from 'react';
import { ResourceUnit } from '@/types/resource';
import { HeartPulse, CheckCircle2, Battery, AlertTriangle, Wrench } from 'lucide-react';

interface Props {
  unit: ResourceUnit;
}

export function ResourceHealthCard({ unit }: Props) {
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <HeartPulse className="w-5 h-5 text-rose-500" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Health & Readiness
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Operational Score
          </span>
          <div className={`text-2xl font-black ${getScoreColor(unit.healthScore)}`}>
            {unit.healthScore}/100
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Crew Readiness
          </span>
          <div className={`text-2xl font-black ${getScoreColor(unit.readinessScore)}`}>
            {unit.readinessScore}/100
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
            <Battery className="w-4 h-4" /> Fuel Level
          </span>
          <span className={`font-bold ${unit.fuelLevel > 30 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {unit.fuelLevel}%
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
            <Wrench className="w-4 h-4" /> Maintenance
          </span>
          <span className={`font-bold ${unit.maintenanceStatus === 'Good' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {unit.maintenanceStatus}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4" /> Med Equipment
          </span>
          <span className="font-bold text-slate-900 dark:text-white">
            {unit.medicalEquipment}
          </span>
        </div>
      </div>
      
      {unit.maintenanceStatus === 'Due Soon' && (
        <div className="mt-4 p-2.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg flex items-start gap-2 border border-amber-100 dark:border-amber-900/50">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
            Scheduled maintenance due in 48 hours. Consider rotational swap.
          </span>
        </div>
      )}
    </div>
  );
}
