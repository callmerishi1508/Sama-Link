export type CommunicationLifecycleState = 
  | 'PLAN_CREATED'
  | 'WAITING_APPROVAL'
  | 'APPROVED'
  | 'SENDING'
  | 'PARTIALLY_DELIVERED'
  | 'ACKNOWLEDGED'
  | 'ESCALATED'
  | 'COMPLETED';

export type CommunicationChannel = 'SMS' | 'Email' | 'Push' | 'WhatsApp' | 'Radio' | 'Voice Call' | 'Emergency Broadcast';
export type ChannelStatus = 'Operational' | 'Degraded' | 'Offline';
export type DeliveryStatus = 'Queued' | 'Sent' | 'Delivered' | 'Read' | 'Acknowledged' | 'Failed' | 'Escalated';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ChannelHealth {
  channel: CommunicationChannel;
  status: ChannelStatus;
  latencyMs: number;
  successRate: number;
}

export interface StakeholderContact {
  id: string;
  organization: string;
  group: 'Police' | 'Fire' | 'Hospitals' | 'NGOs' | 'Municipality' | 'Utilities' | 'Volunteers' | 'District Control Room';
  recipientName: string;
  availability: 'Available' | 'Busy' | 'Offline';
  primaryContact: string;
  secondaryContact: string;
  preferredChannel: CommunicationChannel;
  backupChannel: CommunicationChannel;
  acknowledgementStatus: DeliveryStatus;
  lastContactTime: string | null;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: string;
  content: string; // e.g., "{{incident}} at {{location}}. Priority: {{priority}}."
}

export interface Broadcast {
  id: string;
  title: string;
  type: string;
  audience: string;
  priority: PriorityLevel;
  status: 'Active' | 'Completed' | 'Draft';
  coverageArea: string;
  startTime: string;
}

export interface DeliveryEvent {
  status: DeliveryStatus;
  timestamp: string;
}

export interface CommunicationMessage {
  id: string;
  incidentId: string;
  stakeholderId: string;
  content: string;
  priority: PriorityLevel;
  channel: CommunicationChannel;
  expectedResponseTimeMins: number;
  deliveryEvents: DeliveryEvent[];
  currentStatus: DeliveryStatus;
  requiresApproval: boolean;
}

export interface CommunicationAuditLog {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  details: string;
}
