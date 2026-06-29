import { ResourceUnit, ResourceEvaluation, MutualAidRecommendation, ResourceConflict } from "@/types/resource";

/**
 * ResourceIntelligenceEngine
 * 
 * A deterministic logic module that evaluates resources based on availability,
 * ETA, distance, shift status, fuel level, and capacity. Generates structured
 * explanations and detects conflicts.
 */

interface EvaluationContext {
  incidentId: string;
  incidentLocation: { lat: number, lng: number } | string;
  requiredType: string;
  requiredAmount: number;
}

export class ResourceIntelligenceEngine {
  
  static evaluateUnits(units: ResourceUnit[], context: EvaluationContext): ResourceEvaluation[] {
    const relevantUnits = units.filter(u => u.type === context.requiredType);
    
    return relevantUnits.map(unit => {
      const reasons: string[] = [];
      let isRecommended = false;
      let score = 0;
      
      // Availability
      if (unit.status === 'Available' && !unit.reservedByIncidentId) {
        reasons.push('✓ Available immediately');
        score += 40;
      } else if (unit.status === 'Available' && unit.reservedByIncidentId) {
        reasons.push('✗ Reserved by ' + unit.reservedByIncidentId);
        score -= 50;
      } else if (unit.assignmentState === 'Returning') {
        reasons.push('✓ Returning to base (Available soon)');
        score += 20;
      } else {
        reasons.push(`✗ Currently ${unit.status} (${unit.assignmentState})`);
        score -= 30;
      }
      
      // ETA / Distance Mock
      // In a real system, this would calculate Haversine distance
      const mockEta = Math.floor(Math.random() * 10) + 3; // 3 to 12 mins
      if (mockEta <= 5) {
        reasons.push('✓ Closest unit');
        score += 30;
      } else if (mockEta <= 10) {
        reasons.push('✓ Within optimal response radius');
        score += 15;
      } else {
        reasons.push('✗ Long travel time');
        score -= 10;
      }
      
      // Operational factors
      if (unit.fuelLevel >= 50) {
        reasons.push('✓ Fuel sufficient');
        score += 10;
      } else if (unit.fuelLevel < 20) {
        reasons.push('✗ Critical fuel level');
        score -= 40;
      }
      
      if (unit.crewReady) {
        reasons.push('✓ Crew fully ready');
        score += 10;
      }
      
      if (unit.shiftStatus === 'End of Shift') {
        reasons.push('✗ Near end of shift');
        score -= 20;
      }
      
      let confidence: 'High' | 'Medium' | 'Low' = 'Low';
      if (score >= 80) {
        isRecommended = true;
        confidence = 'High';
      } else if (score >= 50) {
        isRecommended = true;
        confidence = 'Medium';
      }
      
      return {
        unitId: unit.id,
        rank: 0, // Will be set after sorting
        isRecommended,
        reasons,
        eta: `${mockEta} min`,
        confidence,
        _score: score // internal use
      } as ResourceEvaluation & { _score: number };
    })
    .sort((a, b) => b._score - a._score)
    .map((evalObj, index) => {
      evalObj.rank = index + 1;
      return evalObj;
    });
  }

  static getMutualAidRecommendations(type: string): MutualAidRecommendation[] {
    // Deterministic mock recommendations based on type
    if (type === 'Medical') {
      return [
        { id: 'ma1', organization: 'County EMS', rank: 1, eta: '12 min', capability: 'Advanced Life Support', reasonSelected: 'Nearest available external medical unit.', expectedBenefit: 'Immediate patient transport', approvalNeeded: true },
        { id: 'ma2', organization: 'Private Medivac', rank: 2, eta: '15 min', capability: 'Basic Life Support', reasonSelected: 'Secondary backup', expectedBenefit: 'Capacity overflow handling', approvalNeeded: false }
      ];
    }
    if (type === 'Fire/Rescue') {
      return [
        { id: 'ma3', organization: 'West District Fire', rank: 1, eta: '18 min', capability: 'Heavy Rescue', reasonSelected: 'Specialized equipment required.', expectedBenefit: 'Structural collapse response', approvalNeeded: true }
      ];
    }
    return [
      { id: 'ma4', organization: 'State Police Troop', rank: 1, eta: '25 min', capability: 'Highway Patrol', reasonSelected: 'City units exhausted.', expectedBenefit: 'Traffic control', approvalNeeded: true }
    ];
  }
  
  static detectConflicts(units: ResourceUnit[]): ResourceConflict[] {
    const conflicts: ResourceConflict[] = [];
    
    // Check for double booking
    const assignedUnits = units.filter(u => u.reservedByIncidentId);
    
    // In a real app we'd map this over all incidents. Here we just mock a specific scenario if we see it.
    const duplicateAssignment = assignedUnits.find(u => u.status === 'Busy' && u.assignmentState === 'On Scene' && u.reservedByIncidentId === 'INC-2042');
    
    if (duplicateAssignment) {
      conflicts.push({
        id: `conf_${duplicateAssignment.id}`,
        conflict: `${duplicateAssignment.name} requested by INC-2042 but already On Scene elsewhere.`,
        severity: 'Critical',
        affectedIncidents: ['INC-2042', duplicateAssignment.reservedByIncidentId || 'Unknown'],
        impact: 'Delayed response for INC-2042. Unit cannot be dispatched.',
        resolution: 'Dispatch alternative available unit.',
        operatorAction: 'Approve Replacement'
      });
    }
    
    // Check for critical fuel but assigned
    const lowFuelAssigned = assignedUnits.filter(u => u.fuelLevel < 20 && u.assignmentState === 'En Route');
    for (const lf of lowFuelAssigned) {
      conflicts.push({
        id: `conf_fuel_${lf.id}`,
        conflict: `${lf.name} dispatched with critical fuel (<20%).`,
        severity: 'High',
        affectedIncidents: [lf.reservedByIncidentId || 'Unknown'],
        impact: 'Risk of stranding en route.',
        resolution: 'Recall unit to depot and dispatch nearest alternative.',
        operatorAction: 'Recall & Replace'
      });
    }

    return conflicts;
  }
}
