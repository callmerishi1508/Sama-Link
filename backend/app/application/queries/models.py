from pydantic import BaseModel
from typing import Optional
from app.domain.enums.base import CaseStatus

class GetCaseQuery(BaseModel):
    case_id: str

class GetTimelineQuery(BaseModel):
    case_id: str
    limit: int = 50
    offset: int = 0

class SearchCasesQuery(BaseModel):
    status: Optional[CaseStatus] = None
    limit: int = 20
    offset: int = 0
