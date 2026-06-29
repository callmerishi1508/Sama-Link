import React from 'react';
import { ResourceUnit } from '@/types/resource';
import { X, MapPin, Radio, Calendar, HardHat } from 'lucide-react';
import { ResourceTimeline } from './ResourceTimeline';
import { ResourceHealthCard } from './ResourceHealthCard';

interface Props {
  unit: ResourceUnit | null;
  onClose: () => void;
}

export function ResourceDetailsDrawer({ unit, onClose }: Props) {
  if (!unit) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed top-0 right-0 h-screen w-full md:w-[480px] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {unit.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                unit.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                unit.status === 'Busy' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {unit.status}
              </span>
              <span>•</span>
              <span>{unit.type}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Current Assignment Summary */}
          {unit.reservedByIncidentId && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">
                Current Assignment
              </span>
              <div className="font-bold text-indigo-900 dark:text-indigo-300 text-lg mb-1">
                {unit.reservedByIncidentId}
              </div>
              <div className="flex justify-between items-center text-sm text-indigo-700 dark:text-indigo-400">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> ETA: {unit.etaToIncident || '--'}</span>
                <span className="font-bold">{unit.assignmentState}</span>
              </div>
            </div>
          )}

          {/* Operational Details Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Operational Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Radio className="w-3 h-3" /> Comms
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{unit.communicationStatus}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <HardHat className="w-3 h-3" /> Shift
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{unit.shiftStatus}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> Utilization Today
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{unit.todayUtilization}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" /> 7-Day Avg
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{unit.past7DayUtilization}%</span>
              </div>
            </div>
          </div>

          <ResourceHealthCard unit={unit} />

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Activity Timeline
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/20 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
              <ResourceTimeline events={unit.timeline} />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
