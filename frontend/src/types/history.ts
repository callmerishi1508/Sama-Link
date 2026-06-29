export type ActorType = 'AI' | 'Operator' | 'System' | 'Stakeholder' | 'Resource';

export type EventModule = 
  | 'Ingestion'
  | 'Analysis'
  | 'Routing'
  | 'Decision'
  | 'Communication'
  | 'Dispatch'
  | 'Archive';

export interface HistoryEvent {
  id: string;
  incidentId: string;
  timestamp: string;
  actor: string;
  actorType: ActorType;
  module: EventModule;
  action: string;
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface HistoricalIncident {
  id: string;
  title: string;
  category: string;
  priority: string;
  riskLevel: string;
  location: string;
  createdAt: string;
  closedAt: string;
  coordinator: string;
  resolutionTimeMs: number;
  events: HistoryEvent[];
  
  // Analytics
  aiRecommendationTimeMs: number;
  humanApprovalTimeMs: number;
  communicationTimeMs: number;
  dispatchTimeMs: number;
  firstResourceArrivalMs: number;
  humanOverrides: number;
  aiAcceptance: boolean;
  
  // Post-Incident
  lessonsLearned?: {
    workedWell: string[];
    bottlenecks: string[];
    futureRecommendations: string[];
  };
}

export interface OperatorStats {
  id: string;
  name: string;
  shift: string;
  incidentsManaged: number;
  avgDecisionTimeMs: number;
  overrides: number;
  escalations: number;
  approvals: number;
}
