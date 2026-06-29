from datetime import datetime
from pydantic import BaseModel, Field
from app.domain.enums.base import ReporterType, InputType

class Incident(BaseModel):
    id: str
    case_id: str
    reporter_type: ReporterType
    input_type: InputType
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
