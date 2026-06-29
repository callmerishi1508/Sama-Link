import React from 'react';
import { ShieldAlert, RefreshCw, Radio, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommunicationStore } from '@/stores/communication-store';

export function EscalationCenter() {
  const { messages, updateMessageStatus } = useCommunicationStore();
  
  const escalatedMessages = messages.filter(m => m.currentStatus === 'Escalated' || m.currentStatus === 'Failed');

  if (escalatedMessages.length === 0) return null;

  return (
    <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-orange-200 dark:border-orange-500/20 flex justify-between items-center bg-orange-100/50 dark:bg-orange-500/20">
        <h3 className="text-lg font-bold text-orange-900 dark:text-orange-400 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Escalation Center
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-200 text-orange-800 dark:bg-orange-500/30 dark:text-orange-300 uppercase tracking-wider">
          Action Required
        </span>
      </div>

      <div className="p-6 space-y-4">
        {escalatedMessages.map(msg => (
          <div key={msg.id} className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-orange-200 dark:border-orange-500/30">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Timeout: {msg.stakeholderId}</h4>
                <p className="text-sm text-slate-500">Failed to acknowledge within expected {msg.expectedResponseTimeMins} mins via {msg.channel}.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button size="sm" variant="outline" className="gap-2 rounded-full border-slate-200 dark:border-slate-700" onClick={() => updateMessageStatus(msg.id, 'Queued')}>
                <RefreshCw className="w-4 h-4" /> Retry {msg.channel}
              </Button>
              <Button size="sm" variant="outline" className="gap-2 rounded-full border-slate-200 dark:border-slate-700">
                <Radio className="w-4 h-4" /> Switch to Backup Channel
              </Button>
              <Button size="sm" variant="outline" className="gap-2 rounded-full border-slate-200 dark:border-slate-700">
                <Phone className="w-4 h-4" /> Escalate to Supervisor
              </Button>
              <Button size="sm" variant="outline" className="gap-2 rounded-full border-slate-200 dark:border-slate-700">
                <Users className="w-4 h-4" /> Request Mutual Aid
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
