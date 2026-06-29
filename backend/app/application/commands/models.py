from pydantic import BaseModel, Field
from typing import Optional
from app.domain.enums.base import CaseStatus, ReporterType, InputType

class CreateCaseCommand(BaseModel):
    title: str = Field(..., min_length=1)
    description: str

class ReportIncidentCommand(BaseModel):
    case_id: Optional[str] = None
    reporter_type: ReporterType
    input_type: InputType
    content: str = Field(..., min_length=1)

class UpdateCaseStatusCommand(BaseModel):
    case_id: str
    status: CaseStatus
