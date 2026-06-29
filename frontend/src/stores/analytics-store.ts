import { create } from 'zustand';
import { 
  ExecutiveBrief, 
  FunnelStage, 
  SystemHealth, 
  AIEffectiveness, 
  ZoneData, 
  OperatorMetric, 
  StakeholderMetric, 
  PredictiveInsight,
  CommanderRecommendation,
  Bottleneck,
  CrossAnalyticsCorrelation,
  GlobalAnalyticsFilters,
  Benchmarks
} from '@/types/analytics';

interface AnalyticsStore {
  executiveBrief: ExecutiveBrief;
  funnelStages: FunnelStage[];
  systemHealth: SystemHealth;
  aiEffectiveness: AIEffectiveness;
  zones: ZoneData[];
  operators: OperatorMetric[];
  stakeholders: StakeholderMetric[];
  predictiveInsights: PredictiveInsight[];
  commanderRecommendations: CommanderRecommendation[];
  bottlenecks: Bottleneck[];
  correlations: CrossAnalyticsCorrelation[];
  filters: GlobalAnalyticsFilters;
  benchmarks: Benchmarks;
  setFilters: (filters: Partial<GlobalAnalyticsFilters>) => void;
}

const mockBrief: ExecutiveBrief = {
  currentStatus: 'Elevated Resource Load',
  statusLevel: 'Warning',
  biggestRisk: 'North Zone Hospital Saturation',
  bottleneck: 'Ambulance Dispatch Latency in Sector 4',
  next30Mins: 'Anticipate 15% increase in traffic incidents due to weather.',
  commandRecommendation: 'Pre-stage 2 additional EMS units near Central Station.'
};

const mockFunnel: FunnelStage[] = [
  { stage: 'Reported', count: 1245 },
  { stage: 'Understood', count: 1180, dropOffReason: 'Spam/Accidental', dropOffPercentage: 5 },
  { stage: 'Risk Assessed', count: 1150, dropOffReason: 'Insufficient Data', dropOffPercentage: 2 },
  { stage: 'Approved', count: 1090, dropOffReason: 'Duplicate/Resolved', dropOffPercentage: 5 },
  { stage: 'Resources Assigned', count: 1050, dropOffReason: 'No Resources', dropOffPercentage: 3 },
  { stage: 'Responding', count: 1020, dropOffReason: 'Cancelled en route', dropOffPercentage: 2 },
  { stage: 'Closed', count: 980, dropOffReason: 'Ongoing', dropOffPercentage: 4 }
];

const mockHealth: SystemHealth = {
  aiEngine: 'Operational',
  resourceEngine: 'Operational',
  communicationEngine: 'Degraded',
  analyticsEngine: 'Operational',
  database: 'Operational',
  notificationServices: 'Operational'
};

const mockAIEffectiveness: AIEffectiveness = {
  accepted: 72,
  modified: 21,
  rejected: 2,
  escalated: 5,
  avgConfidence: 89
};

const mockZones: ZoneData[] = [
  { name: 'North', incidentDensity: 85, resourceLoad: 92, hospitalLoad: 95, avgEtaMins: 12 },
  { name: 'South', incidentDensity: 40, resourceLoad: 45, hospitalLoad: 60, avgEtaMins: 6 },
  { name: 'East', incidentDensity: 65, resourceLoad: 70, hospitalLoad: 55, avgEtaMins: 8 },
  { name: 'West', incidentDensity: 30, resourceLoad: 35, hospitalLoad: 40, avgEtaMins: 5 },
  { name: 'Central', incidentDensity: 75, resourceLoad: 80, hospitalLoad: 85, avgEtaMins: 10 },
];

const mockOperators: OperatorMetric[] = [
  { id: 'OP-42', name: 'Op-Lead-42', incidentsManaged: 142, avgDecisionTimeMs: 24000, escalations: 4, approvals: 124, dispatchAccuracy: 98, resourceEfficiency: 95 },
  { id: 'OP-11', name: 'Op-Lead-11', incidentsManaged: 89, avgDecisionTimeMs: 31000, escalations: 12, approvals: 77, dispatchAccuracy: 92, resourceEfficiency: 88 },
  { id: 'OP-07', name: 'Op-Lead-07', incidentsManaged: 210, avgDecisionTimeMs: 18000, escalations: 2, approvals: 195, dispatchAccuracy: 99, resourceEfficiency: 97 }
];

const mockStakeholders: StakeholderMetric[] = [
  { id: 'POL', name: 'Metro Police', type: 'Law Enforcement', responseTimeMins: 4.5, acceptanceRate: 98, completionRate: 99 },
  { id: 'FIR', name: 'City Fire Dept', type: 'Fire', responseTimeMins: 5.2, acceptanceRate: 99, completionRate: 100 },
  { id: 'EMS', name: 'Central EMS', type: 'Medical', responseTimeMins: 7.1, acceptanceRate: 95, completionRate: 96 },
  { id: 'HOS', name: 'General Hospital', type: 'Hospital', responseTimeMins: 0, acceptanceRate: 85, completionRate: 100 }
];

const mockInsights: PredictiveInsight[] = [
  { id: 'PI-1', insight: 'North Zone hospital utilization may exceed 90% within 30 minutes.', timeframe: '30 mins', confidence: 'High', confidenceScore: 88, sources: ['Resource Intelligence', 'Incident History'], lastUpdated: new Date().toISOString() },
  { id: 'PI-2', insight: 'Fire Station West is likely to become overloaded if industrial incidents continue.', timeframe: '2 hours', confidence: 'Medium', confidenceScore: 65, sources: ['Incident History', 'Predictive Models'], lastUpdated: new Date().toISOString() },
  { id: 'PI-3', insight: 'Ambulance demand expected to increase during evening peak.', timeframe: '4 hours', confidence: 'High', confidenceScore: 92, sources: ['Historical Traffic', 'Resource Intelligence'], lastUpdated: new Date().toISOString() }
];

const mockRecommendations: CommanderRecommendation[] = [
  { id: 'CR-1', recommendation: 'Increase ambulance coverage in North Zone.', priority: 'High', actionableContext: 'North Zone Hospital is nearing 95% saturation.' },
  { id: 'CR-2', recommendation: 'Alert City Hospital about projected overload and divert non-critical patients.', priority: 'High', actionableContext: 'Anticipated +15% influx of patients.' },
  { id: 'CR-3', recommendation: 'Reassign Fire Unit F12 to West Zone.', priority: 'Medium', actionableContext: 'Industrial incidents in West Zone are compounding.' },
  { id: 'CR-4', recommendation: 'Pre-stage NGO volunteers for upcoming severe weather event.', priority: 'Medium', actionableContext: 'Weather forecast predicts severe storms in 2h.' },
  { id: 'CR-5', recommendation: 'Escalate staffing for evening shift based on predictive models.', priority: 'Low', actionableContext: 'Evening peak traffic expected.' }
];

const mockBottlenecks: Bottleneck[] = [
  { id: 'B-1', reason: 'Hospital Saturation (North)', impact: 'Ambulances waiting > 20 mins to offload patients.', recommendedAction: 'Implement regional divert protocol immediately.' },
  { id: 'B-2', reason: 'Communication API Latency', impact: 'Stakeholder notifications delayed by 5-10 seconds.', recommendedAction: 'Switch to redundant SMS gateway.' },
  { id: 'B-3', reason: 'Approval Delays (Sector 4)', impact: 'Dispatch times increased by 45 seconds.', recommendedAction: 'Assign secondary operator to Sector 4 queue.' }
];

const mockCorrelations: CrossAnalyticsCorrelation[] = [
  { id: 'C-1', causeMetric: 'High Incident Load', causeTrend: 'Up', effectMetric: 'Resource Utilization', effectTrend: 'Up', explanation: 'A 20% spike in medical incidents directly increased EMS utilization to 92%.' },
  { id: 'C-2', causeMetric: 'Resource Utilization', causeTrend: 'Up', effectMetric: 'Response Time', effectTrend: 'Up', explanation: 'Depleted local reserves forces dispatching units from further away, adding 2.5m to ETA.' },
  { id: 'C-3', causeMetric: 'Hospital Load', causeTrend: 'Up', effectMetric: 'Mutual Aid Recommended', effectTrend: 'Up', explanation: 'North Hospital at 95% triggers automatic mutual aid requests to neighboring jurisdictions.' }
];

const initialFilters: GlobalAnalyticsFilters = {
  timeRange: '24h',
  incidentType: 'all',
  priority: 'all',
  zone: 'all',
  stakeholder: 'all',
  resourceType: 'all'
};

const mockBenchmarks: Benchmarks = {
  incidentsVsLastWeek: 12.4, // +12.4%
  responseTimeVsCityAvg: -5.2, // -5.2% (better)
  resourceLoadVsLastShift: 8.1 // +8.1%
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  executiveBrief: mockBrief,
  funnelStages: mockFunnel,
  systemHealth: mockHealth,
  aiEffectiveness: mockAIEffectiveness,
  zones: mockZones,
  operators: mockOperators,
  stakeholders: mockStakeholders,
  predictiveInsights: mockInsights,
  commanderRecommendations: mockRecommendations,
  bottlenecks: mockBottlenecks,
  correlations: mockCorrelations,
  filters: initialFilters,
  benchmarks: mockBenchmarks,
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } }))
}));
