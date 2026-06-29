import React from 'react';
import { OrganizationCapacity } from '@/types/resource';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  organizations: OrganizationCapacity[];
}

export function CapacityForecast({ organizations }: Props) {
  
  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-rose-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-emerald-500" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      default: return <Minus className="w-4 h-4 text-slate-400" />;
    }
  };

  const getBarColor = (val: number) => {
    if (val >= 90) return 'bg-rose-500';
    if (val >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">City Capacity Forecast</h3>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
          Next 60 Minutes
        </span>
      </div>

      <div className="grid gap-4">
        {organizations.map(org => {
          if (!org.forecast) return null;
          
          return (
            <div key={org.id} className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400`}>
                    <org.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{org.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                      {getTrendIcon(org.forecast.trend)}
                      <span>{org.forecast.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current</span>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                    <div className={`h-full ${getBarColor(org.forecast.current)}`} style={{ width: `${org.forecast.current}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{org.forecast.current}%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">+30 Min</span>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                    <div className={`h-full ${getBarColor(org.forecast.in30Min)}`} style={{ width: `${org.forecast.in30Min}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{org.forecast.in30Min}%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">+60 Min</span>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                    <div className={`h-full ${getBarColor(org.forecast.in60Min)}`} style={{ width: `${org.forecast.in60Min}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{org.forecast.in60Min}%</span>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-lg flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block mb-0.5">
                    Operational Action
                  </span>
                  <span className="text-sm font-medium text-indigo-900 dark:text-indigo-300">
                    {org.forecast.recommendation}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
