import { Incident } from '@/types/incident';
import { AnalysisResponse } from '@/types/analysis';

export function generateDeterministicAnalysis(incident: Incident): AnalysisResponse {
  const riskLevel = incident.riskLevel || 'MEDIUM';
  let riskScore = 50;
  if (riskLevel === 'LOW') riskScore = 20;
  if (riskLevel === 'HIGH') riskScore = 80;
  if (riskLevel === 'CRITICAL') riskScore = 95;

  const priority = riskLevel === 'CRITICAL' ? 'IMMEDIATE' : (riskLevel === 'HIGH' ? 'ELEVATED' : 'ROUTINE');
  
  return {
    summary: incident.summary,
    understanding: {
      summary: incident.summary,
      facts: [
        `Incident reported via ${incident.source}`,
        `Reporter type: ${incident.reporterType}`,
        `Status: ${incident.status}`
      ],
      locations: incident.location ? [incident.location] : [],
      hazards: riskLevel === 'HIGH' || riskLevel === 'CRITICAL' ? ['Potential hazards present'] : [],
      timeline: [
        `${new Date(incident.createdAt).toLocaleTimeString()} - Incident created`,
        `${new Date(incident.updatedAt).toLocaleTimeString()} - Last updated`
      ]
    },
    risk: {
      risk_score: riskScore,
      risk_level: riskLevel,
      confidence: 0.85,
      triggered_rules: ['Historical precedent', 'Location risk profile'],
      supporting_evidence: [incident.summary],
      explanation: `Risk assessed as ${riskLevel} based on initial report.`,
      requires_human_confirmation: true
    },
    decision: {
      recommended_action: `Dispatch units to ${incident.location || 'scene'}`,
      priority: priority,
      recommended_actor: 'Command',
      requires_human_confirmation: true,
      reason: 'Standard protocol for this incident type',
      alternative_actions: ['Monitor situation', 'Request more information'],
      estimated_response_time: '5-10 minutes',
      resources_to_dispatch: incident.resources || [],
      stakeholders_to_notify: incident.stakeholders || []
    },
    processing_time_ms: 0,
    provider: 'Deterministic Fallback',
    fallback_used: true
  };
}
