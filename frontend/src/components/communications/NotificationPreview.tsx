import React from 'react';
import { CommunicationMessage } from '@/types/communication';

interface Props {
  message: CommunicationMessage;
}

export function NotificationPreview({ message }: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 shadow-inner relative overflow-hidden border border-slate-800">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
      <div className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
        SAMA LINK • EMERGENCY DISPATCH
      </div>
      <p className="text-white text-sm font-medium whitespace-pre-wrap leading-relaxed">
        {message.content}
      </p>
      <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex justify-between">
        <span>REF: {message.incidentId}</span>
        <span>PRIORITY: {message.priority}</span>
      </div>
    </div>
  );
}
