from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from app.domain.enums.base import CaseStatus

class Case(BaseModel):
    id: str
    title: str
    description: str
    status: CaseStatus = CaseStatus.OPEN
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
