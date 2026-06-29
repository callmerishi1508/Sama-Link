from pydantic import BaseModel, Field, field_validator
from typing import List

class AIResponseContract(BaseModel):
    summary: str
    facts: List[str]
    entities: List[str]
    concerns: List[str]
    ambiguities: List[str]
    reasoning: List[str] = Field(..., min_length=1)
    confidence: float
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

    @field_validator('confidence')
    @classmethod
    def validate_confidence(cls, v: float) -> float:
        if not (0.0 <= v <= 1.0):
            raise ValueError(f"Confidence score must be between 0.0 and 1.0, got {v}")
        return v
    
    @field_validator('reasoning')
    @classmethod
    def validate_reasoning(cls, v: List[str]) -> List[str]:
        if len(v) == 0 or all(not item.strip() for item in v):
            raise ValueError("Reasoning cannot be empty")
        return v
