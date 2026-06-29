import { AnalysisRequest, AnalysisResponse } from "./analysis";

export type IncidentStatus = 'NEW' | 'UNDERSTANDING' | 'ASSESSMENT' | 'AWAITING_APPROVAL' | 'RESOURCES_ASSIGNED' | 'RESPONDING' | 'RESOLVED';

export interface Incident {
  id: string; // uuid
  incidentNumber: string; // e.g. INC-2026-0001
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
  source: string;
  reporterType: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | null;
  title: string;
  summary: string;
  
  // Kanban display fields
  location?: string;
  assignedCoordinator?: string;
  stakeholders?: string[];
  resources?: string[];
  eta?: string;
  waitingOn?: string;
  priorityScore?: number;
  priorityReason?: string;
  priorityRank?: number;

  request?: AnalysisRequest;
  response?: AnalysisResponse;
}
