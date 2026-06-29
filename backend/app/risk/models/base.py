from pydantic import BaseModel, Field
from typing import List
from app.domain.enums.base import RiskLevel

class RiskAssessment(BaseModel):
    risk_score: int = Field(..., ge=0, le=100)
    risk_level: RiskLevel
    confidence: float = Field(..., ge=0.0, le=1.0)
    triggered_rules: List[str]
    supporting_evidence: List[str]
    explanation: str
    requires_human_confirmation: bool
