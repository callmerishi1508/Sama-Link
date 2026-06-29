import { Activity, ShieldAlert, Users, PlusSquare } from "lucide-react";
import { ResourceUnit, OrganizationCapacity } from '@/types/resource';

const baseUnit = {
  shiftStatus: 'On Duty' as const,
  fuelLevel: 85,
  maintenanceStatus: 'Good' as const,
  crewReady: true,
  medicalEquipment: 'Full' as const,
  communicationStatus: 'Online' as const,
  todayUtilization: 45,
  past7DayUtilization: 60,
  healthScore: 95,
  readinessScore: 90,
  timeline: []
};

export const mockOrganizations: OrganizationCapacity[] = [
  { id: 'org_hosp', name: 'City Hospital', icon: PlusSquare, type: 'Medical', totalUnits: 46, available: 12, busy: 34, loadPercentage: 85, avgResponseTime: '6m', nextAvailable: '2m', onDuty: true, coverageArea: 'Zone 1-4', forecast: { current: 85, in30Min: 92, in60Min: 95, trend: 'critical', recommendation: 'Redirect non-critical patients to City Hospital B.' } },
  { id: 'org_pd', name: 'Central Precinct', icon: ShieldAlert, type: 'Police', totalUnits: 50, available: 8, busy: 42, loadPercentage: 90, avgResponseTime: '4m', nextAvailable: '8m', onDuty: true, coverageArea: 'Citywide', forecast: { current: 90, in30Min: 85, in60Min: 70, trend: 'decreasing', recommendation: 'Normal operations.' } },
  { id: 'org_fd', name: 'Fire Station #9', icon: Activity, type: 'Fire/Rescue', totalUnits: 6, available: 4, busy: 2, loadPercentage: 33, avgResponseTime: '5m', nextAvailable: 'Immediate', onDuty: true, coverageArea: 'Zone 4-6', forecast: { current: 33, in30Min: 33, in60Min: 40, trend: 'stable', recommendation: 'Delay non-critical dispatches if load spikes.' } },
  { id: 'org_ngo', name: 'Volunteer Net', icon: Users, type: 'NGO', totalUnits: 60, available: 45, busy: 15, loadPercentage: 25, avgResponseTime: '14m', nextAvailable: 'Immediate', onDuty: true, coverageArea: 'Zone 3-4', forecast: { current: 25, in30Min: 30, in60Min: 35, trend: 'increasing', recommendation: 'Pre-deploy to high-risk zones.' } },
];

export const mockUnits: ResourceUnit[] = [
  { ...baseUnit, id: 'A-12', name: 'Ambulance A-12', type: 'Medical', status: 'Available', assignmentState: 'Available', reservedByIncidentId: null, etaToIncident: null },
  { ...baseUnit, id: 'A-14', name: 'Ambulance A-14', type: 'Medical', status: 'Available', assignmentState: 'Available', reservedByIncidentId: null, etaToIncident: null },
  { ...baseUnit, id: 'A-18', name: 'Ambulance A-18', type: 'Medical', status: 'Busy', assignmentState: 'On Scene', reservedByIncidentId: 'INC-1042', etaToIncident: null, todayUtilization: 80, fuelLevel: 45 },
  { ...baseUnit, id: 'P-04', name: 'Unit P-04', type: 'Police', status: 'Available', assignmentState: 'Available', reservedByIncidentId: null, etaToIncident: null },
  { ...baseUnit, id: 'P-09', name: 'Unit P-09', type: 'Police', status: 'Available', assignmentState: 'Available', reservedByIncidentId: null, etaToIncident: null },
  { ...baseUnit, id: 'E-04', name: 'Engine E-04', type: 'Fire/Rescue', status: 'Available', assignmentState: 'Available', reservedByIncidentId: null, etaToIncident: null },
  { ...baseUnit, id: 'V-Net-4', name: 'Volunteer Net #4', type: 'NGO', status: 'Available', assignmentState: 'Available', reservedByIncidentId: null, etaToIncident: null },
];
