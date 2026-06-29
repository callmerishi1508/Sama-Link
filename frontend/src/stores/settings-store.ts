import { create } from 'zustand';
import { 
  EnvironmentProfile, 
  OrgSettings, 
  UserRole, 
  StakeholderConfig, 
  AISettings, 
  SecuritySettings, 
  IntegrationStatus, 
  SystemModuleHealth, 
  AuditConfig 
} from '@/types/settings';

interface SettingsStore {
  profile: EnvironmentProfile;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setProfile: (p: EnvironmentProfile) => void;
  
  orgSettings: OrgSettings;
  updateOrgSettings: (updates: Partial<OrgSettings>) => void;
  
  roles: UserRole[];
  stakeholders: StakeholderConfig[];
  aiSettings: AISettings;
  updateAISettings: (updates: Partial<AISettings>) => void;
  
  security: SecuritySettings;
  updateSecurity: (updates: Partial<SecuritySettings>) => void;

  integrations: IntegrationStatus[];
  moduleHealth: SystemModuleHealth[];
  auditConfig: AuditConfig;
}

const mockRoles: UserRole[] = [
  { id: 'commander', name: 'Commander', permissions: { view: true, edit: true, approve: true, dispatch: true, configure: true, audit: true, replay: true, analytics: true, settings: true } },
  { id: 'dispatcher', name: 'Dispatcher', permissions: { view: true, edit: true, approve: false, dispatch: true, configure: false, audit: false, replay: true, analytics: false, settings: false } },
  { id: 'operator', name: 'Emergency Operator', permissions: { view: true, edit: true, approve: false, dispatch: false, configure: false, audit: false, replay: false, analytics: false, settings: false } }
];

const mockIntegrations: IntegrationStatus[] = [
  { id: 'CAD', name: 'Legacy CAD System', status: 'Connected', version: '4.2.1', health: 'Healthy', lastSync: '2 min ago', owner: 'IT Dept', capabilities: ['Read', 'Write', 'Sync'] },
  { id: 'GIS', name: 'Municipal GIS', status: 'Connected', version: '2025.1', health: 'Healthy', lastSync: '1 min ago', owner: 'City Planning', capabilities: ['Read'] },
  { id: 'SMS', name: 'Twilio SMS Gateway', status: 'Connected', version: 'v2010', health: 'Degraded', lastSync: '30 sec ago', owner: 'Comms', capabilities: ['Write'] },
  { id: 'WHATSAPP', name: 'WhatsApp Business', status: 'Requires Configuration', version: 'N/A', health: 'Offline', lastSync: 'Never', owner: 'Comms', capabilities: ['Read', 'Write'] }
];

const mockHealth: SystemModuleHealth[] = [
  { 
    module: 'Communication Engine', 
    status: 'Healthy', 
    dependencies: ['SMS Gateway', 'WhatsApp', 'Push'], 
    affectedFeatures: [] 
  },
  { 
    module: 'Resource Engine', 
    status: 'Degraded', 
    dependencies: ['Legacy CAD System', 'Municipal GIS'], 
    affectedFeatures: ['Real-time ambulance tracking ETA may be delayed by up to 2 minutes.'],
    recommendedAction: 'Restart GIS Polling Service'
  }
];

export const useSettingsStore = create<SettingsStore>((set) => ({
  profile: 'Production',
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  setProfile: (p) => set({ profile: p }),

  orgSettings: {
    organizationName: 'City Emergency Management',
    commandCenterName: 'District EOC Alpha',
    timeZone: 'UTC-5 (Eastern Time)',
    language: 'English',
    country: 'United States',
    region: 'NorthEast',
    workingHours: '24/7'
  },
  updateOrgSettings: (updates) => set((state) => ({ orgSettings: { ...state.orgSettings, ...updates } })),

  roles: mockRoles,
  
  stakeholders: [
    { id: 'POL', type: 'Police', contact: 'Dispatch 1', priority: 'Critical', defaultChannel: 'Radio', escalationLevel: 1, availability: 'Available' }
  ],
  
  aiSettings: {
    confidenceThreshold: 85,
    humanApprovalThreshold: 95,
    autoRecommendationMode: false,
    explainabilityLevel: 'Detailed',
    predictionHorizonMins: 60,
    communicationAutomation: false
  },
  updateAISettings: (updates) => set((state) => ({ aiSettings: { ...state.aiSettings, ...updates } })),

  security: {
    sessionTimeoutMins: 15,
    auditLoggingEnabled: true,
    dataRetentionDays: 365,
    passwordPolicy: 'Strict (12 chars, alphanumeric, symbols)',
    mfaEnabled: true,
    deviceApprovalRequired: true,
    apiAccessEnabled: false
  },
  updateSecurity: (updates) => set((state) => ({ security: { ...state.security, ...updates } })),

  integrations: mockIntegrations,
  moduleHealth: mockHealth,

  auditConfig: {
    auditRetentionDays: 365,
    incidentRetentionDays: 730,
    replayRetentionDays: 90,
    communicationRetentionDays: 180,
    analyticsRetentionDays: 365
  }
}));
