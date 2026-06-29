import React from 'react';
import { useHistoryStore } from '@/stores/history-store';
import { useRouter } from 'next/navigation';
import { Search, Filter, ShieldCheck, Download, ChevronRight } from 'lucide-react';

export function IncidentArchive() {
  const { incidents } = useHistoryStore();
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/history/${id}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ArchiveIcon />
          Incident Archive
        </h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-lg text-sm font-bold transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
          <thead className="text-xs uppercase bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Incident ID</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Priority</th>
              <th className="px-6 py-4 font-bold">Duration</th>
              <th className="px-6 py-4 font-bold">Coordinator</th>
              <th className="px-6 py-4 font-bold">Closed At</th>
              <th className="px-6 py-4 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {incidents.map(inc => (
              <tr 
                key={inc.id} 
                onClick={() => handleRowClick(inc.id)}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {inc.id}
                  </div>
                  <div className="text-xs truncate max-w-[200px] mt-0.5">{inc.title}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {inc.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    inc.priority === 'Critical' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {inc.priority}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-xs">
                  {Math.round(inc.resolutionTimeMs / 60000)}m
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                    {inc.coordinator}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-500">
                    {new Date(inc.closedAt).toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {incidents.length === 0 && (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <ArchiveIcon />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">No Archived Incidents</h3>
            <p className="text-sm max-w-sm">Completed operations will appear here as a permanent, immutable record.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ArchiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
      <polyline points="21 8 21 21 3 21 3 8"></polyline>
      <rect x="1" y="3" width="22" height="5"></rect>
      <line x1="10" y1="12" x2="14" y2="12"></line>
    </svg>
  );
}
