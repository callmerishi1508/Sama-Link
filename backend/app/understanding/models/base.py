from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class UnderstandingRequest(BaseModel):
    incident_text: str = Field(..., min_length=1)
    language: str = "en"
    optional_context: Dict[str, Any] = Field(default_factory=dict)

class IncidentUnderstanding(BaseModel):
    summary: str
    extracted_facts: List[str]
    entities: List[str]
    concerns: List[str]
    ambiguities: List[str]
    confidence: float = Field(..., ge=0.0, le=1.0)
    missing_information: List[str] = Field(default_factory=list)
    people: List[str] = Field(default_factory=list)
    locations: List[str] = Field(default_factory=list)
    hazards: List[str] = Field(default_factory=list)
    vulnerable_people: List[str] = Field(default_factory=list)
    timeline: List[str] = Field(default_factory=list)
    emergency_indicators: List[str] = Field(default_factory=list)
    follow_up_questions: List[str] = Field(default_factory=list)
    language_detected: str = Field(default="en")
    sentiment: str = Field(default="neutral")

class UnderstandingResult(BaseModel):
    understanding: IncidentUnderstanding
    provider_name: str
    processing_time_ms: int
    successful: bool
