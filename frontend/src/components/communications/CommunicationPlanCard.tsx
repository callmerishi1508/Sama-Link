import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { FileText, CheckCircle2 } from 'lucide-react';
import { RecipientCard } from './RecipientCard';
import { NotificationPreview } from './NotificationPreview';
import { DeliveryTracker } from './DeliveryTracker';
import { Button } from '@/components/ui/button';
import { CommunicationMessage } from '@/types/communication';

interface Props {
  messages: CommunicationMessage[];
}

export function CommunicationPlanCard({ messages }: Props) {
  const { setLifecycleState, lifecycleState } = useCommunicationStore();

  const handleApprove = () => {
    setLifecycleState('APPROVED');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          Proposed Communication Plan
        </h3>
        {lifecycleState === 'WAITING_APPROVAL' && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 uppercase tracking-wider">
            Requires Approval
          </span>
        )}
      </div>

      <div className="p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={msg.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">Message Payload</h4>
              </div>
              <NotificationPreview message={msg} />
              <RecipientCard stakeholderId={msg.stakeholderId} channel={msg.channel} expectedResponseTimeMins={msg.expectedResponseTimeMins} />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Delivery Tracking</h4>
              <DeliveryTracker events={msg.deliveryEvents} currentStatus={msg.currentStatus} />
            </div>
          </div>
        ))}
      </div>

      {lifecycleState === 'WAITING_APPROVAL' && (
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex justify-end gap-3">
          <Button variant="outline" className="rounded-full">Modify Plan</Button>
          <Button className="rounded-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleApprove}>
            <CheckCircle2 className="w-4 h-4" /> Approve Plan
          </Button>
        </div>
      )}
    </div>
  );
}
