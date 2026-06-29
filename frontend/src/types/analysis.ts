export interface IncidentUnderstanding {
  summary: string;
  facts?: string[];
  people?: string[];
  locations?: string[];
  hazards?: string[];
  vulnerable_people?: string[];
  emergency_indicators?: string[];
  timeline?: string[];
  uncertainty?: string;
  missing_information?: string[];
  follow_up_questions?: string[];
  people_affected_estimate?: number | string;
}

export interface RiskAssessment {
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  triggered_rules: string[];
  supporting_evidence: string[];
  explanation: string;
  requires_human_confirmation: boolean;
}

export interface DecisionPlan {
  recommended_action: string;
  priority: 'ROUTINE' | 'ELEVATED' | 'IMMEDIATE';
  recommended_actor: string;
  requires_human_confirmation: boolean;
  reason: string;
  alternative_actions: string[];
  estimated_response_time: string;
  resources_to_dispatch?: string[];
  stakeholders_to_notify?: string[];
}

export interface AnalysisResponse {
  summary: string;
  understanding: IncidentUnderstanding;
  risk: RiskAssessment;
  decision: DecisionPlan;
  processing_time_ms: number;
  provider: string;
  fallback_used: boolean;
  voiceMetadata?: {
    durationMs: number;
    language: string;
    confidence: number;
    keywords: string[];
    processed: boolean;
    timestamp?: number;
  };
}

export interface AnalysisRequest {
  incident_text: string;
  language?: string;
}
