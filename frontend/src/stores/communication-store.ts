import { create } from 'zustand';
import { 
  CommunicationLifecycleState, 
  CommunicationMessage, 
  StakeholderContact, 
  MessageTemplate, 
  Broadcast, 
  ChannelHealth, 
  CommunicationAuditLog 
} from '@/types/communication';

interface CommunicationState {
  lifecycleState: CommunicationLifecycleState;
  messages: CommunicationMessage[];
  stakeholders: StakeholderContact[];
  templates: MessageTemplate[];
  broadcasts: Broadcast[];
  channelHealth: ChannelHealth[];
  auditLogs: CommunicationAuditLog[];
  
  // Stats
  stats: {
    messagesSentToday: number;
    failedDeliveries: number;
    avgAckTimeSecs: number;
    escalationRate: number;
  };

  // Actions
  setLifecycleState: (state: CommunicationLifecycleState) => void;
  addMessage: (msg: CommunicationMessage) => void;
  updateMessageStatus: (messageId: string, status: CommunicationMessage['currentStatus']) => void;
  addAuditLog: (action: string, details: string) => void;
  updateChannelHealth: (channel: ChannelHealth['channel'], updates: Partial<ChannelHealth>) => void;
  resetIncidentCommunications: () => void;
}

const mockStakeholders: StakeholderContact[] = [
  { id: 'st_pd_1', organization: 'Central Police Dept', group: 'Police', recipientName: 'Dispatch Desk', availability: 'Available', primaryContact: '+1 555-0101', secondaryContact: 'radio_freq_1', preferredChannel: 'Radio', backupChannel: 'SMS', acknowledgementStatus: 'Acknowledged', lastContactTime: new Date(Date.now() - 5000).toISOString() },
  { id: 'st_hosp_1', organization: 'City General Hospital', group: 'Hospitals', recipientName: 'ER Triage', availability: 'Available', primaryContact: '+1 555-0202', secondaryContact: 'er@citygen.org', preferredChannel: 'Voice Call', backupChannel: 'Email', acknowledgementStatus: 'Sent', lastContactTime: new Date(Date.now() - 60000).toISOString() },
  { id: 'st_fd_1', organization: 'Fire Station 4', group: 'Fire', recipientName: 'Captain Miller', availability: 'Busy', primaryContact: '+1 555-0303', secondaryContact: 'radio_freq_2', preferredChannel: 'Radio', backupChannel: 'Push', acknowledgementStatus: 'Failed', lastContactTime: new Date(Date.now() - 300000).toISOString() },
  { id: 'st_ngo_1', organization: 'Red Cross Chapter', group: 'NGOs', recipientName: 'Volunteer Coordinator', availability: 'Available', primaryContact: '+1 555-0404', secondaryContact: 'rc_coord@example.org', preferredChannel: 'WhatsApp', backupChannel: 'Email', acknowledgementStatus: 'Delivered', lastContactTime: new Date(Date.now() - 120000).toISOString() },
];

const mockTemplates: MessageTemplate[] = [
  { id: 'tpl_med', name: 'Medical Emergency', category: 'Medical', content: 'Possible medical emergency at {{location}}. Priority: {{priority}}. Please prepare for intake.' },
  { id: 'tpl_police', name: 'Police Dispatch', category: 'Security', content: 'Incident reported: {{incident}}. Priority: {{priority}}. Nearest patrol requested to {{location}}.' },
  { id: 'tpl_fire', name: 'Fire Response', category: 'Fire', content: 'Confirmed structure fire at {{location}}. Units required immediately. Priority: {{priority}}.' },
  { id: 'tpl_welfare', name: 'Welfare Check', category: 'Support', content: 'Wellness support requested at {{location}}. Standby until EMS arrival.' },
];

const mockBroadcasts: Broadcast[] = [
  { id: 'br_1', title: 'Flash Flood Warning', type: 'Weather', audience: 'Zone 4 Residents', priority: 'CRITICAL', status: 'Active', coverageArea: 'North District', startTime: new Date(Date.now() - 3600000).toISOString() },
  { id: 'br_2', title: 'Road Closure - I95', type: 'Traffic', audience: 'All Commuters', priority: 'MEDIUM', status: 'Active', coverageArea: 'I-95 Corridor', startTime: new Date(Date.now() - 7200000).toISOString() },
];

const mockChannelHealth: ChannelHealth[] = [
  { channel: 'Radio', status: 'Operational', latencyMs: 15, successRate: 99.8 },
  { channel: 'Push', status: 'Operational', latencyMs: 120, successRate: 98.5 },
  { channel: 'SMS', status: 'Degraded', latencyMs: 4500, successRate: 92.1 },
  { channel: 'WhatsApp', status: 'Operational', latencyMs: 250, successRate: 97.4 },
  { channel: 'Voice Call', status: 'Operational', latencyMs: 800, successRate: 96.0 },
  { channel: 'Email', status: 'Operational', latencyMs: 1500, successRate: 99.1 },
  { channel: 'Emergency Broadcast', status: 'Operational', latencyMs: 3000, successRate: 99.9 },
];

const mockMessages: CommunicationMessage[] = [
  {
    id: 'msg_1',
    incidentId: 'INC-2042',
    stakeholderId: 'st_pd_1',
    content: 'Possible unconscious elderly individual. Priority HIGH. Nearest patrol requested.',
    priority: 'HIGH',
    channel: 'Radio',
    expectedResponseTimeMins: 3,
    requiresApproval: true,
    currentStatus: 'Acknowledged',
    deliveryEvents: [
      { status: 'Queued', timestamp: new Date(Date.now() - 60000).toISOString() },
      { status: 'Sent', timestamp: new Date(Date.now() - 59000).toISOString() },
      { status: 'Delivered', timestamp: new Date(Date.now() - 58000).toISOString() },
      { status: 'Read', timestamp: new Date(Date.now() - 50000).toISOString() },
      { status: 'Acknowledged', timestamp: new Date(Date.now() - 45000).toISOString() },
    ]
  },
  {
    id: 'msg_2',
    incidentId: 'INC-2042',
    stakeholderId: 'st_hosp_1',
    content: 'Possible medical emergency. Prepare emergency intake.',
    priority: 'HIGH',
    channel: 'Voice Call',
    expectedResponseTimeMins: 5,
    requiresApproval: true,
    currentStatus: 'Sent',
    deliveryEvents: [
      { status: 'Queued', timestamp: new Date(Date.now() - 30000).toISOString() },
      { status: 'Sent', timestamp: new Date(Date.now() - 25000).toISOString() }
    ]
  }
];

export const useCommunicationStore = create<CommunicationState>((set) => ({
  lifecycleState: 'PLAN_CREATED',
  messages: [...mockMessages],
  stakeholders: [...mockStakeholders],
  templates: [...mockTemplates],
  broadcasts: [...mockBroadcasts],
  channelHealth: [...mockChannelHealth],
  auditLogs: [
    { id: 'aud_1', timestamp: new Date(Date.now() - 3600000).toISOString(), operator: 'System', action: 'Broadcast Initiated', details: 'Flash Flood Warning for Zone 4' }
  ],
  stats: {
    messagesSentToday: 1452,
    failedDeliveries: 12,
    avgAckTimeSecs: 45,
    escalationRate: 2.4
  },

  setLifecycleState: (state) => set({ lifecycleState: state }),
  
  addMessage: (msg) => set(state => ({
    messages: [msg, ...state.messages]
  })),

  updateMessageStatus: (messageId, status) => set(state => {
    const updatedMessages = state.messages.map(m => {
      if (m.id === messageId) {
        const newEvent = { status, timestamp: new Date().toISOString() };
        return { ...m, currentStatus: status, deliveryEvents: [...m.deliveryEvents, newEvent] };
      }
      return m;
    });
    return { messages: updatedMessages };
  }),

  addAuditLog: (action, details) => set(state => ({
    auditLogs: [{
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      operator: 'Op-Lead-42', // Mock operator
      action,
      details
    }, ...state.auditLogs]
  })),

  updateChannelHealth: (channel, updates) => set(state => ({
    channelHealth: state.channelHealth.map(ch => 
      ch.channel === channel ? { ...ch, ...updates } : ch
    )
  })),

  resetIncidentCommunications: () => set({
    lifecycleState: 'PLAN_CREATED',
    messages: []
  })
}));
