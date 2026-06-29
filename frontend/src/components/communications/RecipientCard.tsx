import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { Building2, User, Radio, Clock } from 'lucide-react';

interface Props {
  stakeholderId: string;
  channel: string;
  expectedResponseTimeMins: number;
}

export function RecipientCard({ stakeholderId, channel, expectedResponseTimeMins }: Props) {
  const { stakeholders } = useCommunicationStore();
  const stakeholder = stakeholders.find(s => s.id === stakeholderId);

  if (!stakeholder) return null;

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Building2 className="w-3 h-3" /> Organization
          </span>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            {stakeholder.organization}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <User className="w-3 h-3" /> Recipient
          </span>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            {stakeholder.recipientName}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Radio className="w-3 h-3" /> Target Channel
          </span>
          <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {channel}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3" /> Expected ETA
          </span>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            &lt; {expectedResponseTimeMins} mins
          </div>
        </div>
      </div>
    </div>
  );
}
