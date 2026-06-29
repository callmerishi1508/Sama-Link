import { create } from 'zustand';
import { mockOrganizations, mockUnits } from '@/lib/mockResources';
import { ResourceUnit, OrganizationCapacity, ResourceTimelineEvent, AssignmentState, ResourceStatus } from '@/types/resource';

export type CommunicationStatus = 'Not Sent' | 'Sent' | 'Delivered' | 'Acknowledged' | 'Failed';

export interface StakeholderStatus {
  id: string;
  name: string;
  type: string;
  operationalStatus: 'Waiting' | 'Accepted' | 'En Route' | 'On Scene' | 'Completed';
  communicationStatus: CommunicationStatus;
  color: string;
}

export interface DispatchLog {
  id: string;
  timestamp: string;
  incidentId: string;
  recommendedResource: string;
  assignedResource: string;
  reason: string;
  operator: string;
  result: 'Success' | 'Conflict' | 'Failed';
}

export interface OperationalAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}

interface ResourceState {
  organizations: OrganizationCapacity[];
  units: ResourceUnit[];
  stakeholders: StakeholderStatus[];
  dispatchLogs: DispatchLog[];
  alerts: OperationalAlert[];
  
  // Actions
  assignUnitToIncident: (unitId: string, incidentId: string, eta: string) => void;
  updateStakeholderStatus: (id: string, opStatus: StakeholderStatus['operationalStatus'], commStatus: CommunicationStatus) => void;
  addDispatchLog: (log: Omit<DispatchLog, 'id' | 'timestamp'>) => void;
  addAlert: (alert: Omit<OperationalAlert, 'id' | 'timestamp'>) => void;
  
  // Phase 7L New Actions
  reserveResource: (unitId: string, incidentId: string) => void;
  updateResourceState: (unitId: string, status: ResourceStatus, assignmentState: AssignmentState) => void;
  addResourceEvent: (unitId: string, event: Omit<ResourceTimelineEvent, 'id' | 'time'>) => void;
  releaseExpiredReservations: (timeoutMs?: number) => void; // Mock expiry
}

export const useResourceStore = create<ResourceState>((set) => ({
  organizations: [...mockOrganizations],
  units: [...mockUnits],
  stakeholders: [
    { id: 'sh_pd', name: 'Police Dept', type: 'Police', operationalStatus: 'En Route', communicationStatus: 'Acknowledged', color: 'blue' },
    { id: 'sh_fd', name: 'Fire Dept', type: 'Fire Unit', operationalStatus: 'Waiting', communicationStatus: 'Sent', color: 'red' },
    { id: 'sh_hosp', name: 'City Hospital', type: 'Medical', operationalStatus: 'Waiting', communicationStatus: 'Delivered', color: 'emerald' },
    { id: 'sh_ngo', name: 'Red Cross', type: 'NGO', operationalStatus: 'Waiting', communicationStatus: 'Not Sent', color: 'purple' },
  ],
  dispatchLogs: [
    { id: 'dl1', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), incidentId: 'INC-2042', recommendedResource: 'Police Escort', assignedResource: 'Unit P-04, Unit P-09', reason: 'Crowd management and secure perimeter required.', operator: 'Auto-Dispatch', result: 'Success' },
    { id: 'dl2', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(), incidentId: 'INC-2042', recommendedResource: '2 Ambulances', assignedResource: 'Ambulance A-12', reason: 'Medical emergency with injured victim.', operator: 'Dispatch Supervisor', result: 'Conflict' }
  ],
  alerts: [
    { id: 'alert_1', type: 'warning', message: 'City Hospital nearing capacity (85% Load)', timestamp: new Date().toISOString() },
    { id: 'alert_2', type: 'error', message: 'Ambulance shortage in Zone 4', timestamp: new Date().toISOString() }
  ],

  assignUnitToIncident: (unitId, incidentId, eta) => set((state) => {
    const updatedUnits = state.units.map(u => {
      if (u.id === unitId) {
        const newEvent: ResourceTimelineEvent = {
          id: Math.random().toString(36).substr(2, 9),
          time: new Date().toISOString(),
          actor: 'System',
          action: 'Assigned',
          reason: `Assigned to ${incidentId}`,
          result: 'Success'
        };
        return { 
          ...u, 
          status: 'Busy' as ResourceStatus, 
          assignmentState: 'En Route' as AssignmentState, 
          reservedByIncidentId: incidentId, 
          etaToIncident: eta,
          timeline: [newEvent, ...u.timeline]
        };
      }
      return u;
    });
    return { units: updatedUnits };
  }),

  reserveResource: (unitId, incidentId) => set((state) => {
    const updatedUnits = state.units.map(u => {
      if (u.id === unitId) {
        const newEvent: ResourceTimelineEvent = {
          id: Math.random().toString(36).substr(2, 9),
          time: new Date().toISOString(),
          actor: 'System',
          action: 'Reserved',
          reason: `Pre-reserved for ${incidentId}`,
          result: 'Success'
        };
        return {
          ...u,
          assignmentState: 'Requested' as AssignmentState,
          reservedByIncidentId: incidentId,
          timeline: [newEvent, ...u.timeline]
        };
      }
      return u;
    });
    return { units: updatedUnits };
  }),

  updateResourceState: (unitId, status, assignmentState) => set((state) => {
    return {
      units: state.units.map(u => u.id === unitId ? { ...u, status, assignmentState } : u)
    };
  }),

  addResourceEvent: (unitId, event) => set((state) => {
    return {
      units: state.units.map(u => {
        if (u.id === unitId) {
          const newEvent: ResourceTimelineEvent = {
            ...event,
            id: Math.random().toString(36).substr(2, 9),
            time: new Date().toISOString()
          };
          return { ...u, timeline: [newEvent, ...u.timeline] };
        }
        return u;
      })
    };
  }),

  releaseExpiredReservations: (timeoutMs = 60000) => set((state) => {
    // Mock logic: Release any resource that is Requested/Reserved and the last timeline event was > timeoutMs ago
    const now = Date.now();
    let hasChanges = false;
    const updatedUnits = state.units.map(u => {
      if (u.assignmentState === 'Requested' && u.timeline.length > 0) {
        const lastEventTime = new Date(u.timeline[0].time).getTime();
        if (now - lastEventTime > timeoutMs) {
          hasChanges = true;
          const newEvent: ResourceTimelineEvent = {
            id: Math.random().toString(36).substr(2, 9),
            time: new Date().toISOString(),
            actor: 'System',
            action: 'Reservation Expired',
            reason: `Timeout after ${timeoutMs/1000}s`,
            result: 'Released'
          };
          return {
            ...u,
            assignmentState: 'Available' as AssignmentState,
            status: 'Available' as ResourceStatus,
            reservedByIncidentId: null,
            timeline: [newEvent, ...u.timeline]
          };
        }
      }
      return u;
    });
    
    if (hasChanges) {
      // Could also add a dispatch log or alert here
      return { units: updatedUnits };
    }
    return state;
  }),

  updateStakeholderStatus: (id, opStatus, commStatus) => set((state) => {
    const updated = state.stakeholders.map(s => 
      s.id === id ? { ...s, operationalStatus: opStatus, communicationStatus: commStatus } : s
    );
    return { stakeholders: updated };
  }),

  addDispatchLog: (log) => set((state) => ({
    dispatchLogs: [{ ...log, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() }, ...state.dispatchLogs]
  })),

  addAlert: (alert) => set((state) => ({
    alerts: [{ ...alert, id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString() }, ...state.alerts]
  }))
}));
