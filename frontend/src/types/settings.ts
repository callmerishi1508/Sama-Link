export type EnvironmentProfile = 'Development' | 'Testing' | 'Demo' | 'Production';

export interface OrgSettings {
  organizationName: string;
  commandCenterName: string;
  timeZone: string;
  language: string;
  country: string;
  region: string;
  workingHours: string;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: {
    view: boolean;
    edit: boolean;
    approve: boolean;
    dispatch: boolean;
    configure: boolean;
    audit: boolean;
    replay: boolean;
    analytics: boolean;
    settings: boolean;
  };
}

export interface StakeholderConfig {
  id: string;
  type: string; // Police, Fire, Hospital
  contact: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  defaultChannel: string;
  escalationLevel: number;
  availability: 'Available' | 'Busy' | 'Offline';
}

export interface AISettings {
  confidenceThreshold: number;
  humanApprovalThreshold: number;
  autoRecommendationMode: boolean;
  explainabilityLevel: 'Basic' | 'Detailed' | 'Comprehensive';
  predictionHorizonMins: number;
  communicationAutomation: boolean;
}

export interface SecuritySettings {
  sessionTimeoutMins: number;
  auditLoggingEnabled: boolean;
  dataRetentionDays: number;
  passwordPolicy: string;
  mfaEnabled: boolean;
  deviceApprovalRequired: boolean;
  apiAccessEnabled: boolean;
}

export interface IntegrationStatus {
  id: string;
  name: string;
  status: 'Connected' | 'Disconnected' | 'Pending' | 'Requires Configuration';
  version: string;
  health: 'Healthy' | 'Degraded' | 'Offline';
  lastSync: string;
  owner: string;
  capabilities: string[];
}

export interface SystemModuleHealth {
  module: string;
  status: 'Healthy' | 'Degraded' | 'Offline';
  dependencies: string[];
  affectedFeatures: string[];
  recommendedAction?: string;
}

export interface AuditConfig {
  auditRetentionDays: number;
  incidentRetentionDays: number;
  replayRetentionDays: number;
  communicationRetentionDays: number;
  analyticsRetentionDays: number;
}
