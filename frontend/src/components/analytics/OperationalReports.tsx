import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OperationalReports() {
  const reports = [
    { title: 'Daily Operations', freq: 'Daily', size: '1.2 MB' },
    { title: 'Weekly Summary', freq: 'Weekly', size: '4.5 MB' },
    { title: 'Monthly Performance', freq: 'Monthly', size: '12.8 MB' },
    { title: 'Incident Analysis', freq: 'On-Demand', size: '--' },
    { title: 'Resource Report', freq: 'On-Demand', size: '--' },
    { title: 'Communication Audit', freq: 'On-Demand', size: '--' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          Intelligence Reports
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center group hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
            <div>
              <div className="font-bold text-slate-900 dark:text-white mb-1">{report.title}</div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="uppercase tracking-wider">{report.freq}</span>
                {report.size !== '--' && <span>• {report.size}</span>}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-indigo-500 transition-colors rounded-full w-8 h-8">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
