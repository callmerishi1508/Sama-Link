import React from 'react';
import { useCommunicationStore } from '@/stores/communication-store';
import { Users, Phone, Mail, Radio } from 'lucide-react';
import { StakeholderContact } from '@/types/communication';

export function StakeholderDirectory() {
  const { stakeholders } = useCommunicationStore();

  const grouped = stakeholders.reduce((acc, stakeholder) => {
    if (!acc[stakeholder.group]) acc[stakeholder.group] = [];
    acc[stakeholder.group].push(stakeholder);
    return acc;
  }, {} as Record<string, StakeholderContact[]>);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Radio': return <Radio className="w-3.5 h-3.5" />;
      case 'Voice Call': return <Phone className="w-3.5 h-3.5" />;
      case 'Email': return <Mail className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-500" />
          Stakeholder Directory
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(grouped).map(([group, contacts]) => (
          <div key={group}>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 dark:border-slate-800 pb-1">
              {group}
            </h4>
            <div className="space-y-3">
              {contacts.map(contact => (
                <div key={contact.id} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{contact.organization}</div>
                    <div className="text-xs text-slate-500">{contact.recipientName}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                      {getChannelIcon(contact.preferredChannel)}
                      {contact.preferredChannel}
                    </div>
                    <span className={`h-2 w-2 rounded-full ${
                      contact.availability === 'Available' ? 'bg-emerald-500' :
                      contact.availability === 'Busy' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} title={contact.availability} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {stakeholders.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-6 text-center">
            <Users className="w-10 h-10 mb-3 text-slate-300 dark:text-slate-700" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">No Stakeholders Configured</h4>
            <p className="text-xs">There are no external stakeholders currently registered in the directory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
