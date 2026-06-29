from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from app.domain.enums.base import CaseStatus, RiskLevel, EventType, ReporterType, InputType

class CaseSummaryDTO(BaseModel):
    id: str
    title: str
    status: CaseStatus
    created_at: datetime
    updated_at: datetime

class IncidentReportDTO(BaseModel):
    id: str
    case_id: str
    reporter_type: ReporterType
    input_type: InputType
    content: str
    timestamp: datetime

class RecommendationDTO(BaseModel):
    id: str
    case_id: str
    risk_level: RiskLevel
    confidence: float
    reasoning: List[str]
    evidence: List[str]
    recommended_actions: List[str]
    requires_human_confirmation: bool

class ActionDTO(BaseModel):
    id: str
    action_type: str
    description: str
    status: str

class TimelineItemDTO(BaseModel):
    id: str
    event_type: EventType
    actor: str
    timestamp: datetime
    metadata: Dict[str, Any]
