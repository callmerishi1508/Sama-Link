export interface ExecutiveBrief {
  currentStatus: string;
  statusLevel: 'Normal' | 'Warning' | 'Critical';
  biggestRisk: string;
  bottleneck: string;
  next30Mins: string;
  commandRecommendation: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  dropOffReason?: string;
  dropOffPercentage?: number;
}

export interface SystemHealth {
  aiEngine: 'Operational' | 'Degraded' | 'Offline';
  resourceEngine: 'Operational' | 'Degraded' | 'Offline';
  communicationEngine: 'Operational' | 'Degraded' | 'Offline';
  analyticsEngine: 'Operational' | 'Degraded' | 'Offline';
  database: 'Operational' | 'Degraded' | 'Offline';
  notificationServices: 'Operational' | 'Degraded' | 'Offline';
}

export interface AIEffectiveness {
  accepted: number;
  modified: number;
  rejected: number;
  escalated: number;
  avgConfidence: number;
}

export interface ZoneData {
  name: string;
  incidentDensity: number; // 0-100
  resourceLoad: number; // 0-100
  hospitalLoad: number; // 0-100
  avgEtaMins: number;
}

export interface OperatorMetric {
  id: string;
  name: string;
  incidentsManaged: number;
  avgDecisionTimeMs: number;
  escalations: number;
  approvals: number;
  dispatchAccuracy: number; // percentage
  resourceEfficiency: number; // percentage
}

export interface StakeholderMetric {
  id: string;
  name: string;
  type: string;
  responseTimeMins: number;
  acceptanceRate: number; // percentage
  completionRate: number; // percentage
}

export interface PredictiveInsight {
  id: string;
  insight: string;
  timeframe: string;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceScore: number;
  sources: string[];
  lastUpdated: string;
}

export interface CommanderRecommendation {
  id: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
  actionableContext?: string;
}

export interface Bottleneck {
  id: string;
  reason: string;
  impact: string;
  recommendedAction: string;
}

export interface CrossAnalyticsCorrelation {
  id: string;
  causeMetric: string;
  causeTrend: 'Up' | 'Down';
  effectMetric: string;
  effectTrend: 'Up' | 'Down';
  explanation: string;
}

export interface GlobalAnalyticsFilters {
  timeRange: '24h' | '7d' | '30d' | 'custom';
  incidentType: 'all' | 'medical' | 'fire' | 'police' | 'rescue';
  priority: 'all' | 'critical' | 'high' | 'medium' | 'low';
  zone: 'all' | 'north' | 'south' | 'east' | 'west' | 'central';
  stakeholder: 'all' | string;
  resourceType: 'all' | string;
}

export interface Benchmarks {
  incidentsVsLastWeek: number; // percentage change
  responseTimeVsCityAvg: number; // percentage change
  resourceLoadVsLastShift: number; // percentage change
}
