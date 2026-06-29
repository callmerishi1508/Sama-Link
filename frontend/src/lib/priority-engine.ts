import { Incident } from '@/types/incident';

export interface PriorityMetrics {
  score: number;
  rank: number;
  reason: string;
}

export function calculatePriority(incident: Incident): Omit<PriorityMetrics, 'rank'> {
  let score = 0;
  const reasons: string[] = [];

  // Base score from risk level
  switch (incident.riskLevel) {
    case 'CRITICAL': score += 80; reasons.push('Critical Risk'); break;
    case 'HIGH': score += 60; reasons.push('High Risk'); break;
    case 'MEDIUM': score += 40; reasons.push('Medium Risk'); break;
    case 'LOW': score += 20; reasons.push('Low Risk'); break;
  }

  // Time-based escalation
  const timeWaitingMinutes = Math.floor((Date.now() - new Date(incident.createdAt).getTime()) / 60000);
  if (timeWaitingMinutes > 10) {
    score += Math.min(20, timeWaitingMinutes);
    reasons.push(`Waiting ${timeWaitingMinutes} mins`);
  }

  // Specific keywords in summary
  const summaryLower = incident.summary.toLowerCase();
  if (summaryLower.includes('child') || summaryLower.includes('children') || summaryLower.includes('elderly')) {
    score += 15;
    reasons.push('Vulnerable persons involved');
  }
  if (summaryLower.includes('trapped') || summaryLower.includes('mass casualty')) {
    score += 25;
    reasons.push('Life-threatening situation');
  }

  // Resource issues (mock logic based on waitingOn)
  if (incident.waitingOn?.includes('Resource')) {
    score += 10;
    reasons.push('Resource shortage');
  }

  // Cap at 100
  score = Math.min(100, score);

  return {
    score,
    reason: reasons.join(' • ')
  };
}

export function rankIncidents(incidents: Incident[]): (Incident & PriorityMetrics)[] {
  const scored = incidents.map(inc => ({
    ...inc,
    ...calculatePriority(inc)
  }));

  // Sort by score descending, then by time waiting
  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return scored.map((inc, index) => ({
    ...inc,
    rank: index + 1
  }));
}
