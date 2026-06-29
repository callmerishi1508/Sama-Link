import { ElementType } from "react";

export type ResourceType = 'Medical' | 'Police' | 'Fire/Rescue' | 'NGO';
export type ResourceStatus = 'Available' | 'Busy' | 'Offline' | 'Maintenance';
export type AssignmentState = 'Requested' | 'Assigned' | 'Accepted' | 'En Route' | 'On Scene' | 'Returning' | 'Available';

export interface ResourceTimelineEvent {
  id: string;
  time: string; // ISO timestamp
  actor: 'System' | 'Dispatcher' | 'Driver' | 'Commander' | 'AI';
  action: string;
  reason: string;
  result: string;
}

export interface ResourceUnit {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  assignmentState: AssignmentState;
  reservedByIncidentId: string | null;
  etaToIncident: string | null;
  
  // New Operational Fields
  shiftStatus: 'On Duty' | 'Off Duty' | 'End of Shift';
  fuelLevel: number; // 0-100
  maintenanceStatus: 'Good' | 'Due Soon' | 'In Shop';
  crewReady: boolean;
  medicalEquipment: 'Full' | 'Low Supplies' | 'Depleted';
  communicationStatus: 'Online' | 'Intermittent' | 'Offline';
  
  todayUtilization: number; // 0-100%
  past7DayUtilization: number; // 0-100%
  
  healthScore: number; // 0-100
  readinessScore: number; // 0-100
  
  timeline: ResourceTimelineEvent[];
}

export interface CapacityForecast {
  current: number; // 0-100%
  in30Min: number;
  in60Min: number;
  trend: 'stable' | 'increasing' | 'decreasing' | 'critical';
  recommendation: string;
}

export interface OrganizationCapacity {
  id: string;
  name: string;
  icon: ElementType; // React ElementType
  type: ResourceType;
  totalUnits: number;
  available: number;
  busy: number;
  loadPercentage: number;
  avgResponseTime: string;
  nextAvailable: string;
  onDuty: boolean;
  coverageArea: string;
  
  // Forecast
  forecast: CapacityForecast;
}

export interface ResourceEvaluation {
  unitId: string;
  rank: number;
  isRecommended: boolean;
  reasons: string[]; // e.g. "Closest unit", "Crew available"
  eta: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface MutualAidRecommendation {
  id: string;
  organization: string;
  rank: number;
  eta: string;
  capability: string;
  reasonSelected: string;
  expectedBenefit: string;
  approvalNeeded: boolean;
}

export interface ResourceConflict {
  id: string;
  conflict: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedIncidents: string[];
  impact: string;
  resolution: string;
  operatorAction: string;
}
