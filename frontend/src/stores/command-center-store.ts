import { create } from 'zustand';

export interface Coordinator {
  id: string;
  name: string;
  incidents: number;
  critical: number;
  approvalsPending: number;
  avgResponseTime: string;
  status: 'Active' | 'Busy' | 'Offline';
}

export interface ResourceZone {
  name: string;
  hospitalSaturation: number; // 0-100
  ambulances: number;
  volunteers: number;
  fire: number;
  police: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  category: 'REPORT' | 'AI' | 'HUMAN' | 'RESOURCE' | 'STAKEHOLDER' | 'SYSTEM' | 'HOSPITAL';
  message: string;
  incidentId?: string;
}

export interface IncidentRelationship {
  sourceId: string;
  targetId: string;
  type: 'Causes' | 'Escalates_To' | 'Blocks';
}

interface CommandCenterState {
  coordinators: Coordinator[];
  zones: ResourceZone[];
  activityFeed: ActivityLog[];
  relationships: IncidentRelationship[];
  addActivity: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

const MOCK_COORDINATORS: Coordinator[] = [
  { id: 'c1', name: 'Op-Lead-42', incidents: 3, critical: 1, approvalsPending: 1, avgResponseTime: '2m 14s', status: 'Active' },
  { id: 'c2', name: 'Tac-Command', incidents: 1, critical: 1, approvalsPending: 0, avgResponseTime: '1m 45s', status: 'Busy' },
  { id: 'c3', name: 'Unit-Coord-7', incidents: 4, critical: 0, approvalsPending: 2, avgResponseTime: '3m 10s', status: 'Active' },
  { id: 'c4', name: 'Dispatch-9', incidents: 0, critical: 0, approvalsPending: 0, avgResponseTime: '--', status: 'Offline' }
];

const MOCK_ZONES: ResourceZone[] = [
  { name: 'North Zone', hospitalSaturation: 92, ambulances: 24, volunteers: 89, fire: 65, police: 45 },
  { name: 'South Zone', hospitalSaturation: 45, ambulances: 80, volunteers: 60, fire: 85, police: 90 },
  { name: 'East Zone', hospitalSaturation: 78, ambulances: 45, volunteers: 30, fire: 50, police: 60 },
  { name: 'West Zone', hospitalSaturation: 60, ambulances: 60, volunteers: 75, fire: 70, police: 85 }
];

const MOCK_ACTIVITY: ActivityLog[] = [
  { id: 'a1', timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(), category: 'REPORT', message: 'Citizen submitted report (Fallen Tree on Road)', incidentId: 'b2a3c4d5-e6f7-4a5b-8c9d-0e1f2a3b4c5d' },
  { id: 'a2', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), category: 'AI', message: 'Situation understood. Risk assessed as CRITICAL.', incidentId: 'a3b1c2d3-e4f5-4a5b-8c9d-0e1f2a3b4c5d' },
  { id: 'a3', timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), category: 'HUMAN', message: 'Operator Op-Lead-42 modified dispatch plan.', incidentId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
  { id: 'a4', timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), category: 'RESOURCE', message: 'Ambulance A12 accepted assignment.', incidentId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
  { id: 'a5', timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(), category: 'HOSPITAL', message: 'Trauma center confirmed 2 beds available.' }
];

const MOCK_RELATIONSHIPS: IncidentRelationship[] = [
  { sourceId: 'a3b1c2d3-e4f5-4a5b-8c9d-0e1f2a3b4c5d', targetId: '550e8400-e29b-41d4-a716-446655440000', type: 'Causes' } // Chem spill caused collision
];

export const useCommandCenterStore = create<CommandCenterState>((set) => ({
  coordinators: MOCK_COORDINATORS,
  zones: MOCK_ZONES,
  activityFeed: MOCK_ACTIVITY,
  relationships: MOCK_RELATIONSHIPS,
  addActivity: (log) => set(state => ({
    activityFeed: [{ ...log, id: Math.random().toString(), timestamp: new Date().toISOString() }, ...state.activityFeed]
  }))
}));
