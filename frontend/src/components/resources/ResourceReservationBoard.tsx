import React from 'react';
import { ResourceUnit } from '@/types/resource';

interface Props {
  units: ResourceUnit[];
}

export function ResourceReservationBoard({ units }: Props) {
  
  const columns = [
    { id: 'Available', label: 'Available', color: 'slate' },
    { id: 'Requested', label: 'Reserved', color: 'indigo' },
    { id: 'En Route', label: 'En Route', color: 'amber' },
    { id: 'On Scene', label: 'On Scene', color: 'emerald' },
    { id: 'Returning', label: 'Returning', color: 'blue' },
  ];

  return (
    <div className="w-full pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
        {columns.map(col => {
          const colUnits = units.filter(u => 
            u.assignmentState === col.id || 
            (col.id === 'Available' && (u.assignmentState === 'Available' || !u.assignmentState))
          );
          
          return (
            <div key={col.id} className="w-full flex flex-col">
              <div className={`flex items-center justify-between p-3 rounded-t-xl border border-b-0 border-${col.color}-200 dark:border-${col.color}-900 bg-${col.color}-50 dark:bg-${col.color}-900/20`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider text-${col.color}-700 dark:text-${col.color}-400`}>
                  {col.label}
                </h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-${col.color}-100 dark:bg-${col.color}-900 text-${col.color}-800 dark:text-${col.color}-300`}>
                  {colUnits.length}
                </span>
              </div>
              
              <div className={`p-2 bg-slate-50 dark:bg-slate-900/50 border border-${col.color}-200 dark:border-${col.color}-900 rounded-b-xl min-h-[150px] space-y-2`}>
                {colUnits.map(unit => (
                  <div key={unit.id} className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">{unit.name}</div>
                    
                    <div className="flex flex-col gap-1 text-[10px] uppercase font-bold tracking-wider">
                      {unit.reservedByIncidentId && (
                        <div className="text-indigo-600 dark:text-indigo-400">
                          Res: {unit.reservedByIncidentId}
                        </div>
                      )}
                      <div className="text-slate-500">
                        {unit.type}
                      </div>
                    </div>
                  </div>
                ))}
                
                {colUnits.length === 0 && (
                  <div className="h-full flex items-center justify-center pt-8">
                    <span className="text-xs text-slate-400 font-medium">Empty</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
