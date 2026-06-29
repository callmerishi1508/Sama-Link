from datetime import datetime
from pydantic import BaseModel, Field
from typing import Dict, Any
from app.domain.enums.base import EventType

class Event(BaseModel):
    id: str
    case_id: str
    event_type: EventType
    actor: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = Field(default_factory=dict)
