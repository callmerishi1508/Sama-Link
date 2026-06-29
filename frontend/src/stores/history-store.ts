import { create } from 'zustand';
import { HistoricalIncident, OperatorStats, HistoryEvent } from '@/types/history';

interface HistoryStore {
  incidents: HistoricalIncident[];
  operatorStats: OperatorStats[];
  getIncidentById: (id: string) => HistoricalIncident | undefined;
  getEventsByIncident: (id: string) => HistoryEvent[];
}

const mockEvents1: HistoryEvent[] = [
  {
    id: 'EV-1001',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:00:00Z',
    actor: 'Citizen App',
    actorType: 'Stakeholder',
    module: 'Ingestion',
    action: 'Incident Reported',
    newState: { type: 'Medical Emergency', status: 'New' },
    reason: 'Distress signal triggered',
  },
  {
    id: 'EV-1002',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:00:15Z',
    actor: 'SAMA AI',
    actorType: 'AI',
    module: 'Analysis',
    action: 'Situation Analyzed',
    newState: { priority: 'Critical', riskLevel: 'High' },
    reason: 'Keywords indicating cardiac arrest',
  },
  {
    id: 'EV-1003',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:00:45Z',
    actor: 'SAMA AI',
    actorType: 'AI',
    module: 'Decision',
    action: 'Generated Recommendation',
    newState: { recommendedAction: 'DISPATCH_MEDIC_AND_FIRE' },
    reason: 'Standard protocol for cardiac events',
  },
  {
    id: 'EV-1004',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:01:30Z',
    actor: 'Op-Lead-42',
    actorType: 'Operator',
    module: 'Decision',
    action: 'Modified AI Recommendation',
    previousState: { units: ['A12', 'F4'] },
    newState: { units: ['A15', 'F4'] },
    reason: 'A12 reporting maintenance issue',
  },
  {
    id: 'EV-1005',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:01:45Z',
    actor: 'Op-Lead-42',
    actorType: 'Operator',
    module: 'Decision',
    action: 'Approved Plan',
  },
  {
    id: 'EV-1006',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:02:00Z',
    actor: 'System',
    actorType: 'System',
    module: 'Communication',
    action: 'Dispatched Units',
    newState: { unitsEnRoute: ['A15', 'F4'] },
  },
  {
    id: 'EV-1007',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:06:00Z',
    actor: 'A15 Crew',
    actorType: 'Resource',
    module: 'Dispatch',
    action: 'Arrived on Scene',
  },
  {
    id: 'EV-1008',
    incidentId: 'INC-2026-8812',
    timestamp: '2026-10-12T14:35:00Z',
    actor: 'Op-Lead-42',
    actorType: 'Operator',
    module: 'Archive',
    action: 'Incident Closed',
    reason: 'Patient transferred to Central Hospital',
  }
];

const mockIncidents: HistoricalIncident[] = [
  {
    id: 'INC-2026-8812',
    title: 'Cardiac Arrest at Central Station',
    category: 'Medical',
    priority: 'Critical',
    riskLevel: 'High',
    location: 'Central Station, Sector 4',
    createdAt: '2026-10-12T14:00:00Z',
    closedAt: '2026-10-12T14:35:00Z',
    coordinator: 'Op-Lead-42',
    resolutionTimeMs: 35 * 60 * 1000,
    events: mockEvents1,
    aiRecommendationTimeMs: 45000,
    humanApprovalTimeMs: 60000,
    communicationTimeMs: 15000,
    dispatchTimeMs: 15000,
    firstResourceArrivalMs: 4 * 60 * 1000,
    humanOverrides: 1,
    aiAcceptance: false,
    lessonsLearned: {
      workedWell: ['Fast AI identification of cardiac symptoms', 'Immediate F4 dispatch'],
      bottlenecks: ['Ambulance A12 was falsely marked available'],
      futureRecommendations: ['Implement real-time OBD2 maintenance tracking for ambulances']
    }
  },
  {
    id: 'INC-2026-8811',
    title: 'Electrical Fire in Warehouse',
    category: 'Fire',
    priority: 'High',
    riskLevel: 'Critical',
    location: 'Industrial District, Block B',
    createdAt: '2026-10-12T09:15:00Z',
    closedAt: '2026-10-12T12:00:00Z',
    coordinator: 'Op-Lead-11',
    resolutionTimeMs: 2.75 * 3600 * 1000,
    events: [],
    aiRecommendationTimeMs: 30000,
    humanApprovalTimeMs: 45000,
    communicationTimeMs: 10000,
    dispatchTimeMs: 20000,
    firstResourceArrivalMs: 6 * 60 * 1000,
    humanOverrides: 0,
    aiAcceptance: true,
    lessonsLearned: {
      workedWell: ['Rapid deployment of Hazmat team', 'Stakeholder notification to nearby factories'],
      bottlenecks: ['Water pressure in Sector B was low initially'],
      futureRecommendations: ['Coordinate with water department on industrial grid upgrades']
    }
  }
];

const mockStats: OperatorStats[] = [
  {
    id: 'OP-42',
    name: 'Op-Lead-42',
    shift: 'Alpha Day',
    incidentsManaged: 142,
    avgDecisionTimeMs: 24000,
    overrides: 18,
    escalations: 4,
    approvals: 124
  },
  {
    id: 'OP-11',
    name: 'Op-Lead-11',
    shift: 'Bravo Night',
    incidentsManaged: 89,
    avgDecisionTimeMs: 31000,
    overrides: 5,
    escalations: 12,
    approvals: 77
  }
];

// This store is strictly read-only for historical auditing purposes.
export const useHistoryStore = create<HistoryStore>((set, get) => ({
  incidents: mockIncidents,
  operatorStats: mockStats,
  
  getIncidentById: (id: string) => {
    return get().incidents.find(inc => inc.id === id);
  },
  
  getEventsByIncident: (id: string) => {
    const incident = get().incidents.find(inc => inc.id === id);
    return incident ? incident.events : [];
  }
}));
