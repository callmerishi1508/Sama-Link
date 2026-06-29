import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { LayoutTemplate, FileText } from 'lucide-react';

export function MessageTemplates() {
  const { templates } = useCommunicationStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-indigo-500" />
          Message Templates
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {templates.map(template => (
          <div key={template.id} className="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                {template.name}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                {template.category}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
              {template.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
