import { create } from 'zustand';
import { Incident, IncidentStatus } from '@/types/incident';

interface IncidentState {
  incidents: Record<string, Incident>;
  activeIncidentId: string | null;
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  setActiveIncident: (id: string | null) => void;
}

const MOCK_INCIDENTS: Record<string, Incident> = {
  'f47ac10b-58cc-4372-a567-0e02b2c3d479': {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    incidentNumber: 'INC-2026-0421',
    status: 'AWAITING_APPROVAL',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    source: 'Voice Report',
    reporterType: 'Civilian',
    riskLevel: 'HIGH',
    title: 'Structure Fire in Downtown',
    summary: 'Caller reports a fire in a 5-story building. Multiple occupants trapped on upper floors.',
    location: '1200 Block, Main St',
    assignedCoordinator: 'Op-Lead-42',
    stakeholders: ['Fire Dept', 'Paramedics'],
    resources: ['Engine 3', 'Ladder 1', 'Ambulance A12'],
    waitingOn: 'Operator Approval',
  },
  '550e8400-e29b-41d4-a716-446655440000': {
    id: '550e8400-e29b-41d4-a716-446655440000',
    incidentNumber: 'INC-2026-0422',
    status: 'RESPONDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
    source: 'Text Report',
    reporterType: 'First Responder',
    riskLevel: 'MEDIUM',
    title: 'Traffic Collision on I-95',
    summary: 'Two vehicle collision. One minor injury reported. Lanes blocked.',
    location: 'I-95 Northbound, Mile 45',
    assignedCoordinator: 'Unit-Coord-7',
    stakeholders: ['Highway Patrol', 'Towing'],
    resources: ['Cruiser 104', 'Ambulance A4'],
    eta: '2 mins',
  },
  'a3b1c2d3-e4f5-4a5b-8c9d-0e1f2a3b4c5d': {
    id: 'a3b1c2d3-e4f5-4a5b-8c9d-0e1f2a3b4c5d',
    incidentNumber: 'INC-2026-0423',
    status: 'UNDERSTANDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    source: 'IoT Sensor',
    reporterType: 'System',
    riskLevel: 'CRITICAL',
    title: 'Chemical Spill Detection',
    summary: 'Industrial sector sensor array detected hazardous chemical levels exceeding normal thresholds.',
    location: 'Sector 4 Industrial Park',
    waitingOn: 'AI Analysis',
  },
  'b2a3c4d5-e6f7-4a5b-8c9d-0e1f2a3b4c5d': {
    id: 'b2a3c4d5-e6f7-4a5b-8c9d-0e1f2a3b4c5d',
    incidentNumber: 'INC-2026-0424',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    source: 'Mobile App',
    reporterType: 'Civilian',
    riskLevel: 'LOW',
    title: 'Fallen Tree on Road',
    summary: 'Large oak tree blocking both lanes of Elm Street. No injuries.',
    location: 'Elm St & 4th Ave',
  },
  'c3b4c5d6-e7f8-4a5b-8c9d-0e1f2a3b4c5d': {
    id: 'c3b4c5d6-e7f8-4a5b-8c9d-0e1f2a3b4c5d',
    incidentNumber: 'INC-2026-0425',
    status: 'RESOURCES_ASSIGNED',
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    source: 'Phone Call',
    reporterType: 'Civilian',
    riskLevel: 'HIGH',
    title: 'Armed Robbery in Progress',
    summary: 'Suspects armed with handguns inside convenience store.',
    location: '7-Eleven, 8th & Pine',
    assignedCoordinator: 'Tac-Command',
    stakeholders: ['SWAT', 'City Police'],
    resources: ['Units 4A, 4B, 4C'],
    eta: '5 mins',
  }
};

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: MOCK_INCIDENTS,
  activeIncidentId: null,
  addIncident: (incident) => set((state) => ({
    incidents: { ...state.incidents, [incident.id]: incident }
  })),
  updateIncident: (id, updates) => set((state) => ({
    incidents: {
      ...state.incidents,
      [id]: { ...state.incidents[id], ...updates, updatedAt: new Date().toISOString() }
    }
  })),
  updateIncidentStatus: (id, status) => set((state) => ({
    incidents: {
      ...state.incidents,
      [id]: { ...state.incidents[id], status, updatedAt: new Date().toISOString() }
    }
  })),
  setActiveIncident: (id) => set({ activeIncidentId: id })
}));
